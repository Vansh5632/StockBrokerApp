-- CreateTable
CREATE TABLE "PortfolioSummary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stocks" JSONB NOT NULL,

    CONSTRAINT "PortfolioSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stocks" JSONB NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioSummary_userId_key" ON "PortfolioSummary"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_key" ON "Watchlist"("userId");

-- AddForeignKey
ALTER TABLE "PortfolioSummary" ADD CONSTRAINT "PortfolioSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
