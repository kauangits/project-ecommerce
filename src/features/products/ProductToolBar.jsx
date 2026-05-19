import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Text from "@/components/shared/Text";
export default function ProductToolBar({
  end,
  totalItems,
  sort,
  onSortChange,
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <Text variant="">
        Mostrando {end} de {totalItems} produtos
      </Text>
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-50 ">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent position="popper" className="">
          <SelectGroup>
            <SelectItem value="price-asc">Menor Preco</SelectItem>
            <SelectItem value="price-desc">Maior Preco</SelectItem>
            <SelectItem value="name-asc">Nome A-Z</SelectItem>
            <SelectItem value="name-desc">Nome Z-A</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
