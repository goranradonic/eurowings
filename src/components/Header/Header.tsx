import React from "react";
import './styles.scss'
import {ReactComponent as LogoSVG} from "../../assets/svg/logo.svg";

const Header = () => {
    return (
        <header>
            <div className='header__container'>
                <LogoSVG/>
            </div>
        </header>
    )
}

export default Header;