import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/Main.page';
import ReactHookFormPage from './pages/ReactHookForm.page';
import UncontrolledComponentsPage from './pages/UncontrolledComponents.page';
import { store } from './store';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'reactHookForm',
    element: <ReactHookFormPage />,
  },
  {
    path: 'uncontrolledComponents',
    element: <UncontrolledComponentsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>
);
