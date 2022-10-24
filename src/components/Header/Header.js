import React from 'react';
import "./Header.scss";
import moment from "moment";
import Alert from "../Alert/Alert";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function Header() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    return (
        <header className="header">
            <a className="header__link" href="/">
                <div className="header__text">
                    <p className="header__title">Личный дневник</p>
                    <p className="header__date">{moment().format("DD/MM/YYYY")}</p>
                </div>
            </a>
            <div className="header__user">

                    <button onClick={()=>  {navigate("/add-record")}} className="header__user__button button-main">Создать запись</button>

                <div className="header__user__info">
                    <img className="header__user__photo" src={user.avatar} alt="user avatar"/>
                    <div className="header__user__name">{user.fullName}</div>
                </div>
            </div>
            <Alert/>
        </header>
    );

}

export default Header;