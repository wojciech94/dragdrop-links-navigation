'use client'
import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { AddMenu } from './AddMenu'
import { EmptyMenu } from './EmptyMenu'
import { RecursiveMenu } from './RecursiveMenu'

export function MenuManager() {
	const [data, setData] = useState([
		{ id: '1', name: 'a', link: 'www.aa.pp', children: [] },
		{
			id: '2',
			name: 'b',
			link: 'www.bb.pp',
			children: [
				{ id: '3', name: 'c', link: 'www.cc.pp', children: [{ id: '5', name: 'e', link: 'www.ee.pp', children: [] }] },
				{ id: '4', name: 'd', link: 'www.dd.pp', children: [] },
			],
		},
	])

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

	function moveItemInTree(tree, activeId, overId) {
		const findAndRemove = (nodes, id) => {
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i].id === id) {
					return nodes.splice(i, 1)[0]
				}
				if (nodes[i].children) {
					const item = findAndRemove(nodes[i].children, id)
					if (item) return item
				}
			}
		}

		const insertItem = (nodes, id, item) => {
			for (const node of nodes) {
				if (node.id === id) {
					node.children.push(item)
					return
				}
				if (node.children) {
					insertItem(node.children, id, item)
				}
			}
		}

		const item = findAndRemove(tree, activeId)
		if (item) {
			insertItem(tree, overId, item)
		}
		return [...tree]
	}

	const handleSetData = item => {
		setData(prevData => [...prevData, item])
	}

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			<div>
				<EmptyMenu />
				<AddMenu handleAddItem={handleSetData} />
			</div>
			<div className='p-5 flex flex-col gap-[34px]'>
				<RecursiveMenu data={data} />
			</div>
		</DndContext>
	)
}
