"use client"
import { Box } from "@radix-ui/themes"
import classNames from "classnames"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
	const { status, data: session } = useSession()
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" },
	]
	const currentPath = usePathname()
	return (
		<nav className='border-b flex gap-x-3 h-14 items-center px-3'>
			<Link href='/'>
				<AiFillBug />
			</Link>
			<ul className='flex gap-x-3 px-3'>
				{links.map((link) => (
					<li key={link.href}>
						<Link
							className={classNames({
								"text-zinc-800": currentPath === link.href,
								"text-zinc-500": currentPath !== link.href,
								"hover: text-zinc-500 transition-colors font-bold": true,
							})}
							href={link.href}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<Box>
				{status === "authenticated" && (
					<Link href='api/auth/signout'>Log out</Link>
				)}
				{status === "unauthenticated" && (
					<Link href='api/auth/signin'>Login</Link>
				)}
			</Box>
		</nav>
	)
}

export default NavBar
