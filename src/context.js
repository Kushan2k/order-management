import React, { useState } from "react"
const Context = React.createContext()

function DataContext({ children }) {
  const [stocks, setstocks] = useState([])
  const [login, setLogin] = useState(0)
  const [name, setName] = useState("")
  return (
    <Context.Provider
      value={{ stocks, setstocks, login, setLogin, name, setName }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context }

export default DataContext
