const Joi = require("joi");

const carrerasPermitidas = [
  "Ingeniería en Sistemas Computacionales",
  "Ingeniería en Tecnologías de la Información",
  "Ingeniería en Informática",
  "Ingeniería en Gestión Empresarial",
];

const lenguajesPermitidos = [
  "JavaScript",
  "TypeScript",
  "HTML+CSS",
  "PHP",
  "Python",
  "C++",
  "C#",
];

// Esquema de validación con Joi
const residenteSchema = Joi.object({
  Name: Joi.string().trim().min(2).required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos 2 caracteres",
  }),
  LastName: Joi.string().trim().min(2).required().messages({
    "string.empty": "El apellido no puede estar vacío",
    "string.min": "El apellido debe tener al menos 2 caracteres",
  }),
  Email: Joi.string().trim().email().required().messages({
    "string.empty": "El correo electrónico es obligatorio",
    "string.email": "Debe ser un correo electrónico válido",
  }),
  Gender: Joi.string().valid("Masculino", "Femenino").required().messages({
    "any.only": "El género debe ser Masculino o Femenino",
    "any.required": "El género es obligatorio",
    "string.empty": "Debes seleccionar un género",
  }),
  Birthdate: Joi.string()
    .isoDate()
    .required()
    .custom((value, helpers) => {
      const fechaIngresada = new Date(value);
      const fechaActual = new Date();

      if (fechaIngresada > fechaActual) {
        return helpers.message(
          "La fecha de nacimiento no puede ser posterior a hoy"
        );
      }
      return value;
    })
    .messages({
      "string.empty": "La fecha de nacimiento es obligatoria",
      "string.isoDate": "Formato de fecha inválido",
    }),

  Tel: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "El teléfono debe contener exactamente 10 dígitos",
      "string.empty": "El teléfono es obligatorio",
      "any.required": "El teléfono es obligatorio",
    }),
  Foto: Joi.string().allow("").optional(),
  InstitutoProcedencia: Joi.string().trim().required().messages({
    "string.empty": "El instituto de procedencia no puede estar vacío",
  }),
  Carrera: Joi.string()
    .valid(...carrerasPermitidas)
    .required()
    .messages({
      "any.only": "La carrera no es válida",
    }),
  LenguajesDeProgramacion: Joi.array()
    .items(Joi.string().valid(...lenguajesPermitidos))
    .min(1)
    .required()
    .messages({
      "array.min": "Debe seleccionar al menos un lenguaje de programación",
    }),

  Notas: Joi.string().optional(),
});

module.exports = { residenteSchema };
