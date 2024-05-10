import * as React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmSignUp } from 'aws-amplify/auth';
import { useLocation } from 'react-router-dom';
import { resendSignUpCode } from 'aws-amplify/auth';
import Loader from './Loader';

const VerificationForm = (props) => {
    const { username } = props
    const [confirmationCode, setConfirmationCode] = useState("");
    const [inConfirmation, setInConfirmation] = useState(true)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const location = useLocation()
    const currentUrl = location.pathname
    const navigate = useNavigate()

    const onChangeCode = (e) => {
        const cod_verif = e.target.value;
        setConfirmationCode(cod_verif);
    };

    async function handleSignUpConfirmation() {
        setLoading(true)
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username,
                confirmationCode
            })
            if (isSignUpComplete) {
                setLoading(false)
                setInConfirmation(false)
            }
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    function handleRedirectLogin() {
        if (currentUrl === '/register') {
            navigate('/login')
        } else {
            window.location.reload();
        }
    }

    const handleResendCode = async () => {
        setLoading2(true)
        try {
            const {
                destination,
                deliveryMedium,
                atributeName
            } = await resendSignUpCode({ username })
            setLoading2(false)
        } catch (error) {
            setLoading2(false)
            console.log(error)
        }
    }

    return (
        <>
            {inConfirmation ? (
                <div className='bg-white px-10 py-20 rounded-3xl border-gray-200'>
                    <h2 className='text-4xl font-semibold'>Te enviamos un email.</h2>
                    <p className='font-medium text-lg text-gray-500 mt-4 max-w-md'>Tu código está en camino. Para iniciar sesión, ingresa el código que enviamos a tu correo. Podría tomar un minuto en llegar.</p>

                    <div className='mt-8'>
                        <div>
                            <label className='text-lg font-medium'>Código de verificación</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder='Ingresa tu código'
                                onChange={onChangeCode}
                            />
                        </div>
                        {error && <p className='text-red-500 mt-4 max-w-md'>{error}</p>}
                        <div className='mt-8 flex flex-col gap-y-4'>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <button
                                    onClick={handleSignUpConfirmation}
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-green-700 text-white text-lg font-bold'>
                                    Confirmar
                                </button>
                            )}
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>¿No recibiste tu código?</p>
                            {loading2 ? (
                                <Loader></Loader>
                            ) : (
                                <button
                                    onClick={handleResendCode}
                                    className='text-green-700 text-base font-medium ml-2'>Reenviar código</button>
                            )}
                        </div>
                        <div className='text-base text-slate-400 mt-2 flex justify-center items-center'>
                            <p className='font-medium text-base'>Recuerda revisar tu carpeta de Spam.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='bg-white px-10 py-20 rounded-3xl border-gray-200'>
                    <h2 className='text-4xl font-semibold'>Listo</h2>
                    <p className='font-medium text-lg text-gray-500 mt-4 max-w-md'>Tu verificación ha sido exitosa.</p>

                    <div className='mt-8'>

                        <div className='mt-8 flex justify-center items-center'>
                            <button
                                onClick={handleRedirectLogin}
                                className='text-green-700 text-base font-medium ml-2'>Iniciar Sesión</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default VerificationForm