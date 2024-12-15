import { useState } from 'react'

import './App.css'
import Signup from './components/Signup'
import { ContextProvider } from './context/Context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ContextProvider>
      <Signup/>
    </ContextProvider>
  )
}

export default App
