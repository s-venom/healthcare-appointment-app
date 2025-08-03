import {useState} from 'react'
import {Calendar, Clock, User, Mail, CheckCircle} from 'lucide-react'
import {useAppointment} from '../../contexts/AppointmentContext'

function BookingForm({doctor}) {
    const {bookAppointment} = useAppointment()
    const [formData, setFormData] = useState({
        patientName: '',
        patientEmail: '',
        selectedDate: '',
        selectedTime: '',
    })
    const [errors, setErrors] = useState({})
    const [isBooked, setIsBooked] = useState(false)
    const [appointmentId, setAppointmentId] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const availableDates = [
        ...new Set(
        doctor.availableSlots
            .filter(slot => !slot.isBooked)
            .map(slot => slot.date),
        ),
    ].sort()
    const availableTimes = doctor.availableSlots
        .filter(slot => slot.date === formData.selectedDate && !slot.isBooked)
        .map(slot => slot.time)
        .sort()

    const validateForm = () => {
        const newErrors = {}
        if (!formData.patientName.trim()) newErrors.patientName = 'Name is required'
        if (!formData.patientEmail.trim())
        newErrors.patientEmail = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.patientEmail))
        newErrors.patientEmail = 'Invalid email'
        if (!formData.selectedDate) newErrors.selectedDate = 'Select a date'
        if (!formData.selectedTime) newErrors.selectedTime = 'Select a time'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!validateForm()) return
        setIsSubmitting(true)
        try {
        const id = await bookAppointment(doctor.id, formData)
        setAppointmentId(id)
        setIsBooked(true)
        } catch (error) {
        console.error('Booking failed:', error)
        } finally {
        setIsSubmitting(false)
        }
    }

    const formatDate = dateString =>
        new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        })

    if (isBooked) {
        return (
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 text-center border border-green-200'>
            <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            Appointment Confirmed!
            </h3>
            <p className='text-gray-600 mb-4'>
            Your appointment has been successfully booked.
            </p>
            <div className='bg-gray-50 p-4 rounded-lg text-left'>
            <p className='text-sm text-gray-600 mb-1'>Appointment ID:</p>
            <p className='font-mono text-sm font-semibold'>{appointmentId}</p>
            <p className='text-sm text-gray-600 mt-3 mb-1'>Details:</p>
            <p className='text-sm'>
                <strong>Doctor:</strong> {doctor.name}
                <br />
                <strong>Date:</strong> {formatDate(formData.selectedDate)}
                <br />
                <strong>Time:</strong> {formData.selectedTime}
                <br />
                <strong>Patient:</strong> {formData.patientName}
            </p>
            </div>
            <p className='text-xs text-gray-500 mt-4'>
            A confirmation email has been sent to {formData.patientEmail}
            </p>
        </div>
        )
    }

    return (
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg p-6'>
        <h2 className='flex items-center text-lg font-semibold text-gray-900 mb-4'>
            <Calendar className='h-5 w-5 mr-2 text-blue-600' /> Book Appointment
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
            <label
                htmlFor='patientName'
                className='flex items-center text-sm font-medium text-gray-700'
            >
                <User className='h-4 w-4 mr-2 text-gray-500' /> Patient Name
            </label>
            <input
                id='patientName'
                type='text'
                value={formData.patientName}
                onChange={e =>
                setFormData(prev => ({...prev, patientName: e.target.value}))
                }
                className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.patientName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter your full name'
            />
            {errors.patientName && (
                <p className='text-red-500 text-sm mt-1'>{errors.patientName}</p>
            )}
            </div>
            <div>
            <label
                htmlFor='patientEmail'
                className='flex items-center text-sm font-medium text-gray-700'
            >
                <Mail className='h-4 w-4 mr-2 text-gray-500' /> Email Address
            </label>
            <input
                id='patientEmail'
                type='email'
                value={formData.patientEmail}
                onChange={e =>
                setFormData(prev => ({...prev, patientEmail: e.target.value}))
                }
                className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.patientEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter your email'
            />
            {errors.patientEmail && (
                <p className='text-red-500 text-sm mt-1'>{errors.patientEmail}</p>
            )}
            </div>
            <div>
            <label
                htmlFor='selectedDate'
                className='flex items-center text-sm font-medium text-gray-700'
            >
                <Calendar className='h-4 w-4 mr-2 text-gray-500' /> Select Date
            </label>
            <div id='selectedDate' className='grid grid-cols-1 gap-2 mt-2'>
                {availableDates.map(date => (
                <button
                    key={date}
                    type='button'
                    onClick={() =>
                    setFormData(prev => ({
                        ...prev,
                        selectedDate: date,
                        selectedTime: '',
                    }))
                    }
                    className={`p-3 text-left border rounded-lg transition-colors ${
                    formData.selectedDate === date
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    {formatDate(date)}
                </button>
                ))}
            </div>
            {errors.selectedDate && (
                <p className='text-red-500 text-sm mt-1'>{errors.selectedDate}</p>
            )}
            </div>
            {formData.selectedDate && (
            <div>
                <label
                htmlFor='selectedTime'
                className='flex items-center text-sm font-medium text-gray-700'
                >
                <Clock className='h-4 w-4 mr-2 text-gray-500' /> Select Time
                </label>
                <div id='selectedTime' className='grid grid-cols-3 gap-2 mt-2'>
                {availableTimes.map(time => (
                    <button
                    key={time}
                    type='button'
                    onClick={() =>
                        setFormData(prev => ({...prev, selectedTime: time}))
                    }
                    className={`p-2 text-center border rounded-lg transition-colors ${
                        formData.selectedTime === time
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    >
                    {time}
                    </button>
                ))}
                </div>
                {errors.selectedTime && (
                <p className='text-red-500 text-sm mt-1'>{errors.selectedTime}</p>
                )}
            </div>
            )}
            <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all'
            >
            {isSubmitting ? (
                <span className='flex items-center justify-center'>
                <svg
                    className='animate-spin h-5 w-5 mr-2 text-white'
                    viewBox='0 0 24 24'
                >
                    <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    />
                    <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-2 2.046V17.291zm6-5.291v-6h-2v6h2z'
                    />
                </svg>
                Booking...
                </span>
            ) : (
                'Book Appointment'
            )}
            </button>
        </form>
        </div>
    )
}

export default BookingForm
