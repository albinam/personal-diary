import React from 'react';
import "./Header.scss";
import moment from "moment";
import Alert from "../Alert/Alert";
import {useSelector} from "react-redux";

function Header() {
    const user = useSelector(state => state.user);

    return (
        <header className="header">
            <a className="header__link" href="/">
                <div className="header__text">
                    <p className="header__title">Личный дневник</p>
                    <p className="header__date">{moment().format("DD/MM/YYYY")}</p>
                </div>
            </a>
            <div className="header__user">
                <a href="/add-record">
                    <button className="button-main">Создать запись</button>
                </a>
                <div className="header__user__info">
                    <img className="header__user__info__photo" src={user.avatar} alt="user avatar"/>
                    <div className="header__user__info__name">{user.fullName}</div>
                </div>
            </div>
            <Alert/>
        </header>
    );

}

export default Header;