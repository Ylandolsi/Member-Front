import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Login } from './components/pages/Login/Login.tsx';
import { Register } from './components/pages/Register/Register.tsx';
import { Home } from './components/pages/Home/Home.tsx';
import { AuthProvider } from './components/Contexts/AuthContext.tsx';
import { PostUser } from './components/pages/PostUser/PostUser.tsx';
import { CreatePost } from './components/pages/CreatePost/CreatePost.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/myposts" element={<PostUser />}></Route>
      <Route path="/create" element={<CreatePost />}></Route>
      <Route path="*" element={<div>404 Not Found</div>}></Route>
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
