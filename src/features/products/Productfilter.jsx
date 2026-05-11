import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useQueryParams } from "@/pages/UseQueryparams";

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
      <Accordion type="multiple" className="w-full">
        {/* Categoria */}
        <AccordionItem value="categoria">
          <AccordionTrigger className="text-sm font-semibold">
            Categoria
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

                  <label htmlFor={cat}>{cat}</label>
                </Field>
              ))}
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
