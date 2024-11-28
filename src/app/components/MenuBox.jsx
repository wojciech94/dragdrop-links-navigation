import { useState } from 'react'
import { AddMenu } from './AddMenu'
import { MenuFooter } from './MenuFooter'
import { RecursiveMenu } from './RecursiveMenu'

export function MenuBox({ data }) {
	const [showAddItem, setShowAddItem] = useState(() => Object.fromEntries(data.map(d => [d.id, false])))

	const toggleShowAddItem = id => {
		setShowAddItem(prev => ({ ...prev, [id]: !prev[id] }))
	}

	const containerClass = 'border border-borderDark rounded-md flex flex-col'

	return (
		<div className='p-5 flex flex-col gap-[34px]'>
			{data &&
				Array.isArray(data) &&
				data.map(d => (
					<div key={d.id} className={containerClass}>
						<RecursiveMenu data={d.children} extended></RecursiveMenu>
						{showAddItem[d.id] && <AddMenu className='mx-6 my-4' handleShowAddMenu={toggleShowAddItem} nodeId={d.id} />}
						<MenuFooter id={d.id} handleShowAddItem={toggleShowAddItem} />
					</div>
				))}
		</div>
	)
}
