import Coupon from "../../src/domain/entity/Coupon"

test("Deve veririfcar se o cupom está expirado", () => {
    const coupon = new Coupon('FREE20', 20, new Date("2020-10-10"));
    expect(coupon.isExpired()).toBe(true);
})

