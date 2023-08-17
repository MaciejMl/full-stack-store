import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'NO. 508 BEARD & MOUSTACHE CLEANSING FOAM',
      price: 69,
      type: 'pianka',
      image: '508-pianka.png',
      description:
        'PIANKA DO CZYSZCZENIA BRODY I WĄSÓW\n\nWzbogacony olejkiem makadamia i olejkiem eterycznym z cytryny, głęboko oczyszcza, pozostawiając skórę świeżą i czystą.',
      carts: [],
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'NO. 501 NAWILŻAJĄCO OCZYSZCZAJĄCY SZAMPON DO BRODY',
      price: 84,
      type: 'szampon',
      image: 'NO.-501-szampon.png',
      description:
        'Szampon oczyszczający i nawilżający specjalnie dla brody. Zawiera delikatne surfaktanty bez SLES. Oczyszcza i nawilża zarost, jednocześnie pomagając odżywiać brodę.',
      carts: [],
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'NO. 503 WOSK DO WĄSÓW',
      price: 62,
      type: 'wosk',
      image: 'NO.-503-WOSK-DO-WASOW--DEPOT.png',
      description:
        'Wosk do wąsów. Zapewnia kontrolę pozwalającą modelować i układać wąsy. Nadaje miękkości i elastyczności wąsom, umożliwiając osobistą kreatywność.',
      carts: [],
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      name: 'NO. 505 ODŻYWCZY OLEJEK DO BRODY // MYSTERIOUS VANILLA',
      price: 82,
      type: 'olejek',
      image: 'NO.-505-OLEJEK-DO-BRODY.png',
      description:
        'Odżywczy olejek do brody. Odżywia, nadaje kontrolę nad zarostem i połysk, dodatkowo sprawiając że broda zyskuje niepowtarzalny zapach. Łatwo się wchłania, chroni integralność brody.',
      carts: [],
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      name: 'KARTACZ Z WŁOSIA DZIKA - Captain Fawcett',
      price: 85,
      type: 'kartacz',
      image: 'captain-fawcett-szczotka-do-brody-1.png',
      description:
        'Szczotka do brody Captain Fawcett, wykonana w 100% ręcznie z naturalnego włosia dzika i drewna wiśni. Dzięki nieregularnej długości włosia, szczotka idealnie nadaje się do wszystkich bród, ',
      carts: [],
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map(async (product) => {
      const createdProduct = await db.product.create({
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          type: product.type,
          image: product.image,
          description: product.description,
          carts: {
            create: product.carts.map((cart) => ({
              cart: {
                connect: { id: cart.cartId },
              },
              product: {
                connect: { id: product.id },
              },
              quantity: cart.quantity,
            })),
          },
        },
      });

      return createdProduct;
    }),
  );
}
seed();
