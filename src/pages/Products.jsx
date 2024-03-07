import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdThunk, getItemThunk, setPortionPages } from '../redux/slices/productAPI';
import Product from './Product';
import css from './Products.module.css';
import Paginator from '../components/paginator/Paginator';
import FilterForm from '../components/filter/FilterForm';
import { getAllIdThunk } from '../redux/slices/productAPI';

const Products = () => {

    const dispatch = useDispatch();

    const limitId = useSelector((state) => state.productReducer.limitId);
    const productsId = useSelector((state) => state.productReducer.productsId);
    const products = useSelector((state) => state.productReducer.products);
    const currentPage = useSelector((state) => state.productReducer.paginator.currentPage);
    const portionPages = useSelector((state) => state.productReducer.paginator.portionPages);

    useEffect(() => {
        const portion = currentPage * limitId;
        dispatch(setPortionPages(portion));
        dispatch(getIdThunk({ offsetId: portionPages, limitId }));
    }, [currentPage]);

    useEffect(() => {
        dispatch(getAllIdThunk());
    }, []);

    useEffect(() => {
        if (productsId.status === 'loaded') {
            dispatch(getItemThunk(productsId.id));
        }
    }, [productsId]);

    return (
        <React.Fragment>
            {products.status === 'loaded'
                ?
                <div>
                    <Paginator />
                    <FilterForm />
                    {products.items.length === 0
                        ? <div>По вашему запросу ничего не найдено</div>
                        : <ul className={css.product_list} >
                            {products.items.map((item, index) => <Product key={index} item={item} />)}
                        </ul>
                    }
                </div>
                :
                <div>Loading...</div>
            }

        </React.Fragment>
    )
}

export default Products;