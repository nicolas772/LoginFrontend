import { signOut as awsSignOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';


const Home = () => {
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
                const user = await getCurrentUser();
                setUser(user)
            } catch (error) {
                console.error('Error al obtener el usuario actual:', error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchCurrentUser()
    }, [])

    async function GetDetails() {
        const getCurrent = await getCurrentUser();
        const session = await fetchAuthSession();
        console.log(getCurrent)
        console.log(session)
    }

    if (isLoading || !user) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='m-8'>
            <div>
                <p>¡Bienvenido, {user.signInDetails.loginId}!</p>
            </div>
            <div>
                <button
                    onClick={handleSignOut}
                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out p-3 rounded-xl bg-green-700 text-white text-lg font-bold'>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}
export default Home