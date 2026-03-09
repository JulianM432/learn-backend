export const getSchemaPaths = (schema) => {
  return Object.keys(schema?.paths).filter((key) => schema?.paths[key].isRequired);
};

export function validateFields(data, requiredFields) {
  const missingFields = requiredFields.filter(
    (field) => !data[field] || data[field].toString().trim() === "",
  );

  if (missingFields.length > 0) {
    return `Faltan los siguientes campos: ${missingFields.join(", ")}`;
  }
  return "";
}

export const validateEmail = (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "El formato del correo electrónico no es válido";
  }
  return "";
};

export const validateFieldsAnidados = (data, requiredFields) => {
  const missingFields = [];
  for (const field of requiredFields) {
    const value = field.split(".").reduce((acc, key) => acc?.[key], data);
    if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
      missingFields.push(field);
    }
  }
  return missingFields.length > 0 ? `Faltan los siguientes campos: ${missingFields.join(", ")}` : "";
};

export const validateData = (data, fields) => {
  return [validateFields(data, fields)].filter((filter) => filter !== "");
};

export const validatePassword = (password) => {
  // Verificar que la contraseña existe
  if (!password) {
    return "La contraseña es obligatoria.";
  }
  // Verificar longitud mínima
  if (password.length < 10) {
    return "La contraseña debe tener al menos 10 caracteres.";
  }
  // Verificar al menos una mayúscula
  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe tener al menos una letra mayúscula.";
  }
  // Verificar al menos una minúscula
  if (!/[a-z]/.test(password)) {
    return "La contraseña debe tener al menos una letra minúscula.";
  }
  // Verificar al menos un número
  if (!/[0-9]/.test(password)) {
    return "La contraseña debe tener al menos un número.";
  }
  // Verificar al menos un carácter especial
  if (!/[@$!%*?&]/.test(password)) {
    return "La contraseña debe tener al menos un carácter especial (@, $, !, %, *, ?, &).";
  }
  // Verificar que solo contiene caracteres permitidos
  if (!/^[A-Za-z\d@$!%*?&]+$/.test(password)) {
    return "La contraseña solo puede contener letras, números y los caracteres especiales: @, $, !, %, *, ?, &";
  }
  return "";
};
