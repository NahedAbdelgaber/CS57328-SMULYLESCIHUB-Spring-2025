import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Password from './components/reset/ResetPassword';
import Username from './components/reset/ResetUsername';
import LandingPage from './components/LandingPage';
import AuthRoute from './components/AuthRoute';
import SettingsLayout from './components/settings/SettingsLayout';
import AccountSettings from './components/settings/AccountSettings';
import AccountSecurity from './components/settings/AccountSecurity';
import ProfileSettings from './components/settings/ProfileSettings';
import Logout from './components/settings/Logout';
import DeleteAccount from './components/settings/DeleteAccount';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset/password" element={<Password />} />
      <Route path="/reset/username" element={<Username />} />

      <Route element={<AuthRoute />}>  
        <Route path="/settings" element={<SettingsLayout />}>  
          <Route index element={<ProfileSettings />} />
          <Route path="account" element={<AccountSettings />} />
          <Route path="security" element={<AccountSecurity />} />
          <Route path="logout" element={<Logout/>} />
          <Route path="delete" element={<DeleteAccount/>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
