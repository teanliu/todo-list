import { useAuth } from ".././contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";


const HomePage = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/todo');
    }
  }, [navigate, isAuthenticated])
};

export default HomePage;
