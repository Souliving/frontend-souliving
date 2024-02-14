import { useLocation, Navigate } from 'react-router-dom'

function RequireAuth (props: { children: any }) {
    const auth = true
    const location = useLocation()

    if (!auth) {
        return <Navigate to="/home" state={{from: location}} />
    }

    return props.children
}

export default RequireAuth