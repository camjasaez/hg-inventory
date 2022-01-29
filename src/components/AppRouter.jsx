import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Inventory from '../pages/Inventory';
import Jobs from '../pages/Jobs';
import Login from '../pages/Login';
import NoMatch from '../pages/NoMatch';
import PrivateRoute from './PrivateRoute';
import Perfil from '../pages/Perfil';
import Pickup from '../pages/Pickup';
import Workers from '../pages/Workers';
import Pickups from '../pages/Pickups';

export default function AppRouter(props) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/pickup"
          element={
            <PrivateRoute>
              <Pickup />
            </PrivateRoute>
          }
        />
        <Route
          path="/workers"
          element={
            <PrivateRoute>
              <Workers />
            </PrivateRoute>
          }
        />
        <Route
          path="/pickups"
          element={
            <PrivateRoute>
              <Pickups />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}
