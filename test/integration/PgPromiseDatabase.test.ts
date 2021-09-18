import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";

test("Should connect in database and list items", async () => {
    const pgPromiseDatabase = PgPromiseDatabase.getInstance();
    const items = await pgPromiseDatabase.many("select * from ccca.item", []);
    expect(items).toHaveLength(3);
});

test("Should connect in database and list item 1", async () => {
    const pgPromiseDatabase = PgPromiseDatabase.getInstance();
    const items = await pgPromiseDatabase.many("select * from ccca.item where id = $1", [1]);
    expect(items).toHaveLength(1);
});