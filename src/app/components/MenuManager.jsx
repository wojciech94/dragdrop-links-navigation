'use client'
import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { AddMenu } from './AddMenu'
import { EmptyMenu } from './EmptyMenu'
import { RecursiveMenu } from './RecursiveMenu'
import { moveItemInTree } from '../lib/helpers'

export function MenuManager() {
	const [data, setData] = useState([
		{ id: '1', name: 'Promocje', link: 'www.aa.pp', children: [] },
		{
			id: '2',
			name: 'budynki',
			link: 'www.bb.pp',
			children: [
				{
					id: '3',
					name: 'Konkursy',
					link: 'www.cc.pp',
					children: [{ id: '5', name: 'e', link: 'www.ee.pp', children: [] }],
				},
				{ id: '4', name: 'Dialogi', link: 'www.dd.pp', children: [] },
			],
		},
	])
	const [showAddMenu, setShowAddMenu] = useState(false)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	)

	function handleDragEnd(e) {
		const { active, over } = e
		if (over && active.id !== over.id) {
			setData(prevData => moveItemInTree(prevData, active.id, over.id))
		}
	}

	const handleSetData = item => {
		setData(prevData => [...prevData, item])
	}

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			<div>
				<EmptyMenu handleShowAddMenu={setShowAddMenu} />
				{showAddMenu && <AddMenu handleShowAddMenu={setShowAddMenu} handleAddItem={handleSetData} />}
			</div>
			<div className='p-5 flex flex-col gap-[34px]'>
				<RecursiveMenu data={data} extended={true} />
			</div>
		</DndContext>
	)
}
