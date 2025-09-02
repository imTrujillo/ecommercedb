import { subYears } from "date-fns";
import * as Yup from "yup";

export const employeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("requerido")
    .min(2, "min 2 caracteres")
    .max(100, "max 100 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "solo letras y espacios"),
  username: Yup.string()
    .required("requerido")
    .min(5, "min 5 caracteres")
    .max(50, "max 50 caracteres")
    .matches(
      /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
      "solo letras y números"
    ),
  email: Yup.string().email("no válido").required("requerido"),
  phoneNumber: Yup.string().required("requerido"),
  address: Yup.string()
    .required("requerido")
    .min(20, "min 20 caracteres")
    .max(200, "max 200 caracteres"),
  dui: Yup.string()
    .matches(/^\d{8}-\d{1}$/, "formato: 12345678-9")
    .required("requerido"),
  dateOfBirth: Yup.date()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(subYears(new Date(), 65), "max 65 años")
    .max(subYears(new Date(), 19), "min 18 años")
    .required("requerido"),
  hireDate: Yup.date()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .max(new Date(), "Debe ser una fecha actual o pasada")
    .required("Fecha de contratación requerida")
    .when("dateOfBirth", (dob, schema) => {
      if (!dob) return schema;
      const minHireDate = subYears(dob, -18);
      return schema.min(minHireDate, "min 18 años para contratarse");
    }),
  password: Yup.string()
    .min(6, "min 8 caracteres.")
    .matches(/[a-z]/, "falta letra minúscula")
    .matches(/[A-Z]/, "falta letra mayúscula")
    .matches(/\d/, "falta un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "falta caracter especial")
    .required("requerido"),
  salary: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(0.01, "min $0")
    .max(50000, "max $50,000")
    .required("requerido"),
  nit: Yup.string()
    .matches(/^\d{4}-\d{6}-\d{3}-\d{1}$/, "formato: 0614-241287-102-5")
    .required("requerido"),
});

export const employeeValidations = {
  DOBValidation: {
    id: "dateOfBirth",
    label: "Fecha de nacimiento:",
    type: "date",
    name: "dateOfBirth",
  },

  fullNameValidation: {
    id: "fullName",
    label: "Nombre completo",
    type: "text",
    name: "fullName",
    placeholder: "Juan Pérez",
  },

  duiValidation: {
    id: "dui",
    label: "DUI",
    type: "text",
    name: "dui",
    placeholder: "12345678-9",
  },

  usernameValidation: {
    id: "username",
    label: "Nombre de usuario",
    type: "text",
    name: "username",
    placeholder: "Nombre de usuario",
  },

  emailValidation: {
    id: "email",
    label: "Correo electrónico",
    type: "email",
    name: "email",
    placeholder: "example@example.com",
  },

  phoneValidation: {
    id: "phoneNumber",
    label: "Teléfono",
    type: "text",
    name: "phoneNumber",
    placeholder: "1234-5678",
  },

  addressValidation: {
    id: "address",
    label: "Dirección",
    type: "textarea",
    name: "address",
    placeholder: "Av. Bernal",
  },

  passwordValidation: {
    id: "password",
    label: "Contraseña",
    type: "password",
    name: "password",
    placeholder: "TuMascota123!",
  },

  hireDateValidation: {
    id: "hireDate",
    label: "Fecha de contratación:",
    type: "date",
    name: "hireDate",
  },

  nitValidation: {
    id: "nit",
    label: "NIT",
    type: "text",
    name: "nit",
    placeholder: "1234-123456-123-1",
  },

  salaryValidation: {
    id: "salary",
    label: "Salario",
    type: "number",
    name: "salary",
    placeholder: "999.99",
  },
};
