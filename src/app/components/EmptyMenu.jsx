import { Button } from './Button'
const PlusCircle = <img src='/plusCircle.svg' alt='Ikona plus circle'></img>

export function EmptyMenu({ handleShowAddMenu }) {
	return (
		<div className='mt-[30px] mb-8 mx-5 py-6 px-4 rounded-md border-1 border-borderLight bg-gray-50 flex flex-col items-center text-black'>
			<h2 className='font-semibold'>Menu jest puste</h2>
			<p className='text-sm text-tertiary mb-6'>W tym menu nie ma jeszcze żadnych linków</p>
			<Button
				className={'bg-primary text-white px-[14px] py-[10px]'}
				imgBefore={PlusCircle}
				onClick={() => handleShowAddMenu(true)}>
				<span className='font-semibold'>Dodaj pozycję menu</span>
			</Button>
		</div>
	)
}
