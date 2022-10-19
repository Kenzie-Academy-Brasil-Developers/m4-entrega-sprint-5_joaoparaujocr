import AppDataSource from "../data-source";
import Address from "../entities/addresses.entities";
import Category from "../entities/categories.entities";
import Property from "../entities/properties.entities";
import AppError from "../errors";
import { IPropertyRequest } from "../interfaces/properties";

export const propertyCreateService = async ({ value, size, address, categoryId }: IPropertyRequest) => {
  const propertiesRepository = AppDataSource.getRepository(Property);
  const addressesRepository = AppDataSource.getRepository(Address);
  const categoriesRepository = AppDataSource.getRepository(Category);
  
  const categoryAlreadyExists = await categoriesRepository.findOneBy({ id: categoryId })
  if(!categoryAlreadyExists) throw new AppError("Category not found", 404);

  const addressAlreadyExists = await addressesRepository.findOneBy({ district: address.district });
  if(addressAlreadyExists) throw new AppError("A property already exists at this address");

  const newAddress = addressesRepository.create({
    state: address.state,
    city: address.city,
    district: address.district,
    zipCode: address.zipCode,
    number: address.number
  });

  await addressesRepository.save(newAddress);

  const findAddress = await addressesRepository.findOneBy({ id: newAddress.id })

  const property = propertiesRepository.create({
    value,
    size,
    address: findAddress!,
    category: categoryAlreadyExists
  });

  await propertiesRepository.save(property);

  return property
}

export const propertiesListService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Property);
  return await propertiesRepository.find();
}