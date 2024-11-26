import { Button } from './Button'
const PlusCircle = <img src='/plusCircle.svg' alt='Ikona plus circle'></img>

export function EmptyMenu() {
	return (
		<div className='mt-[30px] mb-8 mx-5 py-6 px-4 rounded-md border-1 border-customBorder bg-gray-50 flex flex-col items-center text-black'>
			<h2 className='font-semibold'>Menu jest puste</h2>
			<p className='text-sm text-tertiary600 mb-6'>W tym menu nie ma jeszcze żadnych linków</p>
			<Button className={'bg-primary text-white'} imgBefore={PlusCircle}>
				Dodaj pozycję menu
			</Button>
		</div>
	)
}
