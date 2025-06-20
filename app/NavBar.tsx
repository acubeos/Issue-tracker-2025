"use client"

import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Skeleton,
	Text,
} from "@radix-ui/themes"
import classNames from "classnames"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
	return (
		<nav className='border-b py-3 px-3'>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
						<Link href='/'>
							<AiFillBug />
						</Link>
						<NavLinks />
					</Flex>

					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	)
}

const AuthStatus = () => {
	const { status, data: session } = useSession()

	if (status === "loading") return <Skeleton width='3rem' height='1rem' />
	if (status === "unauthenticated")
		return (
			<Link className='nav-link' href='api/auth/signin'>
				Login
			</Link>
		)
	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session!.user!.image!}
						fallback='?'
						size='2'
						radius='full'
						className='cursor-pointer'
						// referrerPolicy='no-referrer'
					/>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size='2'>{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link href='api/auth/signout'>Log out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	)
}

const NavLinks = () => {
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" },
	]
	const currentPath = usePathname()

	return (
		<ul className='flex gap-x-3 px-3'>
			{links.map((link) => (
				<li key={link.href}>
					<Link
						className={classNames({
							"nav-link": true,
							"!text-zinc-900": currentPath === link.href,
						})}
						href={link.href}
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default NavBar
