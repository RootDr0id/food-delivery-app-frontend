import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

/**
 * A component that renders a form section for the restaurant menu.
 * It renders a list of menu items, each one is a MenuItemInput component.
 * The component also renders a button to add a new menu item.
 * When the button is clicked, a new empty menu item is added to the list.
 * The component uses the useFormContext hook to connect the form fields to the form.
 * The component uses the useFieldArray hook to manage the list of menu items.
 */
const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({//fields:is an array of all current list of menu items
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (//retruns an array of menuItems
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
