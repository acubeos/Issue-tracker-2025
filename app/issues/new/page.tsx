"use client"
import dynamic from "next/dynamic"
import LoadingNewIssue from "./loading"

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
	ssr: false,
	loading: () => <LoadingNewIssue />,
})

const NewIssuePage = () => {
	return <IssueForm />
}

export default NewIssuePage
