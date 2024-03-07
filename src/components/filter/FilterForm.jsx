import React from 'react';
import css from './FilterForm.module.css';
import { Field, Form, Formik } from "formik";
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { filterThunk, getIdThunk, getItemThunk } from '../../redux/slices/productAPI';

const FilterForm = () => {

    const dispatch = useDispatch();
    const limitId = useSelector((state) => state.productReducer.limitId);
    const productsId = useSelector((state) => state.productReducer.productsId);

    const reset = () => {
        dispatch(getIdThunk({ offsetId: 0, limitId }));

        if (productsId.status === 'loaded') {
            dispatch(getItemThunk(productsId.id));
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                inputValue: '',
                selectValue: 'product'
            }}

            onSubmit={(values, { setSubmitting }) => {
                if (values.inputValue !== '') {
                    if (values.selectValue === 'price') {
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

                    <button className={css.btn} type="submit" disabled={isSubmitting}>
                        <SearchOutlined />
                    </button>

                    <button className={css.btn} onClick={() => reset()} disabled={isSubmitting}>
                        Сбросить
                    </button>

                </Form>
            )}
        </Formik>
    )
}

export default FilterForm;