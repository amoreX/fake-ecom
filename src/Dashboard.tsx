import Navbar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';
export default function Dashboard(){
    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}