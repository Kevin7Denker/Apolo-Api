import { z } from "zod";

class AuthValidator {
  public SignUpBodySchema = z.object({
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email().min(1),
    phone: z.string().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(6).min(1),
  });

  public SignInBodySchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(6),
  });

  public WelcomeBodySchema = z.object({
    email: z.string().email().min(1),
    image: z.any(),
    identity: z.string().max(25).min(1),
    genres: z.array(z.string()).min(1),
    country: z.string().min(1),
    code: z.string().length(2).min(1),
  });

  public UserIdBodySchema = z.object({ userId: z.string().min(1) });

  public TokenBodySchema = z.object({
    token: z.string().min(1),
  });

  public UpdateImageBodySchema = z.object({
    image: z.any(),
    userId: z.string().min(1),
  });
}

export default new AuthValidator();
