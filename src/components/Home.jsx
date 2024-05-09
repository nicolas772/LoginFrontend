import { signOut as awsSignOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    async function handleSignOut() {
        try {
            await awsSignOut();
            navigate("/login")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return (
        <div className='mt-8 flex flex-col gap-y-4'>
            <button
                onClick={handleSignOut}
                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-green-700 text-white text-lg font-bold'>
                Cerrar Sesión
            </button>
        </div>
    )
}
export default Home