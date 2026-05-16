import { useEffect, useState } from "react";
import { getCategories, getProducts } from "@/services/products";
import ProductsFilter from "@/features/products/ProductsFilter";
import { useQueryParams } from "./UseQueryparams";
import Text from "@/components/shared/Text";
import ProductPagination from "./ProductPagination";
import ProductsGrid from "./ProductsGrid";
import ProductToolBar from "./ProductToolBar";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const { getParam, getNumber, getArray, setParams } = useQueryParams();
  const [allcategories, setAllCategories] = useState([]);
  const search = getParam("q") || "";
  const page = getNumber("page", 1);
  const sort = getParam("sort", "price-asc") || "price-asc";
  const selectCategories = getArray("category");
  const priceRange = getParam("price") || "";
  const start = (page - 1) * 7 + 1;
  const end = start + products.length - 1;

  useEffect(() => {
    console.log(
      "parametros,",
      search,
      page,
      sort,
      selectCategories,
      priceRange,
    );
    console.log(Array.isArray(selectCategories));
    const controller = new AbortController();
    getProducts({
      page,
      sort,
      search,
      selectCategories,
      priceRange,
    })
      .then(({ data, total }) => {
        setProducts(data);
        setTotalPages(Math.ceil(total / 7));
        setTotalItems(total);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log("vasoc", error);
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [search, page, sort, selectCategories.join(","), priceRange]);

  useEffect(() => {
    getCategories().then((dados) => setAllCategories(dados));
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-2 min-h-screen py-8">
      <div className="grid grid-cols-4 gap-3">
        <ProductsFilter categories={allcategories} />

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
