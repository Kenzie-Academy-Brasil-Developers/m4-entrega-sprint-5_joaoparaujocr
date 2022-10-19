import { Request, Response } from "express";
import { ICategoryResponse } from "../interfaces/categories";
import { categoriesListService, categoryCreateService, categoryListPropertiesService } from "../services/categories.services";

export const categoryCreateController = async (req: Request, res: Response) => {
  const { body } = req;
  const categoryCreate: ICategoryResponse = await categoryCreateService(body);
  return res.status(201).json(categoryCreate);
}

export const categoriesListController = async (req: Request, res:  Response) => {
  const categoriesList: ICategoryResponse[] = await categoriesListService();
  return res.json(categoriesList);
}

export const categoryListPropertiesController = async (req: Request, res: Response) => {
  const categoryList = await categoryListPropertiesService(req.params.id);
  res.json(categoryList)
}