import { createContext, useContext, useReducer } from 'react'
import { initialState, AppReducer } from '../Utils'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [app, dispatch] = useReducer(AppReducer, initialState)
  return (
    <AppContext.Provider value={{ app, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return useContext(AppContext)
}
