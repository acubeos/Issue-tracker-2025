import { Button } from "@radix-ui/themes"
import Link from "next/link"

const IssueActions = () => {
	return (
		<div className='mb-4'>
			<Link href='/issues/new'>
				<Button>New Issue</Button>
			</Link>
		</div>
	)
}

export default IssueActions
