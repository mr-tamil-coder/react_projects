import { useState } from 'react'
import GcpaCalci from './Component/GcpaCalci'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='center'>
      <GcpaCalci />
    </div>
  )
}

export default App
