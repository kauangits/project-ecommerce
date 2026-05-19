import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldGroup } from "@/components/ui/field";
import { useQueryParams } from "@/pages/UseQueryparams";
import Text from "@/components/shared/Text";
export default function PriceFilter() {
  const { getParam, setParams } = useQueryParams();
  const priceRange = getParam("price") || "";

  function handleChange(value) {
    if (!value) {
      // remove o filtro
      setParams({
        price: "",
        page: 1,
      });
      return;
    }

    setParams({
      price: value,
      page: 1,
    });
  }

  return (
    <div>
      <Accordion type="multiple" collapsible>
        <AccordionItem value="price">
          <AccordionTrigger className="hover:no-underline">
            <Text>Faixa de preço</Text>
          </AccordionTrigger>

          <AccordionContent>
            <RadioGroup value={priceRange} onValueChange={handleChange}>
              <FieldGroup className="flex flex-col gap-3">
                <Field orientation="horizontal">
                  <RadioGroupItem value="" id="all" />
                  <label htmlFor="all">Todos</label>
                </Field>

                <Field orientation="horizontal">
                  <RadioGroupItem value="0-20" id="p1" />
                  <label htmlFor="p1">Até R$ 20</label>
                </Field>

                <Field orientation="horizontal">
                  <RadioGroupItem value="20-50" id="p2" />
                  <label htmlFor="p2">R$ 20 - R$ 50</label>
                </Field>

                <Field orientation="horizontal">
                  <RadioGroupItem value="50+" id="p3" />
                  <label htmlFor="p3">Acima de R$ 50</label>
                </Field>
              </FieldGroup>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
