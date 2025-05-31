import React from "react"
// import IssueForm from "../../_components/IssueForm"
import { prisma } from "@/prisma/client"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import EditLoadingSkeleton from "./loading"

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
	ssr: true,
	loading: () => <EditLoadingSkeleton />,
})
interface Props {
	params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	})

	if (!issue) return notFound()

	return <IssueForm issue={issue} />
}

export default EditIssuePage
