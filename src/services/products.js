import BASE_URL from "./api";

export async function getProducts({
  page,
  sort,
  search,
  selectCategories,
  priceRange,
}) {
  console.log("penultimo", Array.isArray(selectCategories));
  const [field, order] = sort.split("-");
  // let categoriesQuery = "";
  // if (selectCategories.length > 0) {
  //   selectCategories.forEach((c) => {
  //     categoriesQuery += `category=${c}`;
  //   });
  // }
  const categoriesQuery =
    selectCategories.length > 0
      ? selectCategories.map((c) => `category=${c}`).join("&")
      : "";
  console.log("ultimo catogory", categoriesQuery);
  let priceQuery = "";

  if (priceRange === "0-20") {
    priceQuery = "price_gte=0&price_lte=20";
  } else if (priceRange === "20-50") {
    priceQuery = "price_gte=20&price_lte=50";
  } else if (priceRange === "50+") {
    priceQuery = "price_gte=50";
  }

  const query = [
    `name_like=${search}`,
    `_sort=${field}`,
    `_order=${order}`,
    `_page=${page}`,
    `_limit=7`,
    categoriesQuery,
    priceQuery,
  ].join("&");

  const res = await fetch(`${BASE_URL}/products?${query}`);

  const total = res.headers.get("X-Total-Count");
  const data = await res.json();
  console.log(data);
  return {
    data,
    total: Number(total),
  };
}

export async function getTotalProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.length;
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  const unique = [...new Set(data.map((d) => d.category))];
  return unique.sort();
}
