import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { prisma } from "@/prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
interface Props {
	params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	})

	if (!issue) notFound()

	return (
		<div>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.updatedAt.toDateString()}</Text>
			</Flex>
			<Card className='prose lg:prose-xl' mt='4'>
				<Markdown>{issue.description}</Markdown>
			</Card>
		</div>
	)
}

export default IssueDetailPage
