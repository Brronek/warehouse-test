class WarehouseModelBuilder {

    constructor(warehouseItems){
        this.warehouseItems = warehouseItems;
    }
    
    buildModel = () => {
        const warehouses = [];
    
        // go through items
        this.warehouseItems.forEach(warehouseItem => {
    
            warehouseItem.warehousesValues.forEach(warehousesValue => {
                // is there already warehouse in the array?
                let warehouse = warehouses.find(w => w.name === warehousesValue.warehouse);
    
                if (!warehouse) {
                    // warehouse is not on the list. add it
                    warehouse = {
                        name: warehousesValue.warehouse,
                        total: 0,
                        items: []
                    };
    
                    warehouses.push(warehouse);
    
                }
    
                // is there an item already in warehouse?
                let item = warehouse.items.find(i => i.name === warehouseItem.name);
    
                if (!item) {
                    item = {
                        id: warehouseItem.id,
                        name: warehouseItem.name,
                        total: 0
                    };
                    warehouse.items.push(item);
                }
    
                // update totals
                item.total += warehousesValue.total;
                warehouse.total += item.total;
    
            });
    
        });
    
        // apply soring
        this.sort(warehouses);

        return warehouses;
    }
    
    sort = (warehouses) => {
    
        // sort warehouses by total and then by name
        warehouses.sort((w1, w2) => {
            if(w1.total !== w2.total){
                // totals are different. use total to sort
                return this.compareDsc(w1.total, w2.total);
            }
    
            // totals are the same, use name to sort
            return this.compareDsc(w1.name, w2.name);
        });
    
        // now sort items
        warehouses.forEach(warehouse => warehouse.items.sort((i1, i2) => this.compare(i1.id, i2.id)));
    
    
    };
    
    compare = (a, b) => (a > b ? 1 : -1);
    compareDsc = (a, b) => (a > b ? -1 : 1);

    
}

export default WarehouseModelBuilder;