import { CSpinner, useColorModes } from '@coreui/react';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MerchantProvider } from './components/Context/MerchantContext';
import { UploadedFilesProvider } from './components/Context/UploadedFilesContext';
import ProtectedRoute from './components/Context/protectedRoute';
import { UserRoleProvider } from './components/Context/useRoleContext';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
 const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
 const storedTheme = useSelector((state) => state.theme)

 useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
 }, []) // eslint-disable-line react-hooks/exhaustive-deps

 return (
    <UploadedFilesProvider> 
      <UserRoleProvider> 
        <MerchantProvider> {/* Wrap with MerchantProvider */}
          <HashRouter>
            <Suspense
              fallback={
                <div className="pt-3 text-center">
                  <CSpinner color="primary" variant="grow" />
                </div>
              }
            >
              <Routes>
                <Route exact path="/login" name="Login Page" element={<Login />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
                <Route exact path="/merchant" name="Register Page" element={<Register />} />
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route exact path="/" name="Home" element={<Login />} />
                <Route path="*" name="Landing" element={<ProtectedRoute><DefaultLayout/></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </HashRouter>
        </MerchantProvider>
      </UserRoleProvider>
    </UploadedFilesProvider>
 )
}

export default App;
