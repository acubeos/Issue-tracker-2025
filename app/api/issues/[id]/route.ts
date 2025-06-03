import authOptions from "@/app/auth/authOptions"
import { patchIssueSchema } from "@/app/validationSchemas"
import { prisma } from "@/prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const session = getServerSession(authOptions)
	if (!session) return NextResponse.json({}, { status: 401 })

	const body = await request.json()

	const validation = patchIssueSchema.safeParse(body)
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 })

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	})

	const { assignedToUserId, title, description } = body
	if (body) {
		const user = prisma.user.findUnique({
			where: {
				id: assignedToUserId,
			},
		})

		if (!user)
			return NextResponse.json({ error: "invalid User." }, { status: 400 })
	}

	if (!issue)
		return NextResponse.json({ error: "Invalid issue" }, { status: 404 })

	const UpdatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: { title, description, assignedToUserId },
	})
	return NextResponse.json(UpdatedIssue)
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const session = getServerSession(authOptions)
	if (!session) return NextResponse.json({}, { status: 401 })

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	})

	if (!issue)
		return NextResponse.json({ error: "Invalid issue" }, { status: 404 })

	await prisma.issue.delete({
		where: { id: issue.id },
	})

	return NextResponse.json({})
}
