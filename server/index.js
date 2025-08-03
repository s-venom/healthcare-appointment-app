const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Mock doctor data
const doctors = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiologist',
        profileImage:
        'https://preview-healthcare-appointment-app-kzmq34jkitg3qxend6y7.vusercontent.net/placeholder.svg?height=200&width=200',
        isAvailable: true,
        rating: 4.8,
        experience: 12,
        location: 'New York Medical Center',
        bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and cardiac imaging.',
        availableSlots: [
        {id: '1-0900', date: '2025-08-03', time: '09:00', isBooked: false},
        {id: '1-1100', date: '2025-08-04', time: '11:00', isBooked: false},
        {id: '1-1400', date: '2025-08-05', time: '14:00', isBooked: true},
        ],
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        specialization: 'Dermatologist',
        profileImage:
        'https://preview-healthcare-appointment-app-kzmq34jkitg3qxend6y7.vusercontent.net/placeholder.svg?height=200&width=200',
        isAvailable: true,
        rating: 4.9,
        experience: 8,
        location: 'Downtown Skin Clinic',
        bio: 'Dr. Michael Chen is a renowned dermatologist specializing in cosmetic and medical dermatology. He has extensive experience in treating various skin conditions.',
        availableSlots: [
        {id: '2-1000', date: '2025-08-03', time: '10:00', isBooked: false},
        {id: '2-1500', date: '2025-08-04', time: '15:00', isBooked: false},
        ],
    },
    {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        specialization: 'Pediatrician',
        profileImage:
        'https://preview-healthcare-appointment-app-kzmq34jkitg3qxend6y7.vusercontent.net/placeholder.svg?height=200&width=200',
        isAvailable: false,
        rating: 4.7,
        experience: 15,
        location: "Children's Health Center",
        bio: 'Dr. Emily Rodriguez is a dedicated pediatrician with 15 years of experience caring for children from infancy through adolescence.',
        availableSlots: [
        {id: '3-1300', date: '2025-08-03', time: '13:00', isBooked: true},
        {id: '3-1600', date: '2025-08-04', time: '16:00', isBooked: true},
        ],
    },
    {
        id: '4',
        name: 'Dr. James Wilson',
        specialization: 'Orthopedic Surgeon',
        profileImage:
        'https://preview-healthcare-appointment-app-kzmq34jkitg3qxend6y7.vusercontent.net/placeholder.svg?height=200&width=200',
        isAvailable: true,
        rating: 4.6,
        experience: 20,
        location: 'Orthopedic Specialists',
        bio: 'Dr. James Wilson is an experienced orthopedic surgeon specializing in joint replacement and sports medicine with over 20 years of practice.',
        availableSlots: [
        {id: '4-0800', date: '2025-08-03', time: '08:00', isBooked: false},
        {id: '4-1200', date: '2025-08-05', time: '12:00', isBooked: false},
        ],
    },
    {
        id: '5',
        name: 'Dr. Lisa Thompson',
        specialization: 'Neurologist',
        profileImage:
        'https://preview-healthcare-appointment-app-kzmq34jkitg3qxend6y7.vusercontent.net/placeholder.svg?height=200&width=200',
        isAvailable: true,
        rating: 4.9,
        experience: 10,
        location: 'Neurology Associates',
        bio: 'Dr. Lisa Thompson is a board-certified neurologist with expertise in treating neurological disorders including epilepsy, migraines, and movement disorders.',
        availableSlots: [
        {id: '5-0900', date: '2025-08-04', time: '09:00', isBooked: false},
        {id: '5-1400', date: '2025-08-05', time: '14:00', isBooked: false},
        ],
    },
    {
        id: '6',
        name: 'Dr. Robert Kim',
        specialization: 'Psychiatrist',
        profileImage:
        'https://preview-healthcare-appointment-app-kzmq34jkitg3qxend6y7.vusercontent.net/placeholder.svg?height=200&width=200',
        isAvailable: true,
        rating: 4.5,
        experience: 14,
        location: 'Mental Health Center',
        bio: 'Dr. Robert Kim is a compassionate psychiatrist specializing in anxiety, depression, and mood disorders with a focus on holistic treatment approaches.',
        availableSlots: [
        {id: '6-1100', date: '2025-08-03', time: '11:00', isBooked: false},
        {id: '6-1500', date: '2025-08-04', time: '15:00', isBooked: true},
        ],
    },
]

// API Routes
app.get('/api/doctors', (req, res) => {
    res.json(doctors)
})

app.get('/api/doctors/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === req.params.id)
    if (doctor) {
        res.json(doctor)
    } else {
        res.status(404).json({message: 'Doctor not found'})
    }
})

// Serve React build for frontend routes
app.use(express.static(path.join(__dirname, '../client/build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})
app.get('/doctor/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
