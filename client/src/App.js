import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom'
import {AppointmentProvider} from './contexts/AppointmentContext'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import DoctorProfile from './pages/DoctorProfile'

function App() {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetch('/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error))
  }, [])

  return (
    <AppointmentProvider doctors={doctors}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/doctor/:id' element={<DoctorProfile />} />
        </Switch>
      </Router>
    </AppointmentProvider>
  )
}

export default App
