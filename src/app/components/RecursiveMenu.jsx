import { DragDropContainer } from './DragDropContainer'

export function RecursiveMenu({ data, extended }) {
	return (
		<>
			{data.map((node, index) => {
				return (
					<DragDropContainer
						key={node.id}
						id={node.id}
						name={node.name}
						link={node.link}
						extended={extended}
						index={index}>
						{node.children && <RecursiveMenu data={node.children} extended={false} />}
					</DragDropContainer>
				)
			})}
		</>
	)
}
