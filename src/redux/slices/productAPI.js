import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filter, getId, getItems } from '../../http/axios';

export const getIdThunk = createAsyncThunk('product/getId', async ({ offsetId, limitId }) => {
    const { data } = await getId(offsetId, limitId);
    return data;
});
export const getItemThunk = createAsyncThunk('product/getItem', async (productsId) => {
    const { data } = await getItems(productsId);
    return data;
});
export const getAllIdThunk = createAsyncThunk('product/getAllId', async () => {
    const { data } = await getId();
    return data;
});
export const filterThunk = createAsyncThunk('product/filter', async ({ key, value }) => {
    const { data } = await filter(key, value);
    return data;
});


const initialState = {
    limitId: 50,
    offsetId: 1,
    productsId: {
        id: [],
        status: 'loading'
    },
    products: {
        items: [],
        status: 'loading'
    },
    paginator: {
        currentPage: 1,
        totalCountProduct: 1,
        limitProductOnPage: 50,
        portionPages: 1
    },
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLimitId: (state, action) => {
            state.limitId = action.payload;
        },
        setOffsetId: (state, action) => {
            state.offsetId = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.paginator.currentPage = action.payload;
        },
        setlimitProductOnPage: (state, action) => {
            state.paginator.limitProductOnPage = action.payload;
        },
        setPortionPages: (state, action) => {
            state.paginator.portionPages = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getIdThunk.pending, (state, action) => {
            state.productsId.id = [];
            state.productsId.status = 'loading';
        });
        builder.addCase(getIdThunk.rejected, (state, action) => {
            state.productsId.id = [];
            state.productsId.status = 'error';

        });
        builder.addCase(getIdThunk.fulfilled, (state, action) => {
            state.productsId.id = action.payload.result;
            state.productsId.status = 'loaded';
        });


        builder.addCase(getItemThunk.pending, (state, action) => {
            state.products.items = [];
            state.products.status = 'loading';
        });
        builder.addCase(getItemThunk.rejected, (state, action) => {
            state.products.items = [];
            state.products.status = 'error';
        });
        builder.addCase(getItemThunk.fulfilled, (state, action) => {
            state.products.items = action.payload.result.filter((item, index, arr) => {
                return index === arr.findIndex(obj => obj.id === item.id);
            });
            state.products.status = 'loaded';
        });
        builder.addCase(getAllIdThunk.pending, (state, action) => {
            state.paginator.totalCountPages = 1;
            state.paginator.status = 'loading';
        });
        builder.addCase(getAllIdThunk.rejected, (state, action) => {
            state.paginator.totalCountPages = 1;
            state.paginator.status = 'error';
        });
        builder.addCase(getAllIdThunk.fulfilled, (state, action) => {
            state.paginator.totalCountProduct = action.payload.result.length;
            state.paginator.status = 'loaded';
        });
        builder.addCase(filterThunk.pending, (state, action) => {
            state.productsId.id = [];
            state.productsId.status = 'loading';
        });
        builder.addCase(filterThunk.rejected, (state, action) => {
            state.productsId.id = [];
            state.productsId.status = 'error';
        });
        builder.addCase(filterThunk.fulfilled, (state, action) => {
            state.productsId.id = action.payload.result;
            state.productsId.status = 'loaded';
        });
    }
});

export const { setCurrentPage, setPortionPages } = productSlice.actions;

export const productReducer = productSlice.reducer;