"use client"

import { Select } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import { Status } from "../generated/prisma"

const statuses: { label: string; value?: Status }[] = [
	{ label: "All" },
	{ label: "Open", value: "OPEN" },
	{ label: "Closed", value: "CLOSED" },
	{ label: "In Progress", value: "IN_PROGRESS" },
]

const IssueStatusFilter = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	return (
		<Select.Root
			defaultValue={searchParams.get("status") ?? ""}
			onValueChange={(status) => {
				const params = new URLSearchParams()
				if (status) params.append("status", status)
				if (searchParams.get("orderBy"))
					params.append("orderBy", searchParams.get("orderBy")!)

				// const query = status === "ALL" ? "" : `?status=${status}`
				const query = params.size ? `?${params.toString()}` : ""
				router.push(`/issues${query}`)
			}}
		>
			<Select.Trigger placeholder='Filter by status...' />
			<Select.Content>
				{statuses.map((status) => (
					<Select.Item
						key={status.value ?? "ALL"}
						value={status.value ?? "ALL"}
					>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export default IssueStatusFilter
