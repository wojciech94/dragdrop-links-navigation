import { useDroppable } from '@dnd-kit/core'
import { Button } from './Button'

export function MenuFooter({ id, handleShowAddItem }) {
	const { setNodeRef } = useDroppable({ id })

	return (
		<>
			<div ref={setNodeRef} className='px-6 py-5 bg-background border-t border-borderLight rounded-b-md'>
				<Button
					type='submit'
					className='border px-[13px] py-[9px] font-semibold bg-white'
					onClick={() => handleShowAddItem(id)}>
					Dodaj pozycję menu
				</Button>
			</div>
		</>
	)
}
