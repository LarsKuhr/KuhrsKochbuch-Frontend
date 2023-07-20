import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="navbar">
                <Link to="/" className='title'>
                    Kuhrs Kochbuch
                </Link>
                <Link to="/" className='subLinks hide2'>
                    Home
                </Link>
                <Link to="/" className='subLinks hide'>
                    Admin
                </Link>
            </div>
        </header>
    )
}

export default Navbar