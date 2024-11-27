import { useDraggable, useDroppable } from '@dnd-kit/core'
import Image from 'next/image'
import { Button } from './Button'

export function DragDropContainer({ id, name, link, children, extended, index }) {
	const { setNodeRef: setDroppableRef } = useDroppable({ id })
	const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({ id })

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
						<Button type='button' className='border-r rounded-none py-2'>
							Usuń
						</Button>
						<Button type='button' className='border-r rounded-none py-2'>
							Edytuj
						</Button>
						<Button type='button' className='py-2'>
							Dodaj pozycję menu
						</Button>
					</div>
				</div>
				{children}
			</div>
		</div>
	)
}
