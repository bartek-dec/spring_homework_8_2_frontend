import React from 'react';

const SingleNote = ({title, content, handleRemove, handleUpdate}) => {

    return (
        <article className='note'>
            <div>
                <h3 className='title'>{title}</h3>
                <p className='content'>{content.length > 100 ? `${content.substring(0, 97)}...` : content}</p>
            </div>
            <div className='action-container'>
                <button type='button' className='btn remove' onClick={handleRemove}>Remove</button>
                <button type='button' className='btn update' onClick={handleUpdate}>Read more / Update</button>
            </div>
        </article>
    )
        ;
};

export default SingleNote;