import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

import {
  createUserSchema,
  loginSchema,
  usersTable,
} from '../../db/usersSchema.js';
import { validateData } from '../../../src/middlewares/validationMiddleware.js';
import { db } from '../../../src/db/index.js';

const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();
    // @ts-ignore
    delete user.password;

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send("Erreur lors de la création de l'utilisateur");
  }
});

router.post('/login', validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "L'authentification a échoué" });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).json({ error: "L'authentification a échoué" });
      return;
    }

    // Creer un token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_TOKEN!,
      { expiresIn: '30d' }
    );

    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
    console.log(email, password, token);
  } catch (error) {
    res.status(500).send("Erreur lors de l'authentification");
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10); // Convertir id en number

    if (isNaN(userId)) {
      res.status(400).send('ID utilisateur invalide');
      return;
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      res.status(404).send('Utilisateur non trouvé');
      return;
    }

    // @ts-ignore
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération de l'utilisateur");
  }
});

export default router;
