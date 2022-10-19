import * as yup from "yup";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const createUserSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .transform((pwd) => bcrypt.hashSync(pwd, 10)),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().default(true),
  createdAt: yup.date().default(() => new Date()),
  updatedAt: yup.date().default(() => new Date()),
  id: yup.string().transform(() => uuidv4()).default(() => uuidv4())
});

const userWithoutPasswordSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.string().required(),
  updatedAt: yup.string().required(),
  id: yup.string().required()
});

const userUpdateSerializer = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string().transform(pwd => bcrypt.hashSync(pwd, 10)),
  updatedAt: yup.date().default(() => new Date())
})

const listUsersSerializer = yup.array(userWithoutPasswordSerializer);

export { createUserSerializer, userWithoutPasswordSerializer, listUsersSerializer, userUpdateSerializer }