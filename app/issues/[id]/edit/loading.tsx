import { Box, Flex, Skeleton } from "@radix-ui/themes"

const EditLoadingSkeleton = () => {
	return (
		<Box className='max-w-xl'>
			<Flex direction='column' gap='3'>
				<Skeleton height='2rem' />
				<Skeleton height='20rem' />
			</Flex>
		</Box>
	)
}

export default EditLoadingSkeleton
