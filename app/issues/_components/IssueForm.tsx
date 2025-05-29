"use client"
import { Button, Callout, TextField } from "@radix-ui/themes"
import dynamic from "next/dynamic"
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from "@/app/validationSchemas"
import { z } from "zod"
import ErrorMessage from "@/app/components/ErrorMessage"
import { Issue } from "@/app/generated/prisma"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
})

type IssueFormData = z.infer<typeof createIssueSchema>

const IssueFOrm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IssueFormData>({
		resolver: zodResolver(createIssueSchema),
	})
	const [error, setError] = useState("")

	const onSubmit = handleSubmit(async (data) => {
		try {
			await axios.post("/api/issues", data)
			router.push("/issues")
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

				<Button loading={isSubmitting}>Submit New Issue</Button>
			</form>
		</div>
	)
}

export default IssueFOrm
