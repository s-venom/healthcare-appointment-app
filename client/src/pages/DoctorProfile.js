import {useState, useEffect} from 'react'
import {User, ArrowLeft, Star, MapPin, Clock, Calendar} from 'lucide-react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppointment} from '../contexts/AppointmentContext'
import BookingForm from '../components/BookingForm'

function DoctorProfile() {
    const location = useLocation()
    const navigate = useNavigate()
    const {getDoctorById} = useAppointment()
    const doctorId = location.pathname.split('/').pop()
    const [doctor, setDoctor] = useState(getDoctorById(doctorId))

    useEffect(() => {
        if (!doctor) {
        fetch(`/api/doctors/${doctorId}`)
            .then(response => {
            if (!response.ok) throw new Error('Doctor not found')
            return response.json()
            })
            .then(data => setDoctor(data))
            .catch(error => console.error('Error fetching doctor:', error))
        }
    }, [doctorId, doctor])

    if (!doctor) {
        return (
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
                Doctor Not Found
            </h1>
            <p className='text-gray-600 mb-6'>
                The doctor you're looking for doesn't exist.
            </p>
            <button
                type='button'
                onClick={() => navigate('/')}
                className='flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            >
                <ArrowLeft className='h-4 w-4 mr-2' /> Back to Doctors
            </button>
            </div>
        </div>
        )
    }

    const availableSlots = doctor.availableSlots.filter(slot => !slot.isBooked)

    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <button
            type='button'
            onClick={() => navigate('/')}
            className='mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors'
        >
            <ArrowLeft className='h-4 w-4 mr-2' /> Back to Doctors
        </button>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
                <div className='flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6'>
                <div className='relative flex-shrink-0 self-center sm:self-start'>
                    <img
                    src={
                        doctor.profileImage ||
                        '/placeholder.svg?height=200&width=200'
                    }
                    alt={doctor.name}
                    className='w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full object-cover'
                    />
                    <div
                    className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-4 border-white ${
                        doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    />
                </div>
                <div className='flex-1 text-center sm:text-left'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                    {doctor.name}
                    </h1>
                    <p className='text-lg sm:text-xl text-blue-600 font-medium mb-4'>
                    {doctor.specialization}
                    </p>
                    <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-6 mb-4'>
                    <div className='flex items-center'>
                        <Star className='h-5 w-5 text-yellow-400 fill-current' />
                        <span className='ml-1 font-medium'>{doctor.rating}</span>
                        <span className='ml-1 text-gray-600'>rating</span>
                    </div>
                    <div className='flex items-center'>
                        <Clock className='h-5 w-5 text-gray-400' />
                        <span className='ml-1 text-gray-600'>
                        {doctor.experience} years experience
                        </span>
                    </div>
                    </div>
                    <div className='flex items-center justify-center sm:justify-start mb-4'>
                    <MapPin className='h-5 w-5 text-gray-400' />
                    <span className='ml-1 text-gray-600'>{doctor.location}</span>
                    </div>
                    <div className='flex justify-center sm:justify-start'>
                    <div
                        className={`px-3 py-1 rounded-full text-sm ${
                        doctor.isAvailable
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        {doctor.isAvailable
                        ? 'Available for Appointments'
                        : 'Currently Unavailable'}
                    </div>
                    </div>
                </div>
                </div>
                <div className='mt-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                    About
                </h3>
                <p className='text-gray-600 leading-relaxed'>{doctor.bio}</p>
                </div>
            </div>
            <div className='bg-white rounded-lg shadow-lg p-6 mt-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3 flex items-center'>
                <Calendar className='h-5 w-5 mr-2' /> Availability Overview
                </h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='bg-green-50 p-4 rounded-lg'>
                    <h4 className='font-medium text-green-800 mb-1'>
                    Available Slots
                    </h4>
                    <p className='text-2xl font-bold text-green-600'>
                    {availableSlots.length}
                    </p>
                </div>
                <div className='bg-blue-50 p-4 rounded-lg'>
                    <h4 className='font-medium text-blue-800 mb-1'>
                    Next Available
                    </h4>
                    <p className='text-sm text-blue-600'>
                    {availableSlots.length > 0
                        ? `${availableSlots[0].date} at ${availableSlots[0].time}`
                        : 'No slots available'}
                    </p>
                </div>
                </div>
            </div>
            </div>
            <div className='lg:col-span-1'>
            {doctor.isAvailable ? (
                <BookingForm doctor={doctor} />
            ) : (
                <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                <div className='h-12 w-12 text-gray-400 mx-auto mb-4'>
                    <User className='h-12 w-12' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    Currently Unavailable
                </h3>
                <p className='text-gray-600 mb-4'>
                    This doctor is not accepting new appointments at the moment.
                </p>
                <button
                    type='button'
                    onClick={() => navigate('/')}
                    className='bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
                >
                    Find Other Doctors
                </button>
                </div>
            )}
            </div>
        </div>
        </div>
    )
}

export default DoctorProfile
