import { Request, Response } from "express"
import { schedulesCreateService, schedulesListPropertyService } from "../services/schedules.services";

export const schedulesCreateController = async (req: Request, res: Response) => {
  const {body, userId} = req;
  await schedulesCreateService({...body, userId});
  return res.status(201).json({
    message: "schedule create"
  });
}

export const schedulesListPropertyController = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  const schedulesListProperty = await schedulesListPropertyService(id);
  return res.json(schedulesListProperty);
}