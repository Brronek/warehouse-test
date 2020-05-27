import React from 'react';
import Item from '../Item/Item.js'

const warehouse = (props) => {
    return (
        <div className="Warehouse">
            <p>
                {props.name} ({props.total})

                {props.items.map((item, index) => {
                    return <Item
                        name={item.name}
                        total={item.total}
                    />
                })}
            </p>
        </div>
    )
}


export default warehouse;