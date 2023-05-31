import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'contexts/AuthContext';

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (!userName.length || !userPassword.length) return 
    const success = await login({ userName, userPassword });
    if (success) {
      Swal.fire({
        position: 'top',
        title: 'Successfully Login！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      position: 'top',
      title: 'Failed to Login！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });

  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todo")
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Login Your Todo</h1>

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
          type="password"
          label="Password"
          placeholder="Please enter your password"
          value={userPassword}
          onChange={(passwordInputValue) =>
            setUserPassword(passwordInputValue)
          }
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>Login</AuthButton>
      <Link to="/signup">
        <AuthLinkText>Register</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
