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
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserRole } from 'src/components/Context/useRoleContext';

const AddUserPage = () => {
    const { isAdmin, merchantId } = useUserRole();
    const { merchant: urlMerchantId } = useParams();
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUserRole, setIsAuthenticated, setMerchantId } = useUserRole();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validateForm = () => {
        const errors = {};

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        } else if (!/\d/.test(password)) {
            errors.password = 'Password must contain at least one digit';
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/\W/.test(password)) {
            errors.password = 'Password must contain at least one non-alphanumeric character';
        }

        // Confirm password validation
        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const AddUserHandler = async () => {
        setLoading(true);
        try {
            const errors = validateForm();
            if (Object.keys(errors).length > 0) {
                throw new Error(Object.values(errors).join('\n'));
            }
    
            const payload = {
                id: 'string',
                name: 'string',
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            };
    
            const response = await fetch(`https://localhost:7044/api/Account/register?merchant=${urlMerchantId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.title || 'Registration failed';
                throw new Error(errorMessage);
            }
    
            const data = await response.json();
            setAlertMessage(data.message); 
            setTimeout(() => {
                navigate('/merchants'); 
            }, 1500);
    
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="bg-body-tertiary d-flex align-items-center justify-content-center min-vh-100" style={{ marginTop: '-5rem' }}>
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
                                        <h1>Add User</h1>
                                        <p className="text-body-secondary">Create new user for merchant</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                Email
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </CInputGroup>
                                        {error && <p className="text-danger mt-2">{error}</p>}
                                        {alertMessage && <p className="text-success mt-2">{alertMessage}</p>}
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                Password
                                            </CInputGroupText>
                                            <CFormInput
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Password"
                                                autoComplete="new-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <CInputGroupText
                                                onClick={togglePasswordVisibility}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </CInputGroupText>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                Confirm Password
                                            </CInputGroupText>
                                            <CFormInput
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Confirm Password"
                                                autoComplete="new-password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </CInputGroup>

                                        <CButton
                                            className="px-4"
                                            style={{ backgroundColor: '#521c78', color: 'white' }}
                                            onClick={AddUserHandler}
                                            disabled={loading}
                                        >
                                            {loading ? 'Loading...' : 'Add User'}
                                        </CButton>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default AddUserPage;
