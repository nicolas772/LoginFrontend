import { signOut as awsSignOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const Prueba = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    async function handleSignOut() {
        try {
            await awsSignOut();
            navigate("/login")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userAttributes = await fetchUserAttributes()
                setUser(userAttributes)
                //console.log(user)
            } catch (error) {
                console.error('Error al obtener el usuario actual:', error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchCurrentUser()
    }, [])

    if (isLoading || !user) {
        return <Loader />;
    }

    return (
        <div className='m-8'>
            <div>
                <p>¡Bienvenido, {user.email}!</p>
            </div>
            <div>
                <p>Te amo mucho ❤️</p>
            </div>

        </div>
    )
}
export default Prueba