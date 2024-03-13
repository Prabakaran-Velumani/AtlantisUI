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
// import ScreenPreview from 'views/admin/superadmin/game/components/ScreenPreview';
import ScreenPreview from 'views/admin/superadmin/game/components/ScreenPreview';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import OrientationLock from 'views/admin/superadmin/game/components/onimage/LockOrientationComp';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
//   const previewData = useSelector((state : RootState) => state.preview); // Assuming 'preview' is the key for your slice in the store
//   const userData = useSelector((state : RootState) => state.user); 

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        {/* <Route path={'game/glbpractise'} element={<GlbPractise />} /> */}
        <Route path="game/demoplay/:uuid" element={<GamePreview />} />
        <Route path="game/creator/demoplay/:id" element={<GamePreview />} />
        <Route path="/screen/preview/:id" element={<ScreenPreview />} />
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
          <Route path="/screen/preview/" element={<OrientationLock />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
