import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import SignInDefault from '../src/views/auth/signIn/SignInDefault';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
import EntirePreview from 'views/admin/superadmin/game/demoplay/EntirePreview';
import GamePreview from 'views/admin/superadmin/game/demoplay/GamePreview';
import GlbPractise from 'views/admin/games/game/components/GlbPractise';
import SinglePreview from 'views/admin/superadmin/game/components/SinglePreview';

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path={'preview'} element={<SinglePreview/>}/>
        <Route path={'game/glbpractise'} element={<GlbPractise />} />
        <Route path="game/demoplay/:uuid" element={<GamePreview />} />
        <Route path="game/creator/demoplay/:id" element={<GamePreview />} />
        <Route path="auth/sign-in/default" element={<SignInDefault />} />
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
