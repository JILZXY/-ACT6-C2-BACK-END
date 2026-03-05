import { Request, Response, NextFunction } from 'express'
import { getCharacters } from '../services/character.service'
import { AppError } from '../middlewares/error.middleware'

const VALID_STATUS = ['alive', 'dead', 'unknown']

export const listCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, status, species, page } = req.query as Record<string, string>

    if (status && !VALID_STATUS.includes(status.toLowerCase())) {
      throw new AppError(
        'INVALID_STATUS',
        'El valor de status no es válido',
        400,
        {
          campo: 'status',
          valor_recibido: status,
          valores_validos: VALID_STATUS,
        }
      )
    }

    const data = await getCharacters({ name, status, species, page })
    res.json(data)
  } catch (error) {
    next(error)
  }
}
