import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const url = 'http://localhost:8080/notes';

const initialState = {
    isLoading: false,
    isEdited: false,
    notes: [],
    msg: '',
    isFormVisible: false,
    id: '',
    title: '',
    content: '',
}

export const getNotes = createAsyncThunk('getNotes', async (_, thunkApi) => {
    try {
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue('Not found')
    }
});

export const updateNote = createAsyncThunk('updateNote', async (payload, thunkApi) => {
    try {
        const {id, title, content} = payload;
        await axios.put(`${url}/${id}`, {title, content});
        thunkApi.dispatch(getNotes());
    } catch (error) {
        return thunkApi.rejectWithValue(error.msg);
    }
});

export const deleteNote = createAsyncThunk('deleteNote', async (id, thunkApi) => {
    try {
        await axios.delete(`${url}/${id}`);
        thunkApi.dispatch(getNotes());
    } catch (error) {
        return thunkApi.rejectWithValue(error.msg);
    }
});

export const createNote = createAsyncThunk('createNote', async (payload, thunkApi) => {
    try {
        await axios.post(url, payload);
        thunkApi.dispatch(getNotes());
    } catch (error) {
        return thunkApi.rejectWithValue(error.msg);
    }
})

const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {
        handleNoteChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        editNote: (state, action) => {
            const {id, title, content} = action.payload;
            state.id = id;
            state.title = title;
            state.content = content;
            state.isEdited = true;
        },
        openModal: (state) => {
            state.isFormVisible = true;
        },
        closeModal: (state) => {
            state.id = '';
            state.title = '';
            state.content = '';
            state.isFormVisible = false;
            state.isEdited = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(getNotes.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notes = action.payload;
        }).addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload;
        }).addCase(deleteNote.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(deleteNote.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(deleteNote.rejected, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload;
        }).addCase(updateNote.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(updateNote.fulfilled, (state) => {
            state.isLoading = false;
            state.isEdited = false;
            state.id = '';
            state.title = '';
            state.content = '';
            state.isFormVisible = false;
        }).addCase(updateNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isEdited = false;
            state.id = '';
            state.title = '';
            state.content = '';
            state.isFormVisible = false;
            state.msg = action.payload;
        }).addCase(createNote.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(createNote.fulfilled, (state) => {
            state.isLoading = false;
            state.id = '';
            state.title = '';
            state.content = '';
            state.isFormVisible = false;
        }).addCase(createNote.rejected, (state, action) => {
            state.isLoading = false;
            state.id = '';
            state.title = '';
            state.content = '';
            state.isFormVisible = false;
            state.msg = action.payload;
        })
    }
});

export default noteSlice.reducer;

export const {handleNoteChange, editNote, openModal, closeModal} = noteSlice.actions;