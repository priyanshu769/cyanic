import {createContext, useContext, useReducer} from "react";
import {videos, likedVideos, watchLater, playlists, reducer} from "../data/data"

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [app, dispatch] = useReducer(reducer, {videos, likedVideos, watchLater, playlists})
    return (
        <AppContext.Provider value={{app, dispatch}}>
        {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext)
}