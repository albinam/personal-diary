import React, {useState} from 'react';
import "./AddRecord.scss";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {convertBase64} from "../../utils/utils";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {postRecord} from "../../utils/api";

function AddRecord() {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg'];
    const FILE_SIZE = 70000;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [key, setKey] = useState("start");

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
            image: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Обязательное поле"),
            text: Yup.string()
                .required("Обязательное поле"),
            image: Yup.mixed()
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
                    title: '',
                    text: '',
                    image: ''
                }
            });
            console.log(values)
            setKey(new Date());
            const file = values.image;
            console.log(file)
            const base64 = await convertBase64(file);
            const path = {
                path: base64,
                size: file.size,
                originalName: file.name,
                mimetype: file.type,
            };
            let record = {
                title: values.title,
                text: values.text,
                userId: user.id,
                date: moment().toISOString(),
                image: path
            }
            dispatch(postRecord(record));
        }
    })
    return (
        <div className="add-record">
            <form onSubmit={formik.handleSubmit} className="add-record__form">

                <label htmlFor="title" className="add-record__form__label">Название</label>
                <input
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    id="title"
                    className="add-record__form__input"
                />
                {formik.touched.title && formik.errors.title && (
                    <div className="add-record__form__error">{formik.errors.title}</div>
                )}
                <label htmlFor="text" className="add-record__form__label-text">Запись</label>
                <textarea
                    rows="9"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.text}
                    id="text"
                    className="add-record__form__text"
                />
                {formik.touched.text && formik.errors.text && (
                    <div className="add-record__form__error">{formik.errors.text}</div>
                )}
                <label htmlFor="image" className="add-record__form__label">Изображение</label>
                <input
                    type="file"
                    onBlur={formik.handleBlur}
                    onChange={(event) => {
                        console.log(event.currentTarget.files[0])
                        formik.setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    id="image"
                    className="add-record__form__input-image"
                    alt="image"
                    key={key}
                />
                {formik.touched.image && formik.errors.image && (
                    <div className="add-record__form__error">{formik.errors.image}</div>
                )}
                <button className="add-record__form__button" type="submit">Добавить</button>
            </form>
        </div>
    );

}

export default AddRecord;