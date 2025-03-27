import './Register.scss';
import { z } from 'zod';
import useFormWithZod from '../../CustomHooks/useFormWithzod';
import { Link } from 'react-router-dom';

import { APIURL } from '../../../api';
import { useEffect, useState } from 'react';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  username: z.string().min(5, 'Username is required'),
  password: z
    .string()
    .regex(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      ),
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    ),
});

type RegisterType = z.infer<typeof registerSchema>;

export function Register() {
  const { register, handleSubmit, errors, watch } =
    useFormWithZod(registerSchema);
  const [usernameStatus, setUsernameStatus] = useState<
    'checking' | 'available' | 'unavailable' | null
  >(null);
  const username = watch('username');
  const onSubmit = (data: RegisterType) => {
    console.log(data);

    const RegisterEndPoint = `${APIURL}/User/register`;
    fetch(RegisterEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log('register success');
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log('register failed');
      });
  };

  useEffect(() => {
    const checkUsername = async () => {
      if (username && username.length >= 5) {
        setUsernameStatus('checking');

        try {
          const response = await fetch(
            `${APIURL}/User/check-username?username=${username}`
          );
          const data = await response.json();

          if (response.ok) {
            setUsernameStatus(data.available ? 'available' : 'unavailable');
          } else {
            setUsernameStatus(null);
          }
        } catch (error) {
          console.error('Error checking username:', error);
          setUsernameStatus(null);
        }
      } else {
        setUsernameStatus(null);
      }
    };

    const timeoutId = setTimeout(checkUsername, 500);
    // Cleanup the timeout if the query changes before the delay completes
    return () => clearTimeout(timeoutId);
  }, [username]);
  return (
    <div className="Register">
      <div className="Welcome">Welcome to our private applciation</div>
      <form className="formRegister" onSubmit={handleSubmit(onSubmit)}>
        <div className="header">Create an account </div>
        <div>
          <label>First Name</label>
          <input type="text" {...register('firstName')} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" {...register('lastName')} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div>
          <label>Username</label>
          <input type="text" {...register('username')} />
          {errors.username && <p>{errors.username.message}</p>}
          {usernameStatus === 'checking' && (
            <p className="status">Checking availability...</p>
          )}
          {usernameStatus === 'available' && (
            <p className="status available">Username is available</p>
          )}
          {usernameStatus === 'unavailable' && (
            <p className="status unavailable">Username is already taken</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <Link to="/login">
          {' '}
          <a>Already have an account ? </a>
        </Link>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
