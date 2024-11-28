'use client'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import { Button } from './Button'
import Image from 'next/image'
import { useContext } from 'react'
import { UpdateMenuItemContext } from '../contexts/UpdateMenuItemContext'
import { getNodeById } from '../lib/helpers'

export function AddMenu({ handleShowAddMenu, className, nodeId, isEdit }) {
	const [data, handleSetData] = useContext(UpdateMenuItemContext)
	const node = getNodeById(data, nodeId)

	const validate = values => {
		const errors = {}

		if (!values.name) {
			errors.name = 'Pole nazwa jest wymagane'
		}

		if (!/^((https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?$/.test(values.link)) {
			errors.link = 'Niepoprawny format linku'
		}

		return errors
	}

	const onSubmit = values => {
		const item = isEdit
			? node
			: {
					id: crypto.randomUUID(),
					children: [],
			  }
		item.name = values.name
		item.link = values.link
		handleSetData(item, nodeId, isEdit)
		handleShowAddMenu(nodeId, isEdit)
	}

	const initValues = { name: (isEdit && node?.name) || '', link: (isEdit && node?.link) || '' }

	return (
		<div className={`${className} border rounded-md bg-white mx-5 py-5 px-6`}>
			<Formik initialValues={initValues} onSubmit={values => onSubmit(values)} validate={validate}>
				{({ errors, touched, setErrors, setTouched, setValues }) => (
					<Form className='flex gap-4 items-start'>
						<div className='flex flex-col gap-2 flex-1'>
							<div className='flex flex-col gap-[6px]'>
								<label htmlFor='name' className='text-sm font-medium'>
									Nazwa
								</label>
								<Field
									name='name'
									type='text'
									placeholder='np. Promocje'
									className={`${
										errors.name && touched.name ? 'border-red-700' : ''
									} border rounded-md px-3 py-2 placeholder-placeholderColor`}
								/>
								<ErrorMessage name='name' component='div' className='text-red-700' />
							</div>
							<div className='flex flex-col gap-[6px]'>
								<label htmlFor='link' className='text-sm font-medium'>
									Link
								</label>
								<div className='relative w-full'>
									<label
										htmlFor='link'
										className='absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
										<Image src='/search.svg' alt='Search Icon' width={16} height={16} />
									</label>
									<Field
										name='link'
										type='text'
										placeholder='Wklej lub wyszukaj'
										className={`${
											errors.link && touched.link ? 'border-red-700' : ''
										} border rounded-md px-3 py-2 w-full pl-8 items-center placeholder-placeholderColor`}
									/>
								</div>
								<ErrorMessage name='link' component='div' className='text-red-700' />
							</div>
							<div className='flex gap-2 mt-3 font-semibold'>
								<Button type='button' className='border px-[13px] py-[9px]' onClick={() => handleShowAddMenu(nodeId)}>
									Anuluj
								</Button>
								<Button type='submit' className='border px-[13px] py-[9px] text-primaryDarker'>
									{isEdit ? 'Zapisz' : 'Dodaj'}
								</Button>
							</div>
						</div>
						<Button
							type='button'
							className='w-10 px-[10px] py-[10px]'
							imgBefore={<Image src='/trash.svg' alt='Trash Icon' width={20} height={20} />}
							onClick={() => {
								setValues({ name: '', link: '' })
								setErrors({})
								setTouched({})
							}}
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}
