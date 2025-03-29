import { MdOutlineDelete } from 'react-icons/md';
import './Post.scss';
import { APIURL } from '../../api';

type PostType = {
  Id: number;
  Title: string;
  Content: string;
  Username: string;
};

export function Post({
  post,
  user,

  you = '',
}: {
  post: PostType;
  user: string;
  you?: string; //  optional
}) {
  const onDelete = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      console.log('Deleting post with ID:', post.Id);
      console.log('Access token:', accessToken);
      const res = await fetch(`${APIURL}/Post/${post.Id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status != 204) {
        throw new Error('Failed to delete post');
      }

      window.location.reload();
      console.log('Post deleted successfully');
    } catch (err: any) {
      console.error('Error deleting post:', err.message);
    }
  };
  return (
    <div className="post">
      <div>
        <p className="att">Title : </p>
        <h2>{post.Title}</h2>
      </div>
      <div>
        <p className="att">Content : </p>
        <div>{post.Content}</div>
      </div>
      <div>
        <p className="att">PostedBy : </p>
        <div>
          {post.Username} {you}
        </div>
      </div>
      {post.Username === user && (
        <div className="actions">
          <button className="delete-button" onClick={onDelete}>
            <span>Delete</span>
            <MdOutlineDelete />
          </button>
        </div>
      )}
    </div>
  );
}
