const RightSideMain = () => {
    return (
        <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
            <div className='w-60 h-60 bg-gradient-to-tr from-green-700 to-green-400 rounded-full animate-bounce' />
            <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
        </div>
    )
}

export default RightSideMain