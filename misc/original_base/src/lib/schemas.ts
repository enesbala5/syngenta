
export const coverLetterSchema = z.object({
	companyName: z.string().min(1, "Company name is required"),
	keyPoints: z.array(z.string()).min(1, "At least one key point is required"),
	desiredLength: z.number().min(200).max(1000),
	tone: z.array(z.string()).min(1).max(5),
	template: z.string(),
	cvContent: z.string().optional()
});

export type CoverLetterSchema = typeof coverLetterSchema;