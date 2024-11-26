import { useDraggable, useDroppable } from '@dnd-kit/core'
import Image from 'next/image'
import { Button } from './Button'

export function DragDropContainer({ id, name, link, children }) {
	const { setNodeRef: setDroppableRef } = useDroppable({ id })
	const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({ id })

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined

	return (
		<div
			ref={node => {
				setDroppableRef(node)
				setDraggableRef(node)
			}}
			className='border rounded-md'
			style={style}>
			<div className='flex flex-col gap-5 p-6 rounded-t-md bg-white'>
				<div className='flex items-start p-6'>
					<button {...listeners} className='cursor-move p-[10px]' {...attributes}>
						<Image src='/move.svg' alt='Ikona kursora move' width={20} height={20} />
					</button>
					<div className='flex flex-col flex-1 gap-[6px]'>
						{name && <div>{name}</div>}
						{link && <div>{link}</div>}
					</div>
					<div className='flex border rounded-md'>
						<Button type='button' className='border-r rounded-none'>
							Usuń
						</Button>
						<Button type='button' className='border-r rounded-none'>
							Edytuj
						</Button>
						<Button type='button'>Dodaj pozycję menu</Button>
					</div>
				</div>
				{children}
			</div>
			<div className='p-6 bg-background border-t'>
				<Button type='submit' className='border px-[14px] py-[10px] text-primaryDarker'>
					Dodaj pozycję menu
				</Button>
			</div>
		</div>
	)
}
