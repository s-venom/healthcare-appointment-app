import {Users} from 'lucide-react'
import {Link} from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import DoctorCard from '../components/DoctorCard'
import {useAppointment} from '../contexts/AppointmentContext'

function LandingPage() {
    const {
        getFilteredDoctors,
        searchTerm,
        setSearchTerm,
        appointments,
    } = useAppointment()

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-100 to-white rounded-lg p-8 mb-8 shadow-lg text-center">
            <Users className="h-20 w-20 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900">
            Find & Book Appointments with Top Doctors
            </h1>
            <p className="text-xl text-gray-700 mt-2">
            Connect with healthcare professionals in your area. Book appointments
            online and get the care you need.
            </p>
            <div className="mt-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Stats */}
            {/*
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                <p className="text-gray-600">Qualified Doctors</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <SearchIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">15+</h3>
                <p className="text-gray-600">Specializations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-900">1000+</h3>
                <p className="text-gray-600">Happy Patients</p>
            </div>
            </div>
            */}
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {searchTerm
                ? `Search Results for "${searchTerm}"`
                : 'Available Doctors'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
            {getFilteredDoctors().length} doctor
            {getFilteredDoctors().length !== 1 ? 's' : ''} found
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getFilteredDoctors().length > 0 ? (
            getFilteredDoctors().map(doctor => (
                <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
                <DoctorCard doctor={doctor} />
                </Link>
            ))
            ) : (
            <p className="text-center text-gray-600">No doctors found.</p>
            )}
        </div>
        {appointments.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Appointments
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {appointments.map(appointment => {
                const doctor = getFilteredDoctors().find(
                    d => d.id === appointment.doctorId,
                )
                return (
                    <div
                    key={appointment.id}
                    className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg hover:bg-gray-100 transition-colors"
                    >
                    <p className="text-sm font-semibold text-gray-800">
                        ID: {appointment.id}
                    </p>
                    <p className="text-sm text-gray-700">
                        Doctor: {doctor?.name || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-700">
                        Date: {appointment.selectedDate}
                    </p>
                    <p className="text-sm text-gray-700">
                        Time: {appointment.selectedTime}
                    </p>
                    <p className="text-sm text-gray-700">
                        Patient: {appointment.patientName}
                    </p>
                    </div>
                )
                })}
            </div>
            </div>
        )}
        </div>
    )
}

export default LandingPage
