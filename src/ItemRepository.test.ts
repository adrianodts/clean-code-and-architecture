import ItemRepositoryMemory from "./infraestructure-services/repository/ItemRepositoryMemory";

test('Should get exist item by id', () => {
    const itemRepository = new ItemRepositoryMemory();
    const item = itemRepository.getById('1');
    expect(item?.price).toBeGreaterThan(0);
});