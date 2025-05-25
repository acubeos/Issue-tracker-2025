import Link from "next/link"
import React from "react"
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues" },
	]
	return (
		<nav className='border-b flex gap-x-3 h-14 items-center px-3'>
			<Link href='/'>
				<AiFillBug />
			</Link>
			<ul className='flex gap-x-3 px-3'>
				{links.map((link) => (
					<li key={link.href}>
						<Link
							className='text-zinc-500 hover:text-zinc-800 transition-colors'
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
