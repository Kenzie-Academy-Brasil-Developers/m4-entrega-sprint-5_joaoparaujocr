import { Request, Response } from "express";
import { IUserCreate } from "../interfaces/users";
import { userCreateService, userDeleteService, userLoginService, usersListService, userUpdateService } from "../services/users.services";

export const userCreateController = async (req:Request, res:Response) => {
  try {
    const { createUser } = req;
    const newUSer = await userCreateService(createUser as IUserCreate);
    return res.status(201).json(newUSer);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export const userLoginController = async (req: Request, res: Response) => {
  const { body } = req;
  const token = await userLoginService(body);
  return res.json({ token });
}

export const usersListController = async (req: Request, res: Response) => {
  const usersList = await usersListService(req.userId);
  return res.json(usersList);
}

export const userUpdateController = async (req: Request, res: Response) => {
  const { createUser, params: { id }, userId, isAdm } = req;
  const userUpdate = await userUpdateService(createUser as IUserCreate, id, userId, isAdm);
  return res.json(userUpdate)
}

export const userDeleteController = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  const userDelete = await userDeleteService(id);
  return res.status(204).json({
    message: userDelete
  });
}
