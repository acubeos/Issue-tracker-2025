import { prisma } from "@/prisma/client"
import IssueChart from "./IssueChart"
import { Flex, Grid } from "@radix-ui/themes"
import IssueSummary from "./IssueSummary"
import LatestIssues from "./LatestIssues"
import { Metadata } from "next"

export default async function Home() {
	const open = await prisma.issue.count({
		where: { status: "OPEN" },
	})
	const closed = await prisma.issue.count({
		where: { status: "CLOSED" },
	})
	const inProgress = await prisma.issue.count({
		where: { status: "IN_PROGRESS" },
	})

	const status = { open, closed, inProgress }

	return (
		<Grid columns={{ initial: "1", md: "2" }} gap='5'>
			<Flex direction='column' gap={"5"}>
				<IssueSummary status={status} />
				<IssueChart status={status} />
			</Flex>
			<LatestIssues />
		</Grid>
	)
}

export const metadata: Metadata = {
	title: "Issue Tracker",
	description: "View a summary of project issues and their statuses",
	keywords: "issue tracker, project management, software development",
	authors: [{ name: "Aziz Akande", url: "https://linkedin.com/in/acubeos" }],
	openGraph: {
		title: "Issue Tracker",
		description: "View a summary of project issues",
		url: "https://linkedin.com/in/acubeos",
		siteName: "Issue Tracker",
		type: "website",
		locale: "en_NG",
	},
	twitter: {
		title: "Issue Tracker",
		description: "View a summary of project issues",
		site: "@Abiola_bg",
		creator: "@Abiola_bg",
	},
}
