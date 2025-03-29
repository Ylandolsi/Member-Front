import './CreatePost.scss';
import { APIURL } from '../../../api.tsx';
import { useAuth } from '../../Contexts/AuthContext';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import useFormWithZod from '../../CustomHooks/useFormWithzod';
import { useEffect } from 'react';

const PostSchema = z.object({
  Content: z.string().min(10, 'Content must be at least 10 characters'),
  Title: z.string().min(3, 'Title must be at least 3 characters'),
  Username: z.string().nonempty(),
});
type PostType = z.infer<typeof PostSchema>;

export function CreatePost() {
  const { user } = useAuth();
  const { register, handleSubmit, errors } = useFormWithZod(PostSchema);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || user === null) {
      console.log('user is undefined');
      console.log('please login to create a post');
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = (data: PostType) => {
    const postData: PostType = {
      ...data,
      Username: user,
    };

    fetch(`${APIURL}/Post/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid credentials');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Create post successful:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Create post failed:', error);
        throw error;
      });
  };

  return (
    <form className="formpost" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="att">Title : </label>
        <input type="text" {...register('Title')} />
        {errors.Title && <p>{errors.Title.message}</p>}
      </div>
      <div>
        <label className="att">Content : </label>
        <input {...register('Content')} />
        {errors.Content && <p>{errors.Content.message}</p>}
      </div>
      <input type="hidden" {...register('Username')} defaultValue={user} />
      <button type="submit">Create Post</button>
    </form>
  );
}
