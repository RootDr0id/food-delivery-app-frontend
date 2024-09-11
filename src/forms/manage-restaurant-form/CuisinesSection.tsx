import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

/**
 * A component that renders a list of checkboxes for selecting cuisines.
 * It uses the useFormContext hook to connect the checkboxes to the form.
 * The cuisines are rendered as a grid of md:grid-cols-5.
 * Each cuisine is rendered as a CuisineCheckbox component.
 * The component also renders a FormMessage component to display any form message.
 * The component does not render anything when the form is not initialized.
 */
const CuisinesSection = () => {
  const { control } = useFormContext();//hook that links the form field to the form

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem) => (//retruns an array of checkboxes from the array of cuisines's names
                <CuisineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
