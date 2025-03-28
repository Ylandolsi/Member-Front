import { useState, useEffect } from 'react';
import { APIURL } from '../../../api.tsx';
import { Post } from '../../Post/Post.tsx';
import './PostUser.scss';
import { useAuth } from '../../Contexts/AuthContext.tsx';
type PostType = {
  Id: number;
  Title: string;
  Content: string;
  Username: string;
};

export function PostUser() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`${APIURL}/Post/myPosts`, {
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
      console.log(data);
      console.log(mappedPosts);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="post-user">
        {posts.map((post) => (
          <Post key={post.Id} post={post} user={user} />
        ))}
      </div>
    </>
  );
}
