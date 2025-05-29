import { Box, Card, Flex, Skeleton } from "@radix-ui/themes"
import React from "react"

const LoadingIssueDetailSkeleton = () => {
	return (
		<Box className='max-w-xl'>
			<Skeleton />
			<Flex gap='3' my='2'>
				<Skeleton width='5rem' />
				<Skeleton width='8rem' />
			</Flex>
			<Card className='prose lg:prose-xl' mt='4'>
				<Flex direction='column' gap='2'>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</Flex>
			</Card>
		</Box>
	)
}

export default LoadingIssueDetailSkeleton
