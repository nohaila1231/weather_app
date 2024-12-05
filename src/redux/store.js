import { configureStore } from '@reduxjs/toolkit';
import { myReducer } from './mySlice'; // Import your slice

const store = configureStore({
  reducer: {
    myData: myReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* your middlewares */),
});

export default store;