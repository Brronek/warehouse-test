import React from 'react';

const item = (props) => {
    return (
        <div className="Item">
            {props.name}: {props.total}            
        </div>
    )
}


export default item;