import { Request, Response } from "express";
import Property from "../entities/properties.entities";
import { IPropertyRequest } from "../interfaces/properties";
import { propertiesListService, propertyCreateService } from "../services/properties.services";

export const propertyCreateController = async (req: Request, res: Response) => {
  const { createUser } = req
  const propertyCreate: Property = await propertyCreateService(createUser as IPropertyRequest);
  return res.status(201).json(propertyCreate);
}

export const propertiesListController = async (req: Request, res: Response) => {
  const propertiesList: Property[] = await propertiesListService();
  return res.json(propertiesList);
}