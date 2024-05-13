import { signOut as awsSignOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading2, setIsLoading2] = useState(false)


    async function handleSignOut() {
        setIsLoading2(true)
        try {
            await awsSignOut();
            setIsLoading(false)
            navigate("/login")
        } catch (error) {
            setIsLoading(false)
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
                {isLoading2 ? (
                    <Loader></Loader>
                ) : (
                    <>
                        <button
                            onClick={handleSignOut}
                            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out p-3 rounded-xl bg-green-700 text-white text-lg font-bold'>
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
export default Home