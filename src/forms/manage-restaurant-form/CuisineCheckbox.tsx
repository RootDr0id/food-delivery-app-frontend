import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

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
