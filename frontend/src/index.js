import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWevVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import BlogpostScreen from './screens/BlogpostScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import BlogpostListScreen from './screens/adminonly/BlogpostListScreen';
import BlogpostEditScreen from './screens/adminonly/BlogpostEditScreen';
import UserListScreen from './screens/adminonly/UserListScreen';
import UserEditScreen from './screens/adminonly/UserEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/blogposts/:id" element={<BlogpostScreen />} />
      <Route path="/auth/login" element={<LoginScreen />} />
      <Route path="/auth/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/auth/me" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/blogpostlist" element={<BlogpostListScreen />} />
        <Route
          path="/admin/blogposts/:blogpostId/edit"
          element={<BlogpostEditScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:userId/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWevVitals();
