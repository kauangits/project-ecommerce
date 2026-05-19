import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useQueryParams } from "@/pages/UseQueryparams";
import Text from "@/components/shared/Text";

export default function ProductFilter({ categories }) {
  console.log("vasco", categories);
  const { getArray, setParams } = useQueryParams();
  const selectCategories = getArray("category");
  function handleToogle(cat, checked) {
    let update;
    if (checked) {
      update = [...selectCategories, cat];
    } else {
      update = selectCategories.filter((c) => c !== cat);
    }

    setParams({
      category: update,
      page: 1,
    });
  }
  return (
    <div>
      <Accordion type="multiple" className="w-ful ">
        {/* Categoria */}
        <AccordionItem value="categoria">
          <AccordionTrigger className="no-underline hover:no-underline">
            <Text>categoria</Text>
          </AccordionTrigger>

          <AccordionContent>
            <FieldGroup className="flex flex-col gap-3">
              {categories.map((cat) => (
                <Field key={cat} orientation="horizontal">
                  <Checkbox
                    id={cat}
                    checked={selectCategories.includes(cat)}
                    onCheckedChange={(checked) => handleToogle(cat, checked)}
                  />

                  <label htmlFor={cat}>
                    <Text variant="muted">{cat}</Text>
                  </label>
                </Field>
              ))}
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
