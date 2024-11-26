import './globals.css'

export const metadata = {
	title: 'Droplo task',
	description: 'Solving the recruitment task',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
