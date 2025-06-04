"use client"
import { Select } from "@radix-ui/themes"
import { Status } from "../generated/prisma"

const IssueStatusFilter = () => {
	const statuses: { label: string; value?: Status }[] = [
		{ label: "All" },
		{ label: "Open", value: "open" },
		{ label: "Closed", value: "closed" },
		{ label: "In Progress", value: "in_progress" },
	]

	return (
		<Select.Root>
			<Select.Trigger placeholder='Filter by status...' />
			<Select.Content>
				{statuses.map((status) => (
					<Select.Item key={status.label} value={status.value!}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export default IssueStatusFilter
