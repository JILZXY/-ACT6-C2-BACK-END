import type { Request, Response, NextFunction } from 'express';
import characterService = require('../services/character.service');
import errorMiddleware = require('../middlewares/error.middleware');
const { getCharacters } = characterService;
const { AppError } = errorMiddleware;

const VALID_STATUS = ['alive', 'dead', 'unknown'];

const listCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, status, species, page } = req.query as Record<string, string>;

    if (status && !VALID_STATUS.includes(status.toLowerCase())) {
      return next(
        new AppError(
          'INVALID_STATUS',
          'El valor de status no es válido',
          400,
          {
            campo: 'status',
            valor_recibido: status,
            valores_validos: VALID_STATUS,
          }
        )
      );
    }

    const data = await getCharacters({ name, status, species, page });
    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

export = { listCharacters };
