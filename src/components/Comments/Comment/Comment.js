import React from 'react';
import "./Comment.scss";
import Delete from "../../../assets/images/close.svg";
import {deleteComment} from "../../../utils/api";

function Comment({props,recordId}) {

    function handleClickDelete (id){
        deleteComment(recordId,id);

    }

    return (
        <div className="comment">
            <img className="comment__avatar" src={props.avatar.path} alt="avatar"/>
            <div className="comment__text">
                <div className="comment__user-name">{props.fullName}</div>
                <div className="comment__user-role">{props.role}</div>
                <div className="comment__body">{props.text}
                </div>
            </div>
            <img className="comment__delete" src={Delete} alt="delete" onClick={()=>handleClickDelete(props.id)}/>
        </div>
    );

}

export default Comment;