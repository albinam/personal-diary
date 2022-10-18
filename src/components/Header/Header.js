import React from 'react';
import "./Header.scss";
import moment from "moment";
import Alert from "../Alert/Alert";

function Header() {

    return (
        <header className="header">
            <div className="header__text">
                <p className="header__title">Личный дневник</p>
                <p className="header__date">{moment().format("DD/MM/YYYY")}</p>
            </div>
            <Alert/>
        </header>
    );

}

export default Header;