import { Card, Flex, Text } from "@radix-ui/themes"
import { Status } from "./generated/prisma"
import Link from "next/link"

interface Props {
	// open: number
	// closed: number
	// inProgress: number
	status: { open: number; closed: number; inProgress: number }
}

const IssueSummary = ({ status: { open, closed, inProgress } }: Props) => {
	const containers: { label: string; value: number; status: Status }[] = [
		{ label: "Open Issues", value: open, status: "OPEN" },
		{ label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
		{ label: "Closed Issues", value: closed, status: "CLOSED" },
	]
	return (
		<Flex gap='3'>
			{containers.map((container) => (
				<Card key={container.status}>
					<Flex direction='column' gap='2'>
						<Link
							className='text-sm font-medium'
							href={`/issues?status=${container.status}`}
						>
							{container.label}
						</Link>
						<Text size='5' weight='bold'>
							{container.value}
						</Text>
					</Flex>
				</Card>
			))}
		</Flex>
	)
}

export default IssueSummary
