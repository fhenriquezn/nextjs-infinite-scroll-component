-- CreateTable
CREATE TABLE "cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subTotal" REAL NOT NULL,
    "tax" REAL NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "total" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "rating" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "discount" REAL,
    "saleEndsAt" DATETIME,
    "stock" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "cartItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "totalAmount" REAL NOT NULL,
    CONSTRAINT "cartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
