'use client'
import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { AddMenu } from './AddMenu'
import { EmptyMenu } from './EmptyMenu'
import { moveItemInTree } from '../lib/helpers'
import { MenuBox } from './MenuBox'

export function MenuManager() {
	const [data, setData] = useState([
		{
			children: [
				{ id: '1', name: 'Promocje', link: 'www.aa.pp', children: [] },
				{ id: '2', name: 'Promocje2', link: 'www.aa2.pp', children: [] },
			],
			id: 99,
		},
		{
			children: [
				{
					id: '3',
					name: 'budynki',
					link: 'www.bb.pp',
					children: [
						{
							id: '4',
							name: 'Konkursy',
							link: 'www.cc.pp',
							children: [{ id: '6', name: 'e', link: 'www.ee.pp', children: [] }],
						},
						{ id: '5', name: 'Dialogi', link: 'www.dd.pp', children: [] },
					],
				},
			],
			id: 98,
		},
	])
	const [showAddMenu, setShowAddMenu] = useState(false)

	const handleHideAddMenu = () => {
		setShowAddMenu(false)
	}

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
		setShowAddMenu(false)
	}

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			<div>
				<EmptyMenu handleShowAddMenu={setShowAddMenu} />
				{showAddMenu && <AddMenu handleShowAddMenu={handleHideAddMenu} handleAddItem={handleSetData} />}
			</div>
			<MenuBox data={data}></MenuBox>
		</DndContext>
	)
}
