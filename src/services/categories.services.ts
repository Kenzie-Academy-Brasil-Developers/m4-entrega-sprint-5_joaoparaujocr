import AppDataSource from "../data-source"
import Category from "../entities/categories.entities"
import AppError from "../errors";
import { ICategoryRequest, ICategoryResponse } from "../interfaces/categories";

export const categoryCreateService = async ({ name }: ICategoryRequest): Promise<ICategoryResponse> => {

  const categoriesRepository = AppDataSource.getRepository(Category);
  const categoryAlreadyExists = await categoriesRepository.findOneBy({ name });

  if(categoryAlreadyExists) throw new AppError("Category already registered with that name", 400)

  const category = categoriesRepository.create({
    name: name
  });

  await categoriesRepository.save(category);

  return category
}

export const categoriesListService = async () => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  return await categoriesRepository.find()
}

export const categoryListPropertiesService = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Category);
  const categoryListProperties = await categoriesRepository.findOne({
    where: {
      id,
    },
    relations: {
      properties: true
    }
  });
  
  if(!categoryListProperties) throw new AppError("Category not found", 404)

  return categoryListProperties
}