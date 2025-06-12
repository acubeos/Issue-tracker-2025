"use client"
import { Card } from "@radix-ui/themes"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts"

interface Props {
	status: { open: number; closed: number; inProgress: number }
}

const IssueChart = ({ status: { open, closed, inProgress } }: Props) => {
	const data = [
		{ name: "Open", value: open },
		{ name: "In Progress", value: inProgress },
		{ name: "Closed", value: closed },
	]
	return (
		<Card>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart data={data}>
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Bar
						dataKey='value'
						barSize={50}
						style={{ fill: "var(--accent-9)" }}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	)
}

export default IssueChart
