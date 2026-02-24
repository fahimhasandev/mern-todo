import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import RootLayout from './layouts/MainLayout';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';

const router = createBrowserRouter([
	{
		path: '/',
		Component: RootLayout,
		children: [
			{
				path: '/',
				Component: Dashboard,
			},
			{
				path: '/login',
				Component: LoginPage,
			},
			{
				path: '/register',
				Component: RegisterPage,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
