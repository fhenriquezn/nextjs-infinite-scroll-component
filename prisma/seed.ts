import { getProducts } from "@/actions/products";
import { calculateDiscountedPrice, getFutureDate } from "@/lib/utils";
import { SearchProductsParams } from "@/types";
import { PrismaClient, product } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const productSeeds = await getProducts({
    page: 0,
    batchSize: 200,
  } as SearchProductsParams);
  const productsConverted = productSeeds.items.map(
    (product) =>
      ({
        id: product.id,
        name: product.title,
        description: product.description,
        price: Number(calculateDiscountedPrice(product).toFixed(2)),
        originalPrice: product.price,
        rating: product.rating,
        image: product.thumbnail,
        stock: product.stock,
        discount: product.discountPercentage,
        saleEndsAt: getFutureDate(),
      } as product)
  );
  const productsCreated = await prisma.product.createMany({
    data: productsConverted,
  });
  console.log("Products seeds have been created:", productsCreated.count);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
