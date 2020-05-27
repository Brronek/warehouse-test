import React from 'react';

const item = (props) => {
    return (
        <div className="Item">
            {props.id}: {props.total}            
        </div>
    )
}


export default item;