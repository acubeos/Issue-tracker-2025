import { Box, Flex, Skeleton } from "@radix-ui/themes"
import React from "react"

const LoadingNewIssue = () => {
	return (
		<Box className='max-w-xl'>
			<Flex direction='column' gap='3'>
				<Skeleton />
				<Skeleton height='20rem' />
			</Flex>
		</Box>
	)
}

export default LoadingNewIssue
