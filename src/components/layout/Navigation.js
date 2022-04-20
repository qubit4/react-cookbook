import {  Link } from "react-router-dom";
import classes from "./Navigation.module.css";


const Navigation = () => {
    return (
    <nav className="navbar navbar-default navbar-fixed-top">
        <header className={classes.header}>
        <h2><Link to="/" className={classes.logo}>Stůl</Link></h2>
            <ul> 
                <li>
                    <Link to="/">Recepty</Link>
                </li>
                <li>
                    <Link to="/new-recipe">Přidat recept</Link>
                </li>
            </ul>
        </header>
    </nav>)
}

export default Navigation;