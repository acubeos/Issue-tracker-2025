import React from "react"
import { Status } from "../generated/prisma"
import { Badge } from "@radix-ui/themes"

const statusMap: Record<
	Status,
	{ label: string; color: "red" | "violet" | "green" }
> = {
	open: { label: "Open", color: "red" },
	in_progress: { label: "In Progress", color: "violet" },
	closed: { label: "Closed", color: "green" },
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
	return (
		<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
	)
}

export default IssueStatusBadge
