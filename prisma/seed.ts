import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedStocks() {
  const stocks = [
    { symbol: "AAPL", companyName: "Apple Inc.", price: 150.25, volume: 100000 },
    { symbol: "GOOGL", companyName: "Alphabet Inc.", price: 2800.75, volume: 50000 },
    { symbol: "TSLA", companyName: "Tesla Inc.", price: 700.5, volume: 80000 },
    { symbol: "MSFT", companyName: "Microsoft Corp.", price: 300.3, volume: 120000 },
  ];

  for (const stock of stocks) {
    await prisma.stock.upsert({
      where: { symbol: stock.symbol },
      update: {},
      create: {
        symbol: stock.symbol,
        companyName: stock.companyName,
        price: stock.price,
        volume: stock.volume,
        change: 0,
        changePercent: 0,
      },
    });
  }

  console.log("✅ Fake stock market data seeded.");
}

async function seedTransactions() {
  const sampleTransactions = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 150.25,
      quantity: 10,
      type: "buy",
    },
    {
      symbol: "GOOGL", 
      name: "Alphabet Inc.",
      price: 2800.75,
      quantity: 2,
      type: "buy",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.", 
      price: 700.5,
      quantity: 5,
      type: "sell",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 300.3,
      quantity: 15,
      type: "buy",
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 148.75,
      quantity: 5,
      type: "sell",
    },
  ];

  for (const transaction of sampleTransactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }

  console.log("✅ Sample transaction data seeded.");
}

async function main() {
  await seedStocks();
  await seedTransactions();
}

main()
  .catch((error) => console.error(error))
  .finally(async () => await prisma.$disconnect());
