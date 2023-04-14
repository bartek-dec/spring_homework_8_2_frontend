import React from 'react';
import {HiPlus} from 'react-icons/hi';
import {openModal} from "../features/note/noteSlice";
import {useDispatch} from "react-redux";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <header>
            <h1 className='heading'>Online notebook</h1>
            <button type='button' className='btn-add' onClick={() => dispatch(openModal())}>
                <HiPlus className='icon'/> Add note
            </button>
        </header>
    );
};

export default Header;