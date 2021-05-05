import { createServer } from "miragejs";

export default function groceryServer() {
  return createServer({
    routes() {
      this.timing = 3000;
      this.get("/api/data", () => [
        { id: 1, name: "orange", price: 28, discount: 10 },
        { id: 2, name: "Apple", price: 28, discount: 12 },
        { id: 3, name: "Mango", price: 38, discount: 13 },
        { id: 4, name: "Banana", price: 48, discount: 14 },
        { id: 5, name: "Jackfruit", price: 58, discount: 15 }
      ]);
    }
  });
}
