import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { z, ZodError } from 'zod';

// Valider les données reçues par l'utilisateur
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res
          .status(400)
          .json({ error: 'Données invalides', details: errorMessages });
      } else {
        res.status(500).json({ error: 'Erreur interne du serveur' });
      }
    }
  };
}

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
