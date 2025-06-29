import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/img/logo-compact.png";
import prefil from "../../assets/img/prefil.png";

export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="navbar">
            <img src={logo} alt="logo" />
            <div className="text-wrapper">LandMark</div>
            <button className="close" onClick={logout} title="Log off">
                <img src={prefil} alt="Voltar para Login" />
            </button>
        </header>
    );
}