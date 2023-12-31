import { Route, Routes } from 'react-router-dom';

import './App.css';
import Details from './components/Details/Details';
import MainPage from './pages/main/MainPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/:id" element={<Details />} />
      </Route>
    </Routes>
  );
}
