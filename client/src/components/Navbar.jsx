import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';


const Navbar = () => {

    const { login, setLogin } = useContext(AppContext);
    const navigate = useNavigate();
    const [burger, setBurger] = useState(false);

    const logout = () => {
        setLogin(null);
        navigate('/login');
    }

    const onClick = e => {
        setBurger(state => !state);
    }

    return (
        <nav className="navbar-container">
            <h1 style={{ color: "white", paddingLeft: 20, fontSize: "2em" }}>Invoice Sender</h1>
            <div className={burger ? "hidden" : "burger-style"}>
                <MenuIcon className="burger" onClick={onClick} />
            </div>
            <div className={burger ? "close-icon" : "hidden"}>
                <CloseIcon onClick={onClick} />
            </div>
            {
                burger && <div>
                    {
                        login ?

                            <ul className="burger-menu">
                                <li>
                                    <Link to="/newinvoice">Send an invoice</Link>
                                </li>
                                <li>
                                    <Link to="/profile">My profile</Link>
                                </li>
                                <li>
                                    <Link to="/details">Account details</Link>
                                </li>
                                <li>
                                    <span style={{ cursor: "pointer" }} onClick={logout}>Log out</span>
                                </li>
                                <li>
                                    <Link to={{
                                        pathname: '/',
                                        hash: '#faq'
                                    }}>FAQ</Link>
                                </li>
                            </ul>

                            :

                            <ul className="burger-menu">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                                <li>
                                    <Link to={{
                                        pathname: '/',
                                        hash: '#faq'
                                    }}>FAQ</Link>
                                </li>
                            </ul>

                    }
                </div>
            }
            <ul className="navbar">
                {login ? (
                    <>
                        <li>
                            <Link to="/newinvoice">Send an invoice</Link>
                        </li>
                        <li>
                            <Link to="/profile">My profile</Link>
                        </li>
                        <li>
                            <Link to="/details">Account details</Link>
                        </li>
                        <li>
                            <span style={{ cursor: "pointer" }} onClick={logout}>Log out</span>
                        </li>
                        <li>
                            <Link to={{
                                pathname: '/',
                                hash: '#faq'
                            }}>FAQ</Link>
                        </li>

                    </>

                ) : (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to={{
                                pathname: '/',
                                hash: '#faq'
                            }}>FAQ</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;