import { Link } from 'react-router';

export default function Header({ isLogged }) {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">CologneWorld</div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/brands">Brands</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {isLogged 
                        ? ( 
                            <div id='logged'>
                                <li><Link to="/brands/create">Create Brand</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                                {isLogged.email}
                            </div>
                        )
                        : (
                            <div id='not-logged'>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </div>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}