// import { useState } from 'react'
import { AppContent, AppHeader, AppSidebar } from '../components/index'

const DefaultLayout = (props) => {
// const [isLoginPage, setIsLoginPage] = useState(false)
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
    
      </div>
    </div>
  )
}

export default DefaultLayout
