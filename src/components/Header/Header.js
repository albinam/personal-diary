import React from 'react';
import "./Header.scss";
import moment from "moment";
import Alert from "../Alert/Alert";
import {useSelector} from "react-redux";

function Header() {
    const user = useSelector(state=>state.user);

    return (
        <header className="header">
            <div className="header__text">
                <p className="header__title">Личный дневник</p>
                <p className="header__date">{moment().format("DD/MM/YYYY")}</p>
            </div>
            <div className="header__user">
                <img className="header__user__photo" src={user.avatar} alt="user avatar"/>
                <div className="header__user__name">{user.fullName}</div>
            </div>
            <Alert/>
        </header>
    );

}

export default Header;