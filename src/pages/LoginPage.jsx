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
import { login } from 'api/auth';
import Swal from 'sweetalert2';
import { checkPermission } from 'api/auth';

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!userName.length || !userPassword.length) return 
    const { success, authToken } = await login({ userName, userPassword });

    if (success) {
      localStorage.setItem("authToken", authToken);
      Swal.fire({
        position: 'top',
        title: 'Successfully Login！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      navigate('/todo');
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
    const checkTokenIsValid = async () => {
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
      <h1>登入 Todo</h1>

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
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
