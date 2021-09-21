import axios from "axios";

test.skip("Should invoke an API on route /orders/${code}", async () => {

    const response = await axios({
        url: "http://localhost:3000/orders/202100000001",
        method: "get"
    })
    const order = response.data;
    console.log(order);
    expect(order.code).toBe("202100000001");
})