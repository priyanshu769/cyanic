import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../Contexts/AppContext'

export const AuthRequired = () => {
    const { app } = useApp()
    return app.loggedInToken ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    )
}
