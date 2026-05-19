import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/features/cart/CartContext";
import Text from "@/components/shared/Text";
import Heading from "@/components/shared/Heading";
import { Price } from "@/utils/Price";
export default function CarrinhoCard({ item }) {
  const { removeCart, increment, decrement } = useCart();
  const valProd = (item.price * item.quantity).toFixed(2);
  return (
    <div>
      <Card className="w-full">
        <div className="flex flex-row justify-around items-center p-3">
          <img
            src={item.images?.[0]}
            alt="imagem aleatoria"
            className="w-24 h-24 border border-gray-300 rounded-md"
          />
          <div className="flex flex-col gap-3">
            <Heading level="h3">{item.name}</Heading>
            <Text>{item.category}</Text>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Button onClick={() => decrement(item.id)}>-</Button>
            <p>{item.quantity}</p>
            <Button onClick={() => increment(item.id)}>+</Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">remover</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <Text variant="bold">
                    {" "}
                    Tem certeza que deseja remover este produto?
                  </Text>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>

                  <AlertDialogAction onClick={() => removeCart(item.id)}>
                    Remover
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="py-3">
            <Price preco={item.price}></Price>
            <Price preco={valProd}></Price>
          </div>
        </div>
      </Card>
    </div>
  );
}
