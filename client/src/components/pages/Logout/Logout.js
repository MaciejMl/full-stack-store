import { useEffect } from 'react';
import { API_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    fetch(`${API_URL}/api/auth/logout`, options).then(() => {
      dispatch(logOut());
      navigate('/');
    });
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
