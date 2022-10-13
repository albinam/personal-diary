import React from 'react';
import "./Header.scss";
import moment from "moment";

function Header() {

    return (
        <header className="header">
            <div className="header__text">
                <p className="header__title">Личный дневник</p>
                <p className="header__date">{moment().format("DD/MM/YYYY")}</p>
            </div>
        </header>
    );

}

export default Header;