import {LogOut} from 'lucide-react'
import {Link, useNavigate} from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
        // alert('Logged out successfully!')
    }

    return (
        <header className='bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
            <div className='flex space-x-6'>
            <Link to='/' className='text-xl font-bold hover:text-blue-200'>
                Healthcare Booking
            </Link>
            <Link to='/' className='hover:text-blue-200'>
                Doctors
            </Link>
            <Link to='/' className='hover:text-blue-200'>
                Appointments
            </Link>
            </div>
            <button
            type='button'
            onClick={handleLogout}
            className='flex items-center text-white hover:text-red-300 transition-colors'
            >
            <LogOut className='h-5 w-5 mr-1' /> Logout
            </button>
        </div>
        </header>
    )
}

export default Header
