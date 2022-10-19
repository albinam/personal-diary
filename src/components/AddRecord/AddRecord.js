import React, {useState} from 'react';
import "./AddRecord.scss";
import {useFormik} from "formik";
import * as Yup from 'yup';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {postRecord} from "../../utils/api";
import Popup from "../Cropper/Popup/Popup";

function AddRecord() {
    const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [key, setKey] = useState("start");
    const [open, setOpen] = useState(false);

    function onChange(e) {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files.length !== 0) {
            const reader = new FileReader();
            reader.onload = () => {
                formik.setFieldValue("image", reader.result);
                setOpen(true);
            }
            reader.readAsDataURL(files[0]);
        }
    }

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
                    "fileFormat",
                    "Неподдерживаемый формат",
                    value => value && SUPPORTED_FORMATS.includes(value.split(';')[0].split('/')[1])
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
            let record = {
                title: values.title,
                text: values.text,
                userId: user.id,
                date: moment().toISOString(),
                image: values.image
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
                    onChange={(event) =>
                        onChange(event)
                    }
                    id="image"
                    className="add-record__form__input-image"
                    alt="image"
                    key={key}
                />
                {formik.touched.image && formik.errors.image && (
                    <div className="add-record__form__error">{formik.errors.image}</div>
                )}
                {open &&
                    (<Popup handleClose={() => setOpen(false)} image={formik.values.image}
                            getCroppedFile={(image) => {
                                formik.setFieldValue("image", image);
                                setOpen(false);
                            }}
                    />)
                }
                <button className="add-record__form__button" type="submit">Добавить</button>
            </form>
        </div>
    );

}

export default AddRecord;