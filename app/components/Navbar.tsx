import { Link } from "react-router"
import { CircleUserRound } from 'lucide-react';
const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">Rizzumé</p>
            </Link>
            <div className="flex gap-4">
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
                <Link to="/user" className=" w-8 h-8">
                    <CircleUserRound className="w-full h-full" />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar