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

seedStocks()
  .catch((error) => console.error(error))
  .finally(async () => await prisma.$disconnect());
