import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/productAPI';
import css from './Paginator.module.css';
import cn from 'classnames';
import { DoubleRightOutlined, DoubleLeftOutlined, LeftOutlined, RightOutlined, SmallDashOutlined } from '@ant-design/icons';

const Paginator = () => {

    const pages = [];
    const totalCountPagesArr = [];
    const portionSize = 3;

    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.productReducer.paginator.currentPage);
    const limitProductOnPage = useSelector((state) => state.productReducer.paginator.limitProductOnPage);
    const totalCountProduct = useSelector((state) => state.productReducer.paginator.totalCountProduct);
    const totalCountPages = Math.ceil(totalCountProduct / limitProductOnPage);

    for (let i = 0; i < totalCountPages; i++) {
        totalCountPagesArr[i] = i;
    }

    const clickPrevPage = () => {
        if (currentPage === 1) return;
        dispatch(setCurrentPage(currentPage - 1));
    }
    const clickNextPage = () => {
        if (currentPage === totalCountPagesArr.length) return;
        dispatch(setCurrentPage(currentPage + 1));
    }
    const clickFirstPage = () => {
        dispatch(setCurrentPage(1));
    }
    const clickLastPage = () => {
        dispatch(setCurrentPage(totalCountPagesArr.length));
    }

    const start = Math.max(1, Math.round(currentPage - portionSize / 2));
    const end = Math.min(totalCountPages, Math.round(currentPage + portionSize / 2));


    for (let i = start; i <= end; i++) {
        pages.push(
            <div key={i} className={cn(css.pagination_item, currentPage === i && css.active)} onClick={() =>
                dispatch(setCurrentPage(i))
            }>{i}</div>
        )
    }

    return (
        <div className={css.pagination}>
            <div className={css.pagination_first} onClick={() => clickFirstPage()}><DoubleLeftOutlined /></div>
            <div className={css.pagination_prev} onClick={() => clickPrevPage()}><LeftOutlined /></div>
            {start !== 1 && <div className={css.pagination_ellipsis}><SmallDashOutlined /></div>}
            {pages}
            {end !== totalCountPagesArr.length && <div className={css.pagination_ellipsis}><SmallDashOutlined /></div>}
            <div className={css.pagination_next} onClick={() => clickNextPage()}><RightOutlined /></div>
            <div className={css.pagination_last} onClick={() => clickLastPage()}><DoubleRightOutlined /></div>
        </div>
    )
}
export default Paginator;