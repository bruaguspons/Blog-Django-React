import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import PUBLIC from '../routes/public.routes'

export const AuthGuard = () => {
    const { token } = useSelector(state => state.user)
    return !token ? <Navigate to={PUBLIC.LOGIN} /> : <Outlet />
}

