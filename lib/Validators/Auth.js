import { z } from "zod";
class AuthValidator {
    constructor() {
        this.SignUpBodySchema = z.object({
            name: z.string(),
            surname: z.string(),
            email: z.string().email(),
            phone: z.string(),
            password: z.string().min(6),
            confirmPassword: z.string().min(6),
        });
        this.SignInBodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });
    }
}
export default new AuthValidator();
//# sourceMappingURL=Auth.js.map