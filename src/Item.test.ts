import Item from "./domain/Item"

test("Should calculate volumn of one item", () => {
    const item = new Item("1", "Amplificador", 5000, 50, 50, 50, 20);
    const volume = item.getVolume();
    expect(volume).toBe(0.125)
});

test("Should calculate dentity of one item", () => {
    const item = new Item("1", "Amplificador", 5000, 50, 50, 50, 20);
    const volume = item.getDensity();
    expect(volume).toBe(160)
})