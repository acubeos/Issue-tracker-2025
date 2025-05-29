import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { prisma } from "@/prisma/client"
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import Link from "next/link"
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
		<Grid columns={{ initial: "1", md: "2" }} gap='4'>
			<Box>
				<Heading>{issue.title}</Heading>
				<Flex gap='3' my='2'>
					<IssueStatusBadge status={issue.status} />
					<Text>{issue.updatedAt.toDateString()}</Text>
				</Flex>
				<Card className='prose lg:prose-xl' mt='4'>
					<Markdown>{issue.description}</Markdown>
				</Card>
			</Box>
			<Box>
				<Link href={`/issues/${issue.id}/edit`}>
					<Button>Edit Issue</Button>
				</Link>
			</Box>
		</Grid>
	)
}

export default IssueDetailPage
