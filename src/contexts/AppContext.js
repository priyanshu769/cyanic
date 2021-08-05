import { createContext, useContext, useReducer } from 'react'
import { initialState, reducer } from '../utils/reducer'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [app, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ app, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return useContext(AppContext)
}
