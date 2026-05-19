import { useQueryParams } from "../../pages/UseQueryparams";
import { useState, useEffect } from "react";
import { getProducts } from "@/services/products";
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { getParam, getNumber, getArray, setParams } = useQueryParams();

  const search = getParam("q") || "";
  const page = getNumber("page", 1);
  const sort = getParam("sort", "price-asc");
  const selectCategories = getArray("category");
  const priceRange = getParam("price") || "";

  useEffect(() => {
    async function fetchProducts() {
      console.log("parametros,", selectCategories);
      try {
        setLoading(true);

        const { data, total } = await getProducts({
          page,
          sort,
          search,
          selectCategories,
          priceRange,
        });

        setProducts(data);
        console.log("valores retornados", data);
        setTotalItems(total);
        setTotalPages(Math.ceil(total / 7));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, sort, search, selectCategories.join(","), priceRange]);
  console.log(products);
  return {
    products,
    loading,
    setLoading,
    totalPages,
    totalItems,

    page,
    sort,
    search,
    selectCategories,
    priceRange,

    setParams,
  };
}
