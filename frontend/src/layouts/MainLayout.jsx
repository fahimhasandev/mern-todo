import { Outlet } from 'react-router';
import Header from '../components/Header';

function RootLayout() {
	return (
		<div className='container'>
			<Header />
			<Outlet />
			<div>Footer</div>
		</div>
	);
}

export default RootLayout;
