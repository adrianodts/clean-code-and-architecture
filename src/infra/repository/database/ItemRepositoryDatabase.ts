import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Database from "../../database/Database";

export default class ItemRepositoryDatabase implements ItemRepository {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async getById(id: string): Promise<Item | undefined> {
        const itemData = await this.database.one("select * from ccca.item where id = $1", id);
        return new Item(itemData.id, itemData.description, Number.parseFloat(itemData.price), itemData.height, itemData.width, itemData.length, itemData.weight);
    }

    async getAll(): Promise<Item[]> {
        const itemsData = await this.database.many("select * from ccca.item", []);
        const items: Item[] = [];
        for (const itemData of itemsData) {
            items.push(new Item(itemData.id, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight));
        }
        return items;
    }
}