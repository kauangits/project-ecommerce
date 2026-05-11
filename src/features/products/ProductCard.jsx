import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Learning from "../../../public/Learning.svg";
import { useCart } from "@/features/cart/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addCart } = useCart();

  return (
    <div className="p-2 w-full h-full ">
      <Card className="overflow-hidden hover:shadow-xl transition">
        <div className="h-40 aspect-square bg-white rounded-md flex items-center justify-center">
          <img
            src={product.images[0]}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <CardContent className="p-4">
          <h2 className="font-semibold text-lg line-clamp-1">{product.name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold">{product.price}</span>

            <Button
              variant="outline"
              onClick={() => {
                console.log(product);
                addCart(product);
              }}
            >
              Comprar
            </Button>
            <Link to={`/products/${product.id}`}>
              <Button variant="outline">detalhes</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
