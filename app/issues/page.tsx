import { Table } from "@radix-ui/themes"
import { prisma } from "@/prisma/client"
import { IssueStatusBadge } from "@/app/components"
import IssueActions from "./IssueActions"
import { Link } from "@/app/components"
import { Issue, Status } from "../generated/prisma"
import NextLink from "next/link"
import { ArrowUpIcon } from "@radix-ui/react-icons"

type SearchParams = Promise<{
	status: Status
	orderBy: keyof Issue
	// sort?: "asc" | "desc"
}>
interface Props {
	searchParams: SearchParams
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
	{ label: "Issues", value: "title" },
	{ label: "Status", value: "status", className: "hidden md:table-cell" },
	{ label: "Created", value: "updatedAt", className: "hidden md:table-cell" },
]

const IssuesPage = async (props: Props) => {
	const searchParams = await props.searchParams

	const statuses = Object.values(Status)
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined

	const orderBy = columns
		.map((column) => column.value)
		.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "desc" }
		: undefined

	const issues = await prisma.issue.findMany({
		where: { status },
		orderBy,
		// orderBy: [{ title: "desc" }, { status: "asc" }, { updatedAt: "desc" }],
	})

	return (
		<div>
			<IssueActions />
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								className={column.className}
								key={column.value}
							>
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: column.value,
										},
									}}
								>
									{column.label}
									{column.value === searchParams.orderBy && (
										<ArrowUpIcon className='inline' />
									)}
								</NextLink>
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className='block md:hidden'>
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className='hidden md:table-cell'>
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	)
}

export const dynamic = "force-dynamic"

export default IssuesPage
