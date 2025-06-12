import { prisma } from "@/prisma/client"
import { Status } from "../generated/prisma"
import IssueActions from "./IssueActions"
import Pagination from "../components/Pagination"
import IssueTable, { columnNames, IssueQuery } from "./IssueTable"
import { Flex } from "@radix-ui/themes"
import { Metadata } from "next"

type SearchParams = Promise<IssueQuery>
interface Props {
	searchParams: SearchParams
}

const IssuesPage = async (props: Props) => {
	const searchParams = await props.searchParams

	const statuses = Object.values(Status)
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined

	const where = { status }

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined

	const page = parseInt(searchParams.page) || 1
	const pageSize = 10

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * 10,
		take: pageSize,
	})

	const issueCount = await prisma.issue.count({ where })

	return (
		<Flex direction='column' gap='3'>
			<IssueActions />
			<IssueTable issues={issues} searchParams={searchParams} />
			<Pagination
				itemCount={issueCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</Flex>
	)
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
	title: "Issue Tracker - Issue List",
	description: "View all project issues and their statuses",
	keywords: "issue tracker, project management, software development",
	authors: [{ name: "Aziz Akande", url: "https://linkedin.com/in/acubeos" }],
	openGraph: {
		title: "Issue Tracker",
		description: "View all project issues",
		url: "https://linkedin.com/in/acubeos",
		siteName: "Issue Tracker",
		type: "website",
		locale: "en_NG",
	},
}

export default IssuesPage
