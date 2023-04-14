import {configureStore} from "@reduxjs/toolkit";
import noteSlice from './features/note/noteSlice';

const store = configureStore({
    reducer: {
        note: noteSlice
    }
});

export default store;