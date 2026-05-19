import Text from "@/components/shared/Text";

export function formatPrice(value) {
  if (typeof value !== "number" || isNaN(value)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

export function Price({ preco }) {
  return <Text>{formatPrice(preco)}</Text>;
}
