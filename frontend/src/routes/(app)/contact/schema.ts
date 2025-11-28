
import { z } from "zod";

export const formSchema = z.object({
	fullName: z.string().min(2).max(50),
	subject: z.string().min(2).max(50),
	email: z.string().min(2).max(50),
	message: z.string().min(2).max(1000),
});

export type FormSchema = typeof formSchema;

