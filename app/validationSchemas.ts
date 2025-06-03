import { z } from "zod"

export const IssueSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(200, "Title must be less than 200 characters"),
	description: z
		.string()
		.min(1, "Description is required")
		.max(65500, "Description must be less than 65500 characters"),
})

export const patchIssueSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(200, "Title must be less than 200 characters")
		.optional(),
	description: z
		.string()
		.min(1, "Description is required")
		.max(65500, "Description must be less than 65500 characters")
		.optional(),
	assignedToUserId: z
		.string()
		.min(1, "AssignedToUserId is required")
		.max(200)
		.optional()
		.nullable(),
})
