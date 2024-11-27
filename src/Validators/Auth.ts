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
<<<<<<< HEAD
    identity: z.string().max(25).min(1),
    genres: z.array(z.string()).min(1),
    country: z.string().min(1),
    code: z.string().length(2).min(1),
  });

  public UserIdBodySchema = z.object({ userId: z.string().min(1) });

  public UpdateImageBodySchema = z.object({
    image: z.any(),
    userId: z.string().min(1),
=======
    identity: z.string().max(25),
    genres: z.array(z.string()),
    country: z.string(),
    code: z.string().length(2),
>>>>>>> parent of fbcd25c (Feat CompleteWelcome)
  });
}

export default new AuthValidator();
