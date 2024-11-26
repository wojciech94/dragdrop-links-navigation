'use client'
export function Button({ className, onClick, children, imgBefore, type }) {
	const handleOnClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<button
			type={type}
			className={`flex items-center gap-1 px-4 py-3 rounded-md ${className ? className : ''}`}
			onClick={handleOnClick}>
			{imgBefore && imgBefore}
			<div className='px-[2px] text-sm'>{children}</div>
		</button>
	)
}
