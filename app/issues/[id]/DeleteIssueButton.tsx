"use client"
import { TrashIcon } from "@radix-ui/react-icons"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter()
	const [error, setError] = useState(false)
	const [isDeleting, setDeleting] = useState(false)

	const deleteIssue = async () => {
		try {
			await axios.delete(`/api/issues/${issueId}`)
			setDeleting(true)
			router.push("/issues")
			router.refresh()
		} catch {
			setError(true)
			setDeleting(false)
		}
	}

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button loading={isDeleting} color='red' onClick={deleteIssue}>
						<TrashIcon />
						Delete Issue
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content maxWidth='450px'>
					<AlertDialog.Title>Delete issue</AlertDialog.Title>
					<AlertDialog.Description size='2'>
						Are you sure? This issue will no longer be accessible.
					</AlertDialog.Description>

					<Flex gap='3' mt='4' justify='end'>
						<AlertDialog.Cancel>
							<Button variant='soft' color='gray'>
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant='solid' color='red'>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content maxWidth='450px'>
					<AlertDialog.Title color='red'>Error</AlertDialog.Title>
					<AlertDialog.Description size='2'>
						This issue could not be deleted
					</AlertDialog.Description>

					<Button
						color='gray'
						variant='soft'
						mt='2'
						onClick={() => setError(false)}
					>
						Ok
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	)
}

export default DeleteIssueButton
