const isValidData = data => {
	return data !== null && Array.isArray(data)
}

const isValidId = id => {
	return id && typeof id === 'string'
}

const isValidItem = item => {
	return item !== null && typeof item === 'object' && !Array.isArray(item)
}

export function getNodeById(data, id) {
	if (!isValidId(id)) {
		console.warn('Invalid or missing id.')
	}

	if (!isValidData(data)) {
		console.warn('Invalid or missing data.')
		return null
	}

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
	if (!isValidId(id)) {
		console.warn('Invalid or missing id.')
		return null
	}

	if (!isValidData(nodes)) {
		console.warn('Invalid or missing data.')
		return null
	}

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
	if (!isValidData(nodes)) {
		console.warn('Invalid or missing data.')
		return null
	}

	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].children && nodes[i].children.length === 0) {
			nodes.splice(i, 1)
			i--
		}
	}
}

export function moveItemInTree(tree, setData, activeId, overId) {
	if (!isValidId(overId)) {
		console.warn('No overid found')
		return null
	}

	if (!isValidId(activeId)) {
		console.warn('No activeid found')
		return null
	}

	if (!isValidData(tree)) {
		console.warn('Invalid or missing data.')
		return null
	}

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

	const item = findAndRemove(tree, activeId)
	if (item) {
		insertItem(tree, overId, item)
	} else {
		console.warn('Item not found')
	}
	cleanEmptyNodes(tree)

	setData([...tree])
}

export function removeItem(nodes, setNodes, id) {
	if (!isValidId(id)) {
		console.warn('Invalid or missing id.')
		return null
	}

	if (!isValidData(nodes)) {
		console.warn('Invalid or missing data.')
		return null
	}

	findAndRemove(nodes, id)
	cleanEmptyNodes(nodes)
	setNodes([...nodes])
}

export function updateItem(nodes, setData, item) {
	if (!isValidData(nodes)) {
		console.warn('Invalid or missing data.')
		return null
	}

	if (!isValidItem(item)) {
		console.warn('Invalid item')
		return null
	}

	let itemUpdated = false
	const findItemToUpdate = nodes => {
		for (let node of nodes) {
			if (node.id === item.id) {
				node = item
				itemUpdated = true
				return
			} else {
				findItemToUpdate(node.children)
			}
		}
	}

	findItemToUpdate(nodes)
	if (itemUpdated) {
		setData(prevData => [...prevData])
	} else {
		console.warn('Data update failed. Item not found')
	}
}

export function insertNewItem(data, setData, item, parentId) {
	if (!isValidItem(item)) {
		console.warn('Invalid item')
		return null
	}

	if (!isValidData(data)) {
		console.warn('Invalid or missing data.')
		return null
	}

	if (!parentId) {
		const newItem = {
			children: [item],
			id: crypto.randomUUID(),
		}
		setData(prevData => [...prevData, newItem])
		return
	}

	let parentFound = false
	const findParentInNodes = nodes => {
		for (const node of nodes) {
			if (node.id === parentId) {
				node.children.push(item)
				parentFound = true
				return
			} else {
				findParentInNodes(node.children)
			}
		}
	}

	findParentInNodes(data)
	if (parentFound) {
		setData([...data])
	} else {
		console.warn('Cannot add item. Parent not found.')
	}
}
