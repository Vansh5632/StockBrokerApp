/*
  Warnings:

  - You are about to drop the `PortfolioSummary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PortfolioSummary" DROP CONSTRAINT "PortfolioSummary_userId_fkey";

-- DropTable
DROP TABLE "PortfolioSummary";

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "holdings" JSONB NOT NULL,
    "tradeHistory" JSONB NOT NULL,
    "funds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
