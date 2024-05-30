import { signOut as awsSignOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading2, setIsLoading2] = useState(false)
    const [message, setMessage] = useState('')


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

    async function handleMessage (e) {
        setMessage(e.target.value)
    }

    async function handleSendMessage() {
        console.log("apretaste boton")
        fetch('http://34.229.221.55:80/send-message', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                bucketName: 'bank-consolidation-2',
                rootFile: 'cartola_parte_',
                numFiles: '1'
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la solicitud')
            }
            return response.json()
        })
        .then(data => {
            console.log('Mensaje enviado correctamente: ', data)
        })
        .catch(error => {
            console.error('Error: ', error)
        })
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
                    <div className='flex flex-col space-y-4 mt-5'>
                        <input 
                        type='text' 
                        value={message}
                        onChange={handleMessage}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Escribe algo..."
                        >
                        </input>
                        <button
                            onClick={handleSendMessage}
                            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out p-3 rounded-xl bg-green-700 text-white text-lg font-bold w-56'>
                            Enviar Mensaje
                        </button>
                        <button
                            onClick={handleSignOut}
                            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out p-3 rounded-xl bg-green-700 text-white text-lg font-bold w-56'>
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home