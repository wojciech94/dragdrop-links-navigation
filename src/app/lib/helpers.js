export function getNodeById(data, id) {
	let fnode = null
	const findItem = nodes => {
		for (const node of nodes) {
			if (node.id === id) {
				fnode = node
				return node
			} else {
				findItem(node.children)
			}
		}
	}

	findItem(data)
	return fnode
}

const findAndRemove = (nodes, id) => {
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].id === id) {
			const removedItem = nodes.splice(i, 1)[0]
			return removedItem
		}

		if (nodes[i].children) {
			const removedItem = findAndRemove(nodes[i].children, id)
			if (removedItem) {
				return removedItem
			}
		}
	}

	return null
}

const cleanEmptyNodes = nodes => {
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].children && nodes[i].children.length === 0) {
			nodes.splice(i, 1)
			i--
		}
	}
}

export function moveItemInTree(tree, setData, activeId, overId) {
	const treeCopy = [...tree]
	const insertItem = (nodes, id, item) => {
		for (const node of nodes) {
			if (node.id === id) {
				node.children.push(item)
				return true
			}
			if (node.children) {
				if (insertItem(node.children, id, item)) {
					return true
				}
			}
		}
		return false
	}

	const item = findAndRemove(treeCopy, activeId)
	if (item) {
		insertItem(treeCopy, overId, item)
	}
	cleanEmptyNodes(treeCopy)

	setData([...treeCopy])
}

export function removeItem(nodes, setNodes, id) {
	findAndRemove(nodes, id)
	cleanEmptyNodes(nodes)
	setNodes([...nodes])
}

export function updateItem(data, setData, item) {
	const findItemToUpdate = nodes => {
		for (let node of nodes) {
			if (node.id === item.id) {
				node = item
			} else {
				findItemToUpdate(node.children)
			}
		}
	}

	findItemToUpdate(data)
	setData(prevData => [...prevData])
}

export function insertNewItem(data, setData, item, parentId) {
	if (!parentId) {
		const newItem = {
			children: [item],
			id: crypto.randomUUID(),
		}
		setData(prevData => [...prevData, newItem])
		return
	}
	const findParentInNodes = nodes => {
		for (const node of nodes) {
			if (node.id === parentId) {
				node.children.push(item)
			} else {
				findParentInNodes(node.children)
			}
		}
	}

	findParentInNodes(data)
	setData([...data])
}
