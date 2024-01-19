import { useState } from 'react'
import TodoList from './Component/TodoList'
import GcpaCalci from './Component/GcpaCalci'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GcpaCalci />
    </>
  )
}

export default App
