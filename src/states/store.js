import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import globalReducer  from "./slices/global";
import authReducer    from "./slices/auth"
import formReducer    from "./slices/formSlice";

import layoutUserReducer from "./slices/layoutUser"; // Import new slice
import { Api } from "./api";

const allReducers = combineReducers({
  global: globalReducer,
  auth:   authReducer,
  // form: formReducer,
  // layoutUser: layoutUserReducer, // Add reducer
  [Api.reducerPath]: Api.reducer,
});

const store = configureStore({
  reducer: allReducers,
  middleware: (getDefault) => getDefault().concat(Api.middleware),
});

setupListeners(store.dispatch);

export default store;



// import { configureStore,
//         combineReducers }   from "@reduxjs/toolkit";
// import { setupListeners }   from "@reduxjs/toolkit/query";
// import globalReducer        from  "./slices/global"
// import formReducer          from './slices/formSlice';
// import { Api }              from "./api";

// const allReducers = combineReducers({
//     global: globalReducer,
//     form: formReducer,
//     [Api.reducerPath]: Api.reducer,
// })


// const store = configureStore({
//     reducer: allReducers,
//     middleware: (getDefault) => getDefault().concat(Api.middleware),
//   });
//   setupListeners(store.dispatch);

// export default store;

