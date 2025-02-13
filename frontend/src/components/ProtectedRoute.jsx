import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { myContext } from '../context/ContextProvider.jsx'

const ProtectedRoute = () => {
    const { user, setUser } = useContext(myContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get("/auth/profile");
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false)
            }
        };

        fetchProfile();
    }, []);

    if (loading) { return <div>loading...</div> }
    return (user ? <Outlet /> : <Navigate to='/signin' />)
}

export default ProtectedRoute