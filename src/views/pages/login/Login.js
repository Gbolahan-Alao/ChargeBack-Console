import { cibAboutMe, cibEyeem, cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserRole } from 'src/components/Context/useRoleContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUserRole, setIsAuthenticated, setMerchantId } = useUserRole();

  useEffect(() => {
    // Check if authentication token exists in localStorage
    const token = localStorage.getItem('token');
    const merchantId = localStorage.getItem('merchantId');
    const roles = localStorage.getItem('roles');
    if (token && merchantId && roles) {
       // Set authentication state based on token existence
       setUserRole(JSON.parse(roles));
       setIsAuthenticated(true);
       setMerchantId(merchantId);
       // Do not navigate to another route on refresh
    }
   }, []); 

  useEffect(() => {
    // Store the current route in localStorage
    localStorage.setItem('route', location.pathname);
  }, [location.pathname]);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const loginHandler = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://localhost:7044/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }
      const data = await response.json()
      const token = data.token
      localStorage.setItem('token', token)
      
      console.log(token)
      const decodedToken = jwtDecode(token)
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      const merchantId = decodedToken.MerchantId
      console.log(decodedToken)
      console.log(merchantId)
      localStorage.setItem('merchantId', merchantId)
      localStorage.setItem('roles', JSON.stringify(userRole))
     // console.log('UserRole:', userRole, merchantId)
      setUserRole(userRole)
     setIsAuthenticated(true)
     console.log(useUserRole)
      setMerchantId(merchantId)
      navigate('/dashboard')
    } catch (error) {
      setError('Invalid email or password')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard
                className="text-white py-5"
                style={{
                  width: '44%',
                  backgroundImage: `url(${process.env.PUBLIC_URL}/polaris.jpg)`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <CCardBody className="text-center">
                  <div></div>
                </CCardBody>
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <CInputGroupText
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      >
                        <CIcon icon={showPassword ? cibAboutMe : cibEyeem} />
                      </CInputGroupText>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          className="px-4"
                          style={{ backgroundColor: '#521c78', color: 'white' }}
                          onClick={loginHandler}
                          disabled={loading}
                        >
                          {loading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                    {error && <p className="text-danger mt-2">{error}</p>}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login;
