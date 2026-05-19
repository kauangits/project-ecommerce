import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/features/products/ProductCard";
export default function ProductsGrid({ products, loading }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        products.map((p) => <ProductCard key={p.id} product={p}></ProductCard>)
      )}
    </div>
  );
}
