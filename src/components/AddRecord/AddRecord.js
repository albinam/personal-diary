import React, {useState} from 'react';
import "./AddComment.scss";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {convertBase64} from "../../../utils/utils";
import {putComment} from "../../../utils/api";
import moment from "moment";
import {useDispatch} from "react-redux";

function AddComment({props}) {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg'];
    const FILE_SIZE = 70000;
    const [key, setKey] = useState("start");
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            role: '',
            text: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Обязательное поле"),
            role: Yup.string()
                .required("Обязательное поле"),
            text: Yup.string()
                .required("Обязательное поле"),
            avatar: Yup.mixed()
                .required("Обязательное поле")
                .test(
                    "fileSize",
                    "Файл слишком большой",
                    value => value && value.size <= FILE_SIZE
                )
                .test(
                    "fileFormat",
                    "Неподдерживаемый формат",
                    value => value && SUPPORTED_FORMATS.includes(value.type)
                )
        }),
        onSubmit: async function (values, actions) {
            actions.resetForm({
                values: {
                    fullName: '',
                    role: '',
                    text: '',
                    avatar: ''
                }
            });
            setKey(new Date().toString());
            const file = values.avatar;
            const base64 = await convertBase64(file);
            const path = {
                path: base64,
                size: file.size,
                originalName: file.name,
                mimetype: file.type,
            };
            let comment = {
                fullName: values.fullName,
                text: values.text,
                role: values.role,
                recordId: props.id,
                date: moment().format('x'),
                avatar: path
            }
            dispatch(putComment(props.id, comment));
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className="comment-form">
            <div className="comment-form__personal-info">
                <label htmlFor="fullName" className="comment-form__label">ФИО</label>
                <div className="comment-form__personal-info__line">
                    <input
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                        id="fullName"
                        className="comment-form__personal-info__input"
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className="comment-form__error">{formik.errors.fullName}</div>
                    )}
                </div>
                <label htmlFor="role" className="comment-form__label">Роль</label>
                <div className="comment-form__personal-info__line">
                    <input
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.role}
                        id="role"
                        className="comment-form__personal-info__input"
                    />
                    {formik.touched.role && formik.errors.role && (
                        <div className="comment-form__error">{formik.errors.role}</div>
                    )}
                </div>
                <label htmlFor="avatar" className="comment-form__label">Аватар</label>
                <div className="comment-form__personal-info__line">
                    <input
                        type="file"
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                            formik.setFieldValue("avatar", event.currentTarget.files[0]);
                        }}
                        id="avatar"
                        className="comment-form__personal-info__input-file"
                        alt="avatar"
                        key={key}
                    />
                    {formik.touched.avatar && formik.errors.avatar && (
                        <div className="comment-form__error">{formik.errors.avatar}</div>
                    )}
                </div>
            </div>
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
            <button className="comment-form__button" type="submit">Добавить</button>
        </form>
    );

}

export default AddComment;