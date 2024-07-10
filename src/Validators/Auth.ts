import { z } from "zod";

class AuthValidator {
  public SignUpBodySchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  });

  public SignInBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
}

export default new AuthValidator();
