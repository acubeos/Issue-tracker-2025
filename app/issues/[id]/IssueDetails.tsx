import { IssueStatusBadge } from "@/app/components"
import { Issue } from "@/app/generated/prisma"
import { Heading, Flex, Card, Text } from "@radix-ui/themes"
import React from "react"
import Markdown from "react-markdown"

const IssueDetails = ({ issue }: { issue: Issue }) => {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.updatedAt.toDateString()}</Text>
			</Flex>
			<Card className='prose lg:prose-xl' mt='4'>
				<Markdown>{issue.description}</Markdown>
			</Card>
		</>
	)
}

export default IssueDetails
