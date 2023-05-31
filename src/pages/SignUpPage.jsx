import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from '../components/common/auth.styled';
import { ACLogoIcon } from '../assets/images';
import { AuthInput } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (!userName.length || !userPassword.length || !userEmail.length) return;
    const success = await register({ userName, userEmail, userPassword });

    if (success) {
      Swal.fire({
        position: 'top',
        title: 'Successfully Registered！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      position: 'top',
      title: 'Failed to Register！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  };

  useEffect(()=> {
    if (isAuthenticated) {
      navigate('/todo');
    }
  }, [navigate, isAuthenticated]);


  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Create Your Account</h1>

      <AuthInputContainer>
        <AuthInput
          label="User Name"
          placeholder="Please enter your user name"
          value={userName}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="email"
          placeholder="Please enter your email"
          value={userEmail}
          onChange={(emailInputValue) => setUserEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="Password"
          placeholder="Please enter your password"
          value={userPassword}
          onChange={(passwordInputValue) =>
            setUserPassword(passwordInputValue)
          }
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>Register</AuthButton>
      <Link to="/login">
        <AuthLinkText>Cancel</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
