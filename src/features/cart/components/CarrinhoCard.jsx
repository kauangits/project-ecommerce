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
export default function CarrinhoCard({ item }) {
  const { removeCart, increment, decrement } = useCart();

  return (
    <div>
      <Card className="w-full">
        <div className="flex flex-row justify-between items-center p-3">
          <img src={item.image} alt="imagem aleatoria" className="w-24 h-24" />
          <div className="flex flex-col gap-3">
            <p>{item.name}</p>
            <p>{item.category}</p>
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
                  Tem certeza que deseja remover este produto?
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
          <div>
            <p>{item.price}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
