import React, {useEffect, useState} from 'react';
import "./AddRecord.scss";
import {useFormik} from "formik";
import * as Yup from 'yup';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {postRecord, putRecord} from "../../utils/api";
import Popup from "../Cropper/Popup/Popup";
import {convertBase64} from "../../utils/utils";
import {useNavigate} from 'react-router-dom';


function AddRecord() {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/svg'];
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [key, setKey] = useState("start");
    const [open, setOpen] = useState(false);
    const editMode = useSelector(state => state.editRecord);
    const navigate = useNavigate();

    async function onChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const path = {
            path: base64,
            size: file.size,
            originalName: file.name,
            mimetype: file.type,
        };
        await formik.setFieldValue("image", path);
        setOpen(true)
    }

    useEffect(() => {
        if (editMode.recordId) {
            formik.setFieldValue("image", editMode.record.image);
        }
    }, [editMode.recordId])

    let initialValues;
    if (editMode.recordId) {
        initialValues = {
            title: editMode.record.title,
            text: editMode.record.text,
            image: editMode.record.image
        };
    } else {
        initialValues = {
            title: '',
            text: '',
            image: ''
        };
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Обязательное поле"),
            text: Yup.string()
                .required("Обязательное поле"),
            image: Yup.mixed()
                .required("Обязательное поле")
                .test(
                    "fileFormat",
                    "Неподдерживаемый формат",
                    value => value && SUPPORTED_FORMATS.includes(value.mimetype)
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
            setKey(new Date());
            if (editMode.recordId) {
                let record = {
                    title: values.title,
                    text: values.text,
                    userId: editMode.record.userId,
                    date: editMode.record.date,
                    id: editMode.record.id,
                    image: values.image
                }
                dispatch(putRecord(record));
            } else {
                let record = {
                    title: values.title,
                    text: values.text,
                    userId: user.id,
                    date: moment().toISOString(),
                    image: values.image
                }
                dispatch(postRecord(record));
            }
            navigate("/");
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
                <div className="add-record__form__input-image__line">
                    <input
                        type="file"
                        onBlur={formik.handleBlur}
                        onChange={(event) =>
                            onChange(event)
                        }
                        id="image"
                        className="add-record__form__input-image"
                        alt="image"
                        key={key}
                    />
                    <label
                        htmlFor="image">{formik.values.image.originalName ? formik.values.image.originalName : "Файл не выбран"}</label>
                </div>
                {formik.touched.image && formik.errors.image && (
                    <div className="add-record__form__error">{formik.errors.image}</div>
                )}
                {open &&
                    (<Popup handleClose={() => setOpen(false)} image={formik.values.image.path}
                            getCroppedFile={(image) => {
                                const path = {
                                    path: image,
                                    size: formik.values.image.size,
                                    originalName: formik.values.image.originalName,
                                    mimetype: formik.values.image.mimetype,
                                };
                                formik.setFieldValue("image", path);
                                setOpen(false);
                            }}
                    />)
                }
                <button className="add-record__form__button" type="submit">Сохранить</button>
            </form>
        </div>
    );

}

export default AddRecord;