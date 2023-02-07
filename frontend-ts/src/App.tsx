import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/businesses" className="navbar-brand">
          <div className="business-logo" >
            <img src="/app/business-logo.png" alt="Business Logo" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/businesses"} className="nav-link">
              Businesses
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<BusinessesList />} />
          <Route path="/app/businesses" element={<BusinessesList />} />
          <Route path="/app/add" element={<AddBusiness />} />
          <Route path="/app/businesses/:id" element={<Business />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
