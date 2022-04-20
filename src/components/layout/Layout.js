import Navigation from "./Navigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
    return ( 
    <div>
        <div className={classes.nav}><Navigation /></div>
        <main className={classes.main}>{props.children}</main>
    </div>
    );  
}

export default Layout;
