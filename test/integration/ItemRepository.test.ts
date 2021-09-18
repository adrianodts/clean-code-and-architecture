import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";

test('Should get exist item by id in postgres database', async () => {
    const itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
    const item = await itemRepository.getById('1');
    expect(item?.price).toBeGreaterThan(0);
});