import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage'
import EquipmentPage from './pages/equipment-page'
import ExercisePage from './pages/exercise-page'
import SchedulePage from './pages/my-schedule'
import AboutPage from './pages/about-us'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function NotFound() {
  return <div className="container"><h2>404</h2><p>That page doesn’t exist.</p></div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}