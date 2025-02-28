import * as yup from "yup";

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

export const residenteSchema = yup.object().shape({
  // Nombre: Cadena requerida con mínimo 2 caracteres
  Name: yup
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre es obligatorio"),

  // Apellido: Cadena requerida con mínimo 2 caracteres
  LastName: yup
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .required("El apellido es obligatorio"),

  // Correo Electrónico: Cadena requerida con formato de email
  Email: yup
    .string()
    .trim()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),

  // Género: Cadena requerida que debe ser "Masculino" o "Femenino"
  Gender: yup
    .string()
    .oneOf(
      ["Masculino", "Femenino"],
      "El género debe ser 'Masculino' o 'Femenino'"
    )
    .required("El género es obligatorio"),

  // Fecha de Nacimiento: Fecha requerida que no puede ser posterior a hoy
  Birthdate: yup
    .string()
    .required("La fecha de nacimiento es obligatoria")
    .test("is-valid-date", "Formato de fecha inválido", (value) => {
      return !isNaN(Date.parse(value)); // Verifica si el valor es una fecha válida
    })
    .test(
      "is-not-future",
      "La fecha de nacimiento no puede ser posterior a hoy",
      (value) => {
        if (!value) return false;
        const fechaIngresada = new Date(value);
        const fechaActual = new Date();
        return fechaIngresada <= fechaActual; // La fecha debe ser hoy o antes
      }
    ),
  // Teléfono: Cadena requerida que debe contener exactamente 10 dígitos
  Tel: yup
    .string()
    .matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos")
    .required("El teléfono es obligatorio"),

  // Foto: Campo opcional (puedes adaptar la validación si requieres validar el tipo de archivo)
  Foto: yup.mixed().notRequired(),

  // Instituto de Procedencia: Cadena requerida
  InstitutoProcedencia: yup
    .string()
    .trim()
    .required("El instituto de procedencia es obligatorio"),

  // Carrera: Cadena requerida que debe ser una de las opciones permitidas
  Carrera: yup
    .string()
    .oneOf(carrerasPermitidas, "La carrera no es válida")
    .required("La carrera es obligatoria"),

  // Lenguajes de Programación: Arreglo de cadenas, al menos uno seleccionado y cada elemento debe ser válido
  LenguajesDeProgramacion: yup
    .array()
    .of(
      yup
        .string()
        .oneOf(lenguajesPermitidos, "Lenguaje de programación no válido")
    )
    .min(1, "Debe seleccionar al menos un lenguaje de programación")
    .required("El campo de lenguajes de programación es obligatorio"),

  // Notas: Campo opcional
  Notas: yup.string().notRequired(),
});
