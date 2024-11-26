import { useDraggable } from '@dnd-kit/core'
import { Button } from './Button'
import Image from 'next/image'

export function Draggable({ id, name, link, children }) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
	})
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined
	return (
		<div ref={setNodeRef} style={style} className='border rounded-md'>
			<div className='flex items-center p-6 bg-white rounded-t-md'>
				<button {...listeners} className='cursor-move p-[10px]' {...attributes}>
					<Image src='/move.svg' alt='Ikona kursora move' width={20} height={20} />
				</button>
				<div className='flex flex-col gap-[6px]'>
					{name && <div>{name}</div>}
					{link && <div>{link}</div>}
					{children}
				</div>
			</div>
			<div className='p-6'>
				<Button type='submit' className='border px-[14px] py-[10px] text-primaryDarker'>
					Dodaj pozycję menu
				</Button>
			</div>
		</div>
	)
}
