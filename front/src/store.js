import { configureStore } from "@reduxjs/toolkit";

import { lampReducer } from "./features/lamp/lamp-slice";
import { detailsReducer } from "./features/details/details-slice";
import { searchReducer } from "./features/search/search-slice";
import { basketReducer } from "./features/basket/basket-slice";
import { emailReducer } from "./features/searchEmail/searchEmail-slice";
import { autorizationrReducer } from "./features/autorization/autorization-slice";
import { orderReducer } from "./features/getOrder/getOrder-slice";
import { statusOrderReducer } from "./features/statusOrder/statusOrder-slice";


export const store = configureStore({
    reducer: {
        lamp: lampReducer,
        details: detailsReducer,
        search: searchReducer,
        basket: basketReducer,
        email: emailReducer,
        admin: autorizationrReducer,
        order: orderReducer,
        statusOrder: statusOrderReducer,
    },
    devTools: true,
})