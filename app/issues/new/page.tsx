"use client"
import { Button, Callout, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from "@/app/validationSchemas"
import { z } from "zod"
import ErrorMessage from "@/app/components/ErrorMessage"

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
	const router = useRouter()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	})
	const [error, setError] = useState("")

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post("/api/issues", data)
						router.push("/issues")
						alert("Issue created successfully!")
					} catch {
						setError("Failed to create issue. Please try again.")
					}
				})}
				className='space-y-3'
			>
				<TextField.Root placeholder='Title' {...register("title")}>
					<TextField.Slot />
				</TextField.Root>

				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>

				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button loading={isSubmitting}>Submit New Issue</Button>
			</form>
		</div>
	)
}

export default NewIssuePage
