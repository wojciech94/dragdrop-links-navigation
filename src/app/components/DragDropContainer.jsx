import { useDraggable, useDroppable } from '@dnd-kit/core'
import Image from 'next/image'
import { useState } from 'react'
import { AddMenu } from './AddMenu'
import { Button } from './Button'
import { useContext } from 'react'
import { UpdateMenuItemContext } from '../contexts/UpdateMenuItemContext'

export function DragDropContainer({ id, name, link, children, extended, index }) {
	const { setNodeRef: setDroppableRef } = useDroppable({ id })
	const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({ id })
	const [showAddItem, setShowAddItem] = useState({ state: false, isEdit: false })
	const [, , handleRemoveItem] = useContext(UpdateMenuItemContext)

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined

	const containerClass = extended ? '-mb-[1px]' : 'ml-16 -my-[1px]'
	const containerBorderClass = extended && index && index !== 0 ? 'border-t' : ''

	return (
		<div
			ref={node => {
				setDroppableRef(node)
				setDraggableRef(node)
			}}
			className={`${containerClass} ${containerBorderClass}`}
			style={style}>
			<div className='flex flex-col'>
				<div
					className={`flex items-start gap-2 p-6 bg-white ${
						extended ? 'border-b rounded-t-md' : 'rounded-es-md border-l border-t border-b'
					}`}>
					<button {...listeners} className='cursor-move p-[10px]' {...attributes}>
						<Image src='/move.svg' alt='Ikona kursora move' width={20} height={20} />
					</button>
					<div className='flex flex-col flex-1 gap-[6px] text-sm'>
						{name && <div className='font-semibold'>{name}</div>}
						{link && <div>{link}</div>}
					</div>
					<div className='flex border rounded-md text-sm font-semibold'>
						<Button type='button' className='border-r rounded-none py-2' onClick={() => handleRemoveItem(id)}>
							Usuń
						</Button>
						<Button
							type='button'
							className='border-r rounded-none py-2'
							onClick={() => setShowAddItem({ state: true, isEdit: true })}>
							Edytuj
						</Button>
						<Button type='button' className='py-2' onClick={() => setShowAddItem({ state: true, isEdit: false })}>
							Dodaj pozycję menu
						</Button>
					</div>
				</div>
				{showAddItem.state === true && (
					<AddMenu
						className='my-5'
						nodeId={id}
						handleShowAddMenu={() => setShowAddItem({ state: false, isEdit: false })}
						isEdit={showAddItem.isEdit}
					/>
				)}
				{children}
			</div>
		</div>
	)
}
