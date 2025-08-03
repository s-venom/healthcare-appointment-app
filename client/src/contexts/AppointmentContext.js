import {createContext, useContext, useState} from 'react'

const AppointmentContext = createContext()

export function AppointmentProvider({children, doctors}) {
    const [appointments, setAppointments] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const bookAppointment = (doctorId, formData) => {
        const appointmentId = `apt-${Date.now()}`
        setAppointments(prev => [
        ...prev,
        {id: appointmentId, doctorId, ...formData, status: 'confirmed'},
        ])
        return appointmentId
    }

    const getFilteredDoctors = () =>
        doctors.filter(
        doctor =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            doctor.location.toLowerCase().includes(searchTerm.toLowerCase()),
        )

    const getDoctorById = id => doctors.find(doctor => doctor.id === id)

    const value = {
        appointments,
        searchTerm,
        setSearchTerm,
        bookAppointment,
        getFilteredDoctors,
        getDoctorById,
    }

    return (
        <AppointmentContext.Provider value={value}>
        {children}
        </AppointmentContext.Provider>
    )
}

export const useAppointment = () => useContext(AppointmentContext)
