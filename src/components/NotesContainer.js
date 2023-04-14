import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getNotes, deleteNote, editNote, openModal} from "../features/note/noteSlice";
import {Message, SingleNote, Form} from './index';

const NotesContainer = () => {
    const {notes, msg} = useSelector((state) => state.note);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotes());
        // eslint-disable-next-line
    }, []);

    const handleRemove = (id) => {
        dispatch(deleteNote(id));
    }

    const handleUpdate = (obj) => {
        dispatch(editNote(obj));
        dispatch(openModal());
    }

    return (
        <section className='content-container'>
            <Form/>
            <div className='content'>
                {msg && <Message msg={msg}/>}

                <div className='news-container'>
                    {notes.map((item) => {
                        const {id, title, content} = item;
                        return <SingleNote key={id} title={title} content={content}
                                           handleRemove={() => handleRemove(id)}
                                           handleUpdate={() => handleUpdate({id, title, content})}/>
                    })}
                </div>
            </div>
        </section>
    );
};

export default NotesContainer;