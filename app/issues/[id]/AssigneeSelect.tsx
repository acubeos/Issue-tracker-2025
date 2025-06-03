"use client"
import { Issue, User } from "@/app/generated/prisma"
import { Select, Skeleton } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, error, isLoading } = useUsers()

	if (error) return null

	if (isLoading) return <Skeleton height='2rem' />

	const assignedIssue = (userId: string) => {
		axios
			.patch(`/api/issues/${issue.id}`, {
				assignedToUserId: userId === "unassigned" ? null : userId,
			})
			.catch(() => toast.error("Changes could not be saved."))
	}
	return (
		<>
			<Select.Root
				defaultValue={issue.assignedToUserId || "unassigned"}
				onValueChange={assignedIssue}
			>
				<Select.Trigger placeholder='Assign...' />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value='unassigned'>Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	)
}

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		staleTime: 60 * 1000,
		retry: 3,
	})

export default AssigneeSelect
