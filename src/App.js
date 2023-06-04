import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  Create,
} from './pages/dashboard';
import { Suspense } from 'react';
import ProtectedAdmin from './pages/ProtectedAdmin';
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
            <Route path='admin' element={ 
              <ProtectedAdmin>
                 <Admin />
              </ProtectedAdmin>} 
            />
            <Route path='admin/:viewType/:id?' element={ 
              <ProtectedAdmin>
                 <Create />
              </ProtectedAdmin>} 
            />
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
