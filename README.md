# babel-plugin-import-react

> A small babel plugin to automatically import React and it's hooks on your components

## Installation

```bash
# yarn
yarn add --dev babel-plugin-import-react

# npm
npm i --save-dev babel-plugin-import-react
```

# Usage

Include it on your `.babelrc`

```json
{
	"plugins": ["import-react"]
}
```

Now you can write all your components this way (without importing React and it's hooks)

```jsx
// index.jsx
import { render } from 'react-dom'
import App from './App.jsx'

render(<App />, document.getElementById('app'))
```

```jsx
// App.jsx
const App = () => {
	// No need to import the `useState` hook
	const [msg] = useState('Hello World from App!')
	return <h1>{msg}</h1>
}

export default App
```