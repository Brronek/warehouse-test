class WarehouseCsvParser {

    constructor(csv){
        this.csv = csv;
    }
    
    processCsv = () => {

        // split lines
        const lines = this.splitLines(this.csv);
        const processed = [];
        lines.forEach(line => {
            // ignore lines starting with #
            if (!line.startsWith('#')) {
                processed.push(this.processLine(line));
            }
        });

        return processed;
    };

    splitLines = str => {
        return str.split('\n');
    };

    processLine = line => {

        const fields = this.splitLine(line);

        // Nazwa materiału;ID Materiału;Magazyn,Ilość|Magazyn,Ilość|Magazyn,Ilość

        const warehousesValues = this.processItemInWarehouses(fields[2])

        const warehouseItem = {
            name: fields[0],
            id: fields[1],
            warehousesValues: warehousesValues
        };

        return warehouseItem;
    };

    splitLine = line => {
        return line.split(';');
    }


    processItemInWarehouses = warehousesAndValues => {

        const warehousesWithItem = [];

        // split by '|' to get values by warehouse
        const byWarehouses = warehousesAndValues.split('|');

        byWarehouses.forEach(byWarehouse => {
            // now split by ',' to get warehouse and total
            const warehouseAndTotal = byWarehouse.split(',');

            // add to the result
            warehousesWithItem.push({ warehouse: warehouseAndTotal[0], total: Number(warehouseAndTotal[1]) });
        });

        return warehousesWithItem;
    };

    
}

export default WarehouseCsvParser;