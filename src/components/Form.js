import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {handleNoteChange, closeModal, updateNote, createNote} from "../features/note/noteSlice";
import {TextInput, TextArea} from './index';
import {IoMdClose} from 'react-icons/io';

const Form = () => {
    const [isError, setIsError] = useState(false);
    const {isFormVisible, isEdited, id, title, content} = useSelector((state) => state.note);
    const dispatch = useDispatch();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeModal());
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleNoteChange({name, value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.length < 1 || content.length < 1) {
            setIsError(true);
            return;
        }

        if (isEdited) {
            setIsError(false);
            dispatch(updateNote({id, title, content}));
            return;
        }

        setIsError(false);
        dispatch(createNote({title, content}));
    }

    return (
        <div className={isFormVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='form'>
                <h2>{isEdited ? 'Edit Note' : 'Create Note'}</h2>
                {isError && <h3 className='error'>Please fill in all fields</h3>}

                <TextInput name='title' value={title} handleChange={handleChange}/>
                <TextArea name='content' value={content} handleChange={handleChange}/>

                <button type='submit' className='btn-submit' onClick={handleSubmit}>Submit</button>
                <button type='button' className='btn-close' onClick={() => dispatch(closeModal())}>
                    <IoMdClose className='icon'/>
                </button>
            </form>
        </div>
    );
};

export default Form;