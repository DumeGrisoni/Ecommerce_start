import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

import {
  createUserSchema,
  loginSchema,
  usersTable,
} from '../../../src/db/usersSchema.js';
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

export default router;
