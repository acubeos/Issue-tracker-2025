"use client"
import ErrorMessage from "@/app/components/ErrorMessage"
import { Issue } from "@/app/generated/prisma"
import { IssueSchema } from "@/app/validationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Callout, TextField } from "@radix-ui/themes"
import axios from "axios"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

type IssueFormData = z.infer<typeof IssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IssueFormData>({
		resolver: zodResolver(IssueSchema),
	})
	const [error, setError] = useState("")

	const onSubmit = handleSubmit(async (data) => {
		try {
			if (issue) await axios.patch(`/api/issues/${issue.id}`, data)
			else await axios.post("/api/issues", data)
			router.push("/issues")
			router.refresh()
		} catch {
			setError("Failed to create issue. Please try again.")
		}
	})

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form onSubmit={onSubmit} className='space-y-3'>
				<TextField.Root
					defaultValue={issue?.title}
					placeholder='Title'
					{...register("title")}
				>
					<TextField.Slot />
				</TextField.Root>

				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				<Controller
					name='description'
					defaultValue={issue?.description}
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>

				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button loading={isSubmitting}>
					{issue ? "Update Issue" : "Submit New Issue"}
				</Button>
			</form>
		</div>
	)
}

export default IssueForm
