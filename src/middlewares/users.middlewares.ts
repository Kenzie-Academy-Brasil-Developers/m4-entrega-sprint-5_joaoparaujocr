import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import { BaseSchema } from "yup";
import jwt from "jsonwebtoken";
import AppError from "../errors";

export const userAlreadyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const usersRespository = AppDataSource.getRepository(Users);
  const userFound = await usersRespository.findOneBy({
    email
  });

  if(userFound) {
    return res.status(400).json({
      message: "User already exists"
    })
  }

  next();
}

export const validateSerializerMiddleware =
  (serializer: BaseSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const validateBodyCreated = await serializer.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (Object.keys(validateBodyCreated).length <= 1) return res.status(401).json({
        message: "Campos insuficientes"
      })
      
      req.createUser = validateBodyCreated;
      return next()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message
        })
      }
      
    }
  }

export const validateAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) return res.status(401).json({
    message: "Token does not exist"
  });

  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token as string, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
    if(err || !decoded) res.status(401).json({
      message: "Token invalid"
    });

    req.userId = decoded.id;

    next();
  });
}

export const userAuthorizedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const usersRespository = AppDataSource.getRepository(Users);
  const user = await usersRespository.findOneBy({
    id: req.userId
  });

  if(!user) return res.status(400).json({
    message: "User not found"
  })

  if(!user.isAdm) return res.status(403).json({
    message: "Unathorized."
  })

  next();
}

export const userIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const usersRespository = AppDataSource.getRepository(Users);
  const user = await usersRespository.findOneBy({
    id: req.userId
  });

  if(!user) return res.status(404).json({
    message: "User not found"
  });

  req.isAdm = user.isAdm;

  next();
}

export const idIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const usersRespository = AppDataSource.getRepository(Users);
  const user = await usersRespository.findOneBy({
    id: req.params.id
  });

  if(!user) return res.status(404).json({
    message: "User not found"
  });

  return next()
}

export const handleErrorMiddleware = async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  console.log(err)
  return res.status(500).json({
    message: "Internal error server."
  })
}