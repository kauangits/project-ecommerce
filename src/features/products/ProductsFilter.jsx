import ProductFilter from "./Productfilter";
import PriceFilter from "./PriceFilter";
import Heading from "@/components/shared/Heading";

export default function ProductsFilter(props) {
  return (
    <div className="flex flex-col gap-3 w-64 rounded-none">
      <Heading level="h2">Filtros</Heading>
      <ProductFilter {...props} />
      <PriceFilter />
    </div>
  );
}
