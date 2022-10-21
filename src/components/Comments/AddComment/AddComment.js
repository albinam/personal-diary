import React from 'react';
import "./AddComment.scss";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {postComment} from "../../../utils/api";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";

function AddComment({props}) {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);

    const formik = useFormik({
        initialValues: {
            text: ''
        },
        validationSchema: Yup.object({
            text: Yup.string()
                .required("Обязательное поле"),
        }),
        onSubmit: async function (values, actions) {
            actions.resetForm({
                values: {
                    text: ''
                }
            });
            let comment = {
                fullName: user.fullName,
                text: values.text,
                role: user.role,
                recordId: props.id,
                date: moment(),
                avatar: user.avatar,
                userId:user.id
            }
            dispatch(postComment(comment));
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className="comment-form">
            <label htmlFor="text" className="comment-form__label-text">Комментарий</label>
            <textarea
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.text}
                id="text"
                className="comment-form__text"
            />
            {formik.touched.text && formik.errors.text && (
                <div className="comment-form__error">{formik.errors.text}</div>
            )}
            <button className="comment-form__button button-main" type="submit">Добавить</button>
        </form>
    );
}

export default AddComment;