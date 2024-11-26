import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
	style: ['normal'],
	subsets: ['latin'],
	weight: ['400', '500', '600'],
})

export const metadata = {
	title: 'Droplo task',
	description: 'Solving the recruitment task',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
