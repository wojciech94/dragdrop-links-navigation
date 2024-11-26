'use client'
import { useState } from 'react'
import { AddMenu } from './AddMenu'
import { EmptyMenu } from './EmptyMenu'

export function MenuManager() {
	const [menu, setMenu] = useState(null)
	return (
		<div>
			<EmptyMenu />
			<AddMenu />
		</div>
	)
}
