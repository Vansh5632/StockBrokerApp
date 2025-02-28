/*
  Warnings:

  - You are about to drop the column `stocks` on the `PortfolioSummary` table. All the data in the column will be lost.
  - Added the required column `funds` to the `PortfolioSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holdings` to the `PortfolioSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeHistory` to the `PortfolioSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PortfolioSummary" DROP COLUMN "stocks",
ADD COLUMN     "funds" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "holdings" JSONB NOT NULL,
ADD COLUMN     "tradeHistory" JSONB NOT NULL;
