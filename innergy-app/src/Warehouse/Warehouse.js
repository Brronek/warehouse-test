import React from 'react';
import Item from '../Item/Item.js'

const warehouse = (props) => {
    return (
        <div className="Warehouse col-sm">
            <p>
                {props.name} ({props.total})

                {props.items.map((item) => {
                    return <Item
                        id={item.id}
                        name={item.name}
                        total={item.total}
                    />
                })}
            </p>
        </div>
    )
}


export default warehouse;