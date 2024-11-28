import { useDroppable } from '@dnd-kit/core'
import { Button } from './Button'

export function MenuFooter({ id, handleShowAddItem }) {
	const { setNodeRef } = useDroppable({ id })

	return (
		<>
			<div ref={setNodeRef} className='p-6 bg-background border-t border-borderLight rounded-b-md'>
				<Button
					type='submit'
					className='border px-[14px] py-[10px] font-semibold bg-white'
					onClick={() => handleShowAddItem(id)}>
					Dodaj pozycję menu
				</Button>
			</div>
		</>
	)
}
