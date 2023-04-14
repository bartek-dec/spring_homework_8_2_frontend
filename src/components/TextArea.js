import React from 'react';

const TextArea = ({name, value, handleChange}) => {
    return (
        <div className='text-area'>
            <label htmlFor={name}>{name}</label>
            <textarea name={name} value={value} onChange={handleChange}/>
        </div>
    );
};

export default TextArea;