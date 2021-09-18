import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";

test('Should get exist item by id in memory database', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const item = await itemRepository.getById('1');
    expect(item?.price).toBeGreaterThan(0);
});


test('Should get exist item by id in postgres database', async () => {
    const itemRepository = new ItemRepositoryDatabase(new PgPromiseDatabase());
    const item = await itemRepository.getById('1');
    expect(item?.price).toBeGreaterThan(0);
});