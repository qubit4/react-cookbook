import { Link } from "react-router-dom"
import classes from "./NotFound.module.css"

const NotFound = () => {
    return (
        <div className={classes.not_found}>
            <br />
            <h1>Stránka neexistuje</h1>
            <br />
            <Link to="/" >Zpět na Recepty</Link>
        </div>
    )
}

export default NotFound;
