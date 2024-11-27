export function moveItemInTree(tree, activeId, overId) {
	const findAndRemove = (nodes, id) => {
		for (let i = 0; i < nodes.length; i++) {
			if (nodes[i].id === id) {
				return nodes.splice(i, 1)[0]
			}
			if (nodes[i].children) {
				const item = findAndRemove(nodes[i].children, id)
				if (item) return item
			}
		}
	}

	const insertItem = (nodes, id, item) => {
		for (const node of nodes) {
			if (node.id === id) {
				node.children.push(item)
				return
			}
			if (node.children) {
				insertItem(node.children, id, item)
			}
		}
	}

	const item = findAndRemove(tree, activeId)
	if (item) {
		insertItem(tree, overId, item)
	}
	return [...tree]
}
