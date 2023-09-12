const Product = require("./models/Product");
const fs = require("fs");

const action = process.argv[2];

const bootstrap = async () => {
  if (action === "buy") {
    const name = process.argv[3];
    const count = process.argv[4];

    const products = JSON.parse(
      await fs.promises.readFile("./database/products.json")
    );

    const stories = JSON.parse(
      await fs.promises.readFile("./database/stories.json")
    );

    const findProduct = products.find((product) => product.name === name);

    if (!findProduct) {
      const id = products.length + 1;

      const newProduct = new Product(id, name, +count);

      const data = products.length ? [...products, newProduct] : [newProduct];

      await fs.promises.writeFile(
        "./database/products.json",
        JSON.stringify(data, null, 2)
      );
    } else {
      findProduct.count += +count;
      await fs.promises.writeFile(
        "./database/products.json",
        JSON.stringify(products, null, 2)
      );
    }

    const newHistory = `Vaqt: ${new Date()} Sotib olindi. Meva: ${name}; Soni: ${count}`;

    const history = stories.length ? [...stories, newHistory] : [newHistory];

    await fs.promises.writeFile(
      "./database/stories.json",
      JSON.stringify(history, null, 2)
    );
  } else if (action === "sell") {
    const name = process.argv[3];
    const count = process.argv[4];

    const products = JSON.parse(
      await fs.promises.readFile("./database/products.json")
    );

    const findProduct = products.find((product) => product.name === name);
    if (!findProduct || findProduct.count < count) {
      console.log("Bunday mahsulot mavjud emas");
      return;
    }

    findProduct.count -= count;

    await fs.promises.writeFile(
      "./database/products.json",
      JSON.stringify(products, null, 2)
    );

    const stories = JSON.parse(
      await fs.promises.readFile("./database/stories.json")
    );

    const newHistory = `Vaqt: ${new Date()} Sotildi. Meva: ${name}; Soni: ${count}`;

    const history = stories.length ? [...stories, newHistory] : [newHistory];

    await fs.promises.writeFile(
      "./database/stories.json",
      JSON.stringify(history, null, 2)
    );
  } else if (action === "shows") {
    const products = JSON.parse(
      await fs.promises.readFile("./database/products.json")
    );

    console.table(products);
  } else if (action === "search") {
    const products = JSON.parse(
      await fs.promises.readFile("./database/products.json")
    );

    const search = process.argv[3];

    const filtered = products.filter((product) => {
      const name = product.name.toLowerCase();
      return name.includes(search.toLowerCase());
    });

    console.table(filtered);
  }
};

bootstrap();
