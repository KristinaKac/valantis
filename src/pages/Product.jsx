import React from 'react';
import css from './Products.module.css';

const Product = ({ item }) => {

    const itemTitles = ['id', 'Название', 'Цена', 'Бренд']

    return (
        <li className={css.product_item} >
            {itemTitles.map(i => <div key={i} className={css.item_title}>{i}:</div>)}
            <div>{item.id}</div>
            <div>{item.product}</div>
            <div>{item.price}</div>
            <div>{item.brand === null ? 'Не указано' : item.brand}</div>
        </li>
    )
}

export default Product;