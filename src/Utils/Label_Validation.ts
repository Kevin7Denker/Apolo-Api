export function validName(name: string) {
  if (name.length > 50) {
    return {
      msg: "The field must contain a maximum of 50 characters",
    };
  }

  if (!/^[A-Z][a-z]*$/.test(name)) {
    return {
      msg: "Invalid Format",
      example: { name: "Kevin", surname: "Denker" },
    };
  }
}

export function validEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      msg: "Invalid Format",
      example: "apolo@gmail.com",
    };
  }
}

//Por hora está apenas no formato brasileiro, precisamos pensar em como globalizar essa validação
export function validPhone(phone: string) {
  const regex = new RegExp(
    "^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{4}))$"
  );
  if (!regex.test(phone)) {
    return false;
  }

  return true;
}

export function validPassword(password: string) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return false;
  }

  return true;
}
