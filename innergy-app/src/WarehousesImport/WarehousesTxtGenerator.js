class WarehouseTxtGenerator {

    constructor(warehouses) {
        this.warehouses = warehouses;
    }

    getTxt = () => {
        // use array.join for better performance
        const txtArr = [];

        this.warehouses.forEach(warehouse => {
            txtArr.push(warehouse.name + ' (total ' + warehouse.total + ')');

            warehouse.items.forEach(item => {
                txtArr.push(item.id + ': ' + item.total);
            });

            // empty line
            txtArr.push("");
        });

        return txtArr.join("\n");
    };


}

export default WarehouseTxtGenerator;