import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";

test('Should get exist item by id in memory database', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const item = await itemRepository.getById('1');
    expect(item?.price).toBeGreaterThan(0);
});
