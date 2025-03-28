import './Login.scss';
import { z } from 'zod';
import useFormWithZod from '../../CustomHooks/useFormWithzod';
import { Link, useNavigate } from 'react-router-dom';

import { APIURL } from '../../../api';
import { useAuth } from '../../Contexts/AuthContext';

const loginSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters'),
  password: z.string().nonempty('Please Enter Your Password '),
});

type LoginType = z.infer<typeof loginSchema>;

export function Login() {
  const { register, handleSubmit, errors } = useFormWithZod(loginSchema);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (data: LoginType) => {
    fetch(`${APIURL}/User/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid credentials');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Login successful:', data);
        login(data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        throw error;
      });
  };

  return (
    <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
      <div className="header">Login</div>
      <div>
        <label>Username</label>
        <input type="text" {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <Link to="/Register" className="account-link">
        Create an account?
      </Link>

      <button type="submit">Login</button>
    </form>
  );
}
