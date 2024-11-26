import { DragDropContainer } from './DragDropContainer'

export function RecursiveMenu({ data }) {
	return (
		<>
			{data.map(node => (
				<DragDropContainer key={node.id} id={node.id} name={node.name} link={node.link}>
					{node.children && <RecursiveMenu data={node.children} />}
				</DragDropContainer>
			))}
		</>
	)
}
