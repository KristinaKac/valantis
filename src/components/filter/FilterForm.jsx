import React from 'react';
import css from './FilterForm.module.css';
import { Field, Form, Formik, ErrorMessage } from "formik";
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { filterThunk, getItemThunk } from '../../redux/slices/productAPI';
import { useFormik } from 'formik';

const FilterForm = () => {

    const dispatch = useDispatch();

    return (
        <Formik
            enableReinitialize
            initialValues={{ inputValue: '', selectValue: 'product' }}
            onSubmit={(values, { setSubmitting }) => {
                if (values.inputValue !== '') {
                    if(values.selectValue === 'price') {
                        values.inputValue = Number(values.inputValue);
                    }
                    dispatch(filterThunk({ key: values.selectValue, value: values.inputValue }));
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, values }) => (
                <Form className={css.form}>

                    <Field className={css.form_input} placeholder='Поиск...' name="inputValue"
                        type={values.selectValue === 'price' ? "number" : "text"} />

                    <Field className={css.form_select} as="select" name="selectValue">
                        <option value="product">Название</option>
                        <option value="price">Цена</option>
                        <option value="brand">Бренд</option>
                    </Field>

                    <button className={css.form_submit} type="submit" disabled={isSubmitting}>
                        <SearchOutlined />
                    </button>

                    <button className={css.form_reset} type="reset" disabled={isSubmitting}>
                        Сбросить
                    </button>

                </Form>
            )}
        </Formik>
    )
}

export default FilterForm;