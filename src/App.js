import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { Landing, Error, Register, ProtectedRoute, AllData } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Profile,
  Stats,
  SharedLayout,
  Category,
  Embedded,
  Admin,
  Trigger,
} from './pages/dashboard';
import { Suspense } from 'react';
function App() {
  return (
    <Suspense fallback={<Trigger />}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Trigger />} />
            <Route path='stats' element={<Stats />} />
            <Route path='profile' element={<Profile />} />
            <Route path='alldata' element={<AllData />} />
            <Route path='departement' element={<Category />} />
            <Route path='departement/:slug/:viewType' element={<Embedded />} />
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route path='landing' element={<Landing />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <ToastContainer position='top-center' />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
