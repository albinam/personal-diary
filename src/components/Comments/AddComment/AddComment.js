import React from 'react';
import './AddComment.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { postComment } from '../../../utils/api';

function AddComment({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .required('Обязательное поле'),
    }),
    async onSubmit(values, actions) {
      actions.resetForm({
        values: {
          text: '',
        },
      });
      const comment = {
        fullName: user.fullName,
        text: values.text,
        role: user.role,
        recordId: id,
        date: moment(),
        avatar: user.avatar,
        userId: user.id,
      };
      dispatch(postComment(comment));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="comment-form">
      <div className="comment-form__label-text">Комментарий</div>
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
AddComment.propTypes = {
  id: PropTypes.number.isRequired,
};
export default AddComment;
