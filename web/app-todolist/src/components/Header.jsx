import logo from '../assets/logo.png'

export const Header = ()=> {
    return (
        <div className='flex justify-around items-center'>
            <img src={logo} alt="logo" className='h-[110px]'/>
            <h1 className='text-[20px] text-white font-bold mt-6 tracking-wide px-2'>Services log</h1>
        </div>
    )
}