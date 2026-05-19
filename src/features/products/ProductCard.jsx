import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Learning from "../../../public/Learning.svg";
import { useCart } from "@/features/cart/CartContext";
import { Link } from "react-router-dom";
import Heading from "@/components/shared/Heading";
import Text from "@/components/shared/Text";
import { Price } from "@/utils/Price";
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
          <Heading level="h3" className="line-clamp-1">
            {product.name}
          </Heading>
          <Text className="line-clamp-2"> {product.description}</Text>

          <div className="mt-3 flex items-center justify-between">
            <Price preco={product.price}></Price>
            <Button
              variant="outline"
              onClick={() => {
                console.log(product);
                addCart(product);
              }}
            >
              <Text variant="small">comprar</Text>
            </Button>
            <Link to={`/products/${product.id}`}>
              <Button variant="outline">
                <Text variant="small">detalhes</Text>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
