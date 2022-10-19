import AppDataSource from "../data-source"
import { Users } from "../entities/users.entities"
import { IUserCreate, IUserCreateResponse, IUserLogin, IUserUpdate } from "../interfaces/users";
import { userWithoutPasswordSerializer } from "../serializers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { listUsersSerializer } from "../serializers/users";
import AppError from "../errors";

export const userCreateService = async (newUser: IUserCreate): Promise<IUserCreateResponse> => {
    const usersRespository = AppDataSource.getRepository(Users);
    usersRespository.create(newUser);
    
    const userSave = await usersRespository.save(newUser);

    return await userWithoutPasswordSerializer.validate(userSave, {
      stripUnknown: true,
  });
}

export const userLoginService = async ({email, password}: IUserLogin): Promise<string> => {
  const usersRespository = AppDataSource.getRepository(Users);

  const user = await usersRespository.findOneBy({
    email
  });

  if(!user) throw new AppError("Wrong email/password", 403);

  const passwordMatched = await bcrypt.compare(password, user.password);

  if(!passwordMatched) throw new AppError("Wrong email/password", 403);

  return jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: "1d" });
}

export const usersListService = async (userId: string): Promise<IUserCreateResponse[] | undefined> => {
  const usersRespository = AppDataSource.getRepository(Users);
  const users = await usersRespository.find();

  if(!(users.find(user => user.id === userId)?.isAdm)) throw new AppError("Not is admin", 403)

  return await listUsersSerializer.validate(users, { stripUnknown: true })
}

export const userUpdateService = async (body: IUserUpdate, idRequest: string, idUser: string, isAdm: boolean): Promise<IUserUpdate> => {
  if(!isAdm && idRequest !== idUser) throw new AppError("Unathorized", 401);

  const usersRespository = AppDataSource.getRepository(Users);
  await usersRespository.update({
    id: idRequest
  }, body);

  return body
}

export const userDeleteService = async (id: string): Promise<string> => {
  const usersRespository = AppDataSource.getRepository(Users);
  const user = await usersRespository.findOneBy({ id });
  if (!user?.isActive) throw new AppError("Inactive user", 400);
  await usersRespository.update({ id }, {
    isActive: false
  });
  return "User Delete";
}