import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

/**
 * A component that renders a checkbox with a label representing a cuisine.
 * The checked state of the checkbox is determined by the value of the "cuisines" field in the parent form.
 * When the checkbox is checked, the cuisine is added to the list of cuisines selected.
 * When the checkbox is unchecked, the cuisine is removed from the list of cuisines selected.
 *
 * @param cuisine the name of the cuisine to be rendered as a checkbox
 * @param field the field object returned by the `useController` hook
 * @returns a JSX element representing the checkbox and its label
 */
const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              //if the checkbocks is checked then we add the cuisine to the list of cuisines selected
              field.onChange([...field.value, cuisine]);
              //this creates a new array with the current chosen list of cuisines and appends the new cuisine in the end
            } else {// we ommit (filter out the unchecked cuisine) from the list[array]
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            } 
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
