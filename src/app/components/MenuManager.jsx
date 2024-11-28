'use client'
import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, pointerWithin } from '@dnd-kit/core'
import { AddMenu } from './AddMenu'
import { EmptyMenu } from './EmptyMenu'
import { insertNewItem, moveItemInTree, removeItem, updateItem } from '../lib/helpers'
import { MenuBox } from './MenuBox'
import { UpdateMenuItemContext } from '../contexts/UpdateMenuItemContext'

export function MenuManager() {
	const [data, setData] = useState([])
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
			moveItemInTree(data, setData, active.id, over.id)
		}
	}

	const handleSetData = (item, parentId, isEdit) => {
		if (isEdit) {
			updateItem(data, setData, item)
		} else {
			insertNewItem(data, setData, item, parentId)
		}
		if (!parentId) {
			setShowAddMenu(false)
		}
	}

	const handleRemoveItem = id => {
		removeItem(data, setData, id)
	}

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={pointerWithin}>
			<UpdateMenuItemContext.Provider value={[data, handleSetData, handleRemoveItem]}>
				<EmptyMenu handleShowAddMenu={setShowAddMenu} />
				{showAddMenu && <AddMenu handleShowAddMenu={() => setShowAddMenu(false)} />}
				<MenuBox data={data}></MenuBox>
			</UpdateMenuItemContext.Provider>
		</DndContext>
	)
}
