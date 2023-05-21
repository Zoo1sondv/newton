import NotFound from '@/screens/NotFound';
import Layout from '@/screens';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsPage from '@/screens/NewsPage';
import SchedulePage from '@/screens/SchedulePage';
import ProfilePage from '@/screens/ProfilePage';
import AccountPage from '@/screens/AccountPage';

function SwitchScreen() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="news" element={<NewsPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default SwitchScreen;
