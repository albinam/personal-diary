import React, {useState} from 'react';
import "./Comment.scss";
import Delete from "../../../assets/images/close.svg";
import {deleteComment} from "../../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {closeAlert, setAlert} from "../../../redux/actions/actions";
import {useEffect} from "react";
import moment from "moment";

function Comment({props,recordId}) {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
    const [deletionId,setDeletionId]=useState();
    const user=useSelector(state=> state.user)

    function handleClickDelete (id){
        dispatch(setAlert({
            message: 'Удалить комментарий?',
            type: "QUESTION",
            isShown:true
        }));
        setDeletionId(id);
    }

    useEffect(() => {
        if(alert.response==="yes" && alert.type==="QUESTION") {
            dispatch(deleteComment(recordId, deletionId));
            dispatch(closeAlert());
            setDeletionId(null);
        }
    }, [deletionId,alert.response])

    return (
        <div className={user.id===props.userId?"comment__author":"comment"}>
            <img className="comment__avatar" src={props.avatar} alt="avatar"/>
            <div className="comment__text">
                <div className="comment__user-name">{props.fullName}</div>
                <div className="comment__user-role">{props.role}</div>
                <div className="comment__user-date">{moment(props.date).format("DD/MM/YYYY HH:mm")}</div>
                <div className="comment__body">{props.text}
                </div>
            </div>
            <img className="comment__delete" src={Delete} alt="delete" onClick={()=>handleClickDelete(props.id)}/>
        </div>
    );

}

export default Comment;