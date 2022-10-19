import * as yup from "yup";

const propertyCreateSerializer = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: yup.object({
    district: yup.string().required(),
    zipCode:  yup.string().max(8).required(),
    number: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().max(2).required()
  }),
  categoryId: yup.string().required()
})

export { propertyCreateSerializer }