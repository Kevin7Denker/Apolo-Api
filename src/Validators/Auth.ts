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

  public WelcomeBodySchema = z.object({
    email: z.string().email(),
    image: z.any(),
    identity: z.string().max(25),
    genres: z.array(z.string()),
    country: z.string(),
    code: z.string().length(2),
  });

  public ChangePasswordBodySchema = z.object({
    email: z.string().email(),
    token: z.string(),
  });
}

export default new AuthValidator();
