import React, {useState} from 'react';
import "./Comments.scss";
import Arrow from "../../assets/images/arrow.svg";
import Comment from "../Comments/Comment/Comment";
import AddComment from "./AddComment/AddComment";


function Comments({props}) {
    const [displayComments, setDisplayComments] = useState(false);

    return (
        <div className="record__comments">
            <div className="record__comments__title">Комментарии: {props.comments.length}</div>
            {displayComments ?
                <div className="record__comments__controls">
                    <img onClick={() => setDisplayComments(false)} className="record__comments__controls__icon-hide"
                         src={Arrow} alt="arrow"/>
                    <button onClick={() => setDisplayComments(false)}
                            className="record__comments__controls__button">Скрыть
                    </button>
                </div>
                :
                <div className="record__comments__controls">
                    <img onClick={() => setDisplayComments(true)} className="record__comments__controls__icon-reveal"
                         src={Arrow} alt="arrow"/>
                    <button onClick={() => setDisplayComments(true)}
                            className="record__comments__controls__button">Показать
                    </button>
                </div>
            }
            {displayComments ? <>
                <AddComment props={props}/>
                {props?.comments.sort((comment1, comment2) => new Date(comment1.date ).getTime()- new Date(comment2.date ).getTime()).reverse().map(comment => {
                    return (
                        <Comment props={comment} key={comment.id} recordId={props?.id}/>
                    )
                })} </> : <></>}
        </div>
    );

}

export default Comments;