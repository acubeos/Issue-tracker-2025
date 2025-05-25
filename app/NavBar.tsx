"use client"
import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
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
		</nav>
	)
}

export default NavBar
