module.exports = babel => {
	let importReact = `import React from 'react'`
	const reactHooks = [
		'useState',
		'useEffect',
		'useContext',
		'useReducer',
		'useCallback',
		'useMemo',
		'useRef',
		'useImperativeHandle',
		'useLayoutEffect',
		'useDebugValue'
	]
	let foundHooks = []
	let isReactImported = false

	const lookForReactImport = {
		ImportDeclaration(path) {
			if (isReactImported) return
			const { value: importTarget } = path.node.source
			if (importTarget === 'react') {
				isReactImported = true
				return
			}
		}
	}

	const lookForReactHooks = {
		CallExpression(path) {
			if (isReactImported) false
			const { name: reactHook } = path.node.callee
			if (reactHooks.includes(reactHook) && !foundHooks.includes(reactHook)) {
				foundHooks.push(reactHook)
				if (foundHooks.length > 0) {
					importReact = `import React, { ${foundHooks.join(', ')} } from 'react'`
				}
			}
		}
	}

	return {
		name: 'inject-react-import',
		visitor: {
			Program(path) {
				path.traverse(lookForReactImport)
				path.traverse(lookForReactHooks)
				if (!isReactImported) {
					path.parent.program.body.unshift(babel.parse(importReact).program.body[0])
				}
			}
		}
	}
}
