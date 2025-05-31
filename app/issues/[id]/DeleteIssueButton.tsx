import { TrashIcon } from "@radix-ui/react-icons"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import Link from "next/link"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color='red'>
					<TrashIcon />
					{/* <Link as={"child"} href={`/issues/${issueId}/delete`}> */}
					Delete Issue
					{/* </Link> */}
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
	)
}

export default DeleteIssueButton
