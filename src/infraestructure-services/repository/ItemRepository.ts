import Item from "../../domain/Item";

export default interface ItemRepository {
    
    getById(id: string) : Item | undefined;
}