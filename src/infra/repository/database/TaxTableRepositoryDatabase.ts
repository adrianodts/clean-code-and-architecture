import TaxTable from "../../../domain/entity/TaxTable";
import TaxTableRepository from "../../../domain/repository/TaxTableRepository";
import Database from "../../database/Database";

export default class TaxTableRepositoryDatabase implements TaxTableRepository {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async getByIdItem(idItem: string): Promise<TaxTable[] | undefined> {
        const taxTableData = await this.database.many("select * from ccca.tax_table where id_item = $1", idItem);
        let taxTables = [];
        for (const taxTable of taxTableData) {
            taxTables.push(new TaxTable(taxTable.id_item, taxTable.type, Number.parseFloat(taxTable.value)));
        }
        return taxTables;
    }

}