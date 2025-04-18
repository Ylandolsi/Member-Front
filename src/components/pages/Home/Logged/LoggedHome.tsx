import { useState, useEffect } from 'react';
import { APIURL } from '../../../../api';
import { useAuth } from '../../../Contexts/AuthContext';
import './LoggedHome.scss';
import { Post } from '../../../Post/Post.tsx';
import { SecondVerif } from './Verif/SecondVerif.tsx';

type PostType = {
  Id: number;
  Title: string;
  Content: string;
  Username: string;
};

export function LoggedHome() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const localSecondVerif = localStorage.getItem('secondVerify');
  const [secondVerify, setSecondVerify] = useState(false);

  useEffect(() => {
    if (localSecondVerif === 'true') {
      setSecondVerify(true);
    }
  }, [localSecondVerif]);

  console.log(
    'Second verification status from localStorage:',
    localSecondVerif
  );

  const fetchAllPosts = async () => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`${APIURL}/Post/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await res.json();
      const mappedPosts: PostType[] = data.map((datapost: any) => ({
        Id: datapost.id,
        Title: datapost.title,
        Content: datapost.content,
        Username: datapost.username,
      }));

      setPosts(mappedPosts);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="logged-home">
      <SecondVerif
        apiUrl={APIURL}
        secondVerify={secondVerify}
        setSecondVerify={setSecondVerify}
      />
      <h1>Welcome, {user || 'Member'}!</h1>
      <p>You are now logged into the private application</p>

      {loading && <p>Loading posts...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className="posts-container">
        {posts.length > 0
          ? posts.map((post) => (
              <Post
                key={post.Id}
                post={
                  secondVerify
                    ? post
                    : ({
                        Id: post.Id,
                        Title: '******',
                        Content: '**************',
                        Username: '********',
                      } as PostType)
                }
                user={user}
                you={secondVerify && post.Username === user ? '(You)' : ''}
              />
            ))
          : !loading && <p>No posts available.</p>}
      </div>
    </div>
  );
}
