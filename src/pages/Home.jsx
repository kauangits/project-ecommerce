import ProductsFilter from "@/features/products/ProductsFilter";
import ProductPagination from "../features/products/ProductPagination";
import ProductsGrid from "../features/products/ProductsGrid";
import ProductToolBar from "../features/products/ProductToolBar";
import { useCategories } from "./UseCategories";
import { useProducts } from "../features/products/UseProducts";
export default function Home() {
  const {
    products,
    loading,
    setLoading,
    totalPages,
    totalItems,
    page,
    sort,
    setParams,
  } = useProducts();
  const { categories } = useCategories();
  const start = (page - 1) * 7 + 1;
  const end = start + products.length - 1;
  return (
    <div className="mx-auto w-full max-w-7xl px-2 min-h-screen py-8">
      <div className="grid grid-cols-4 gap-3">
        <ProductsFilter categories={categories} />

        <div className="col-span-3">
          <ProductToolBar
            end={end}
            totalItems={totalItems}
            sort={sort}
            onSortChange={(value) =>
              setParams({
                sort: value,
                page: 1,
              })
            }
          ></ProductToolBar>

          <div>
            <ProductsGrid products={products} loading={loading}></ProductsGrid>
            <ProductPagination
              page={page}
              totalPages={totalPages}
              setLoading={setLoading}
            ></ProductPagination>
          </div>
        </div>
      </div>
    </div>
  );
}
