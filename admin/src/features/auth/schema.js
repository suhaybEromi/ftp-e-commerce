import { z } from "zod";

// const roles = ["super_admin", "admin", "data_entry"];

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

// export const createUserSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(2, "Name must be at least 2 characters")
//     .max(60, "Name must be at most 60 characters"),

//   email: z.string().trim().toLowerCase().email("Valid email is required"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(60, "Password must be at most 60 characters"),

//   role: z.enum(roles, {
//     error: () => ({
//       message: "Role must be one of: super_admin, admin, data_entry",
//     }),
//   }),

//   isActive: z.boolean().optional(),
// });

export const refreshTokenSchema = z.object({
  body: z.object({}).optional().default({}),
});

export const logoutSchema = z.object({
  body: z.object({}).optional().default({}),
});
