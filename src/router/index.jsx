import NotFound from '@/screens/NotFound';
import Layout from '@/screens';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsPage from '@/screens/NewsPage';
import CalenderPage from '@/screens/CalenderPage';
import StudentPage from '@/screens/StudentPage';
import AccountPage from '@/screens/AccountPage';
import HomePage from '@/screens/HomePage';

function SwitchScreen() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="calender" element={<CalenderPage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default SwitchScreen;
