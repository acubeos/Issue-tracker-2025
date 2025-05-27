import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/prisma/client"

const createIssueSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be less than 100 characters"),
	description: z
		.string()
		.min(1, "Description is required")
		.max(500, "Description must be less than 500 characters"),
})

export async function POST(request: NextRequest) {
	const body = await request.json()
	const validation = createIssueSchema.safeParse(body)
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 })
	}

	const newIssue = await prisma.issues.create({
		data: { title: body.title, description: body.description },
	})
	return NextResponse.json(newIssue, { status: 201 })
}
