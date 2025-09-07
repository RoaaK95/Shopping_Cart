import { type FunctionComponent } from "react";
import {Link} from 'react-router-dom';
import logo from "../../assets/logo.jpg";
import classes from "./Header.module.scss"
import { CartWidget } from '../CartWidget'
 

export const Header: FunctionComponent =() =>{
    return (
        <header>
            <div>
                <Link to="/">
                    <img src={logo} className={classes.logo} alt="Shopping cart logo" />
                </Link>
            </div>
            <div>
                <CartWidget productionCount={productsCount} />
            </div>
        </header>
    )
}