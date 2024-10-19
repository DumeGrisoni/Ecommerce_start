import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Vérifier le token de l'utilisateur
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Accès refusé' });
    return;
  }
  try {
    // Decoder le token
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN!);
    if (typeof decoded !== 'object' || !decoded?.userId) {
      res.status(401).json({ error: 'Accès refusé' });
      return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Accès refusé' });
  }
}

// Vérifier le role de l'utilisateur
export function verifyRole(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  if (role !== 'admin') {
    res.status(401).json({ error: 'Accès refusé' });
    return;
  }
  console.log('Role:', role);
  next();
}
