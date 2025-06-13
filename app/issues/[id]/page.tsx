import { prisma } from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteIssueButton from "./DeleteIssueButton"
import { getServerSession } from "next-auth"
import authOptions from "@/app/auth/authOptions"
import AssigneeSelect from "./AssigneeSelect"
import { cache } from "react"
interface Props {
	params: { id: string }
}

const fetchUser = cache((issueId: number) =>
	prisma.issue.findUnique({
		where: {
			id: issueId,
		},
	})
)

const IssueDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions)

	const issue = await fetchUser(parseInt(params.id))

	if (!issue) notFound()

	return (
		<Grid columns={{ initial: "1", xs: "5" }} gap='4'>
			<Box className='md:col-span-4'>
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction='column' gapY='4'>
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	)
}

export async function generateMetadata({ params }: Props) {
	const issue = await fetchUser(parseInt(params.id))

	if (!issue) return {}

	return {
		title: `Issue #${issue.id} - ${issue.title}`,
		description: issue.description,
		keywords: "issue tracker, project management, software development",
		authors: [{ name: "Aziz Akande", url: "https://linkedin.com/in/acubeos" }],
		openGraph: {
			title: `Issue #${issue.id} - ${issue.title}`,
			description: issue.description,
			siteName: "Issue Tracker",
			type: "website",
			locale: "en_NG",
		},
		twitter: {
			title: `Issue #${issue.id} - ${issue.title}`,
			description: issue.description,
			site: "@Abiola_bg",
			creator: "@Abiola_bg",
		},
	}
}

export default IssueDetailPage
