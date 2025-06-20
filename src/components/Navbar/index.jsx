import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/img/logo-compact.png";

export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="navbar">
            <img src={logo} alt="logo" />
            <div className="text-wrapper">LandMark</div>
            <button className="close" onClick={logout}><img src="/assets/img/prefil.png" alt="Voltar para Login" /></button>
        </header>
    );
}