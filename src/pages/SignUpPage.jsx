import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkPermission, register } from 'api/auth';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!userName.length || !userPassword.length || !userEmail.length) return;
    const { success, authToken } = await register({ userName, userEmail, userPassword });

    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        position: 'top',
        title: 'Successfully Registered！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      navigate("/login");
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
    const checkTokenIsValid = async() => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        return;
      }
      const result = await checkPermission(authToken);
      
      if (result) {
        navigate('/todo');
      }
    };

    checkTokenIsValid();
  }, [navigate]);


  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

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
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
