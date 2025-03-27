import './Login.scss';
import { z } from 'zod';
import useFormWithZod from '../../CustomHooks/useFormWithzod';
import { Link } from 'react-router-dom';

import { APIURL } from '../../../api';

const loginSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters'),
  password: z.string().nonempty('Please Enter Your Password '),
});

type LoginType = z.infer<typeof loginSchema>;

export function Login() {
  const { register, handleSubmit, errors } = useFormWithZod(loginSchema);

  const onSubmit = (data: LoginType) => {
    fetch(`${APIURL}/User/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log('login success');
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch((error) => {
        console.error('Error logging in :', error);
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
      <Link to="/Register">
        {' '}
        <a>Create an account ? </a>
      </Link>

      <button type="submit">Login</button>
    </form>
  );
}
