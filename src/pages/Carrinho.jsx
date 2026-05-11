import { useCart } from "@/features/cart/CartContext";
import CarrinhoCard from "../features/cart/components/CarrinhoCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
export default function Carrinho() {
  const { cart, total, totalItems } = useCart();
  console.log("CARRINHO", cart);
  return (
    <>
      <div className="bg-[#F2F2F2] w-full p-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Cesta</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-2 min-h-screen py-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-3 col-span-2">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div className="">
                  <CarrinhoCard key={item.id} item={item}></CarrinhoCard>
                </div>
              ))
            ) : (
              <div>
                <p>sua cesta esta vazia</p>
                <p>continue comprando</p>
                <Button>continuar comprando</Button>
              </div>
            )}
          </div>
          <div className="col-span-1">
            <Card
              className={`sticky top-6 w-80 h-fit ${cart.length === 0 && "invisible"}`}
            >
              <CardHeader>
                <h2 className=" text-lg font-semibold">Resumo do pedido</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span>R$ 10,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>total de itens</span>
                  <span>{totalItems}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {(total + 10).toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4">Finalizar compra</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
