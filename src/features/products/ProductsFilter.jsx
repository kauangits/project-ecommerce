import ProductFilter from "./Productfilter";
import PriceFilter from "./PriceFilter";

export default function ProductsFilter(props) {
  return (
    <div className="flex flex-col gap-3 w-64 rounded-none">
      <h2 className="font-bold text-lg">Filtros</h2>

      <ProductFilter {...props} />
      <PriceFilter />
    </div>
  );
}
