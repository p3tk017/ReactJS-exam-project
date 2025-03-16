import { Link } from 'react-router';

export default function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">CologneShop</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="#">Brands</Link></li>
                    <li><Link to="#">Register</Link></li>
                    <li><Link to="#">Login</Link></li>
                    <li><Link to="#">Logout</Link></li>
                    <li><Link to="#">Contact</Link></li>
                    <li><Link to="#">About</Link></li>
                    
                </ul>
            </nav>
        </header>
    )
}