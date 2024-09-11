import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

/**
 * A component that renders a form fieldset for a menu item.
 * The component renders two input fields: one for the name of the menu item, and one for the price of the menu item.
 * The component also renders a button to remove the menu item.
 * The component uses the useFormContext hook to get the control object from the parent form,
 * and uses the control object to render the input fields and the associated labels, errors, and messages.
 * The component also uses the FormField and FormControl components from the @/components/ui/form module
 * to render the form fields and the associated labels, errors, and messages.
 * The component also uses the Button component from the @/components/ui/button module
 * to render the button to remove the menu item.
 * The component receives two props: index and removeMenuItem.
 * The index prop is the index of the menu item in the parent form.
 * The removeMenuItem prop is a function that removes the menu item from the parent form.
 * @param {{ index: number, removeMenuItem: () => void }} props
 * @returns {JSX.Element}
 */
const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name 
            </FormLabel>
            <FormControl>
              <Input
                {...field}// to ty the input into the formfield 
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (DZD) 
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="500.00" className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
