import {Star, MapPin, Clock} from 'lucide-react'
import {Link} from 'react-router-dom'

function DoctorCard({doctor}) {
    return (
        <div className='overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
        <div className='p-6'>
            <div className='flex flex-col xs:flex-row items-center xs:items-start space-y-3 xs:space-y-0 xs:space-x-4'>
            <div className='relative flex-shrink-0'>
                <img
                src={
                    doctor.profileImage || '/placeholder.svg?height=200&width=200'
                }
                alt={doctor.name}
                className='w-20 h-20 rounded-full object-cover'
                />
                <div
                className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white ${
                    doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'
                }`}
                />
            </div>
            <div className='flex-1 min-w-0 text-center xs:text-left'>
                <h3 className='text-lg font-semibold text-gray-900 truncate'>
                {doctor.name}
                </h3>
                <p className='text-sm text-blue-600 font-medium'>
                {doctor.specialization}
                </p>
                <div className='flex items-center justify-center xs:justify-start mt-2 space-x-4 text-sm text-gray-600'>
                <div className='flex items-center'>
                    <Star className='h-4 w-4 text-yellow-400 fill-current' />
                    <span className='ml-1'>{doctor.rating}</span>
                </div>
                <div className='flex items-center'>
                    <Clock className='h-4 w-4' />
                    <span className='ml-1'>{doctor.experience} years</span>
                </div>
                </div>
                <div className='flex items-center justify-center xs:justify-start mt-2 text-sm text-gray-600'>
                <MapPin className='h-4 w-4 flex-shrink-0' />
                <span className='ml-1 truncate'>{doctor.location}</span>
                </div>
                <div className='mt-3 flex justify-center xs:justify-start'>
                <div
                    className={`px-2 py-1 rounded-full text-xs ${
                    doctor.isAvailable
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                >
                    {doctor.isAvailable ? 'Available' : 'Unavailable'}
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className='px-6 py-4 bg-gray-50'>
            <Link to={`/doctor/${doctor.id}`} className='w-full block'>
            <button
                className={`w-full text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                doctor.isAvailable
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!doctor.isAvailable}
            >
                {doctor.isAvailable
                ? 'View Profile & Book'
                : 'Currently Unavailable'}
            </button>
            </Link>
        </div>
        </div>
    )
}

export default DoctorCard
