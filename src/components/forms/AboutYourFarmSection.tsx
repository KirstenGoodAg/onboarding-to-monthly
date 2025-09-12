import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

interface AboutYourFarmSectionProps {
  control: Control<FormValues>;
}

const farmTypes = [
  "Vegetable", "Tree Fruit", "Mixed Fruit/Vegetable", "Vineyard", "Livestock", "Grain", "Floriculture", "Other"
];

const organicOptions = ["Yes", "No", "Transitioning"];

const entityTypes = [
  "Sole Proprietor", "LLC", "S Corporation", "C Corporation", "Partnership", "Other"
];

export default function AboutYourFarmSection({ control }: AboutYourFarmSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Tell us about your farm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="typeOfFarm"
            rules={{ required: "Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Farm <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input list="farmTypeOptions" placeholder="Select or type your farm type" {...field} />
                </FormControl>
                <datalist id="farmTypeOptions">
                  {farmTypes.map(opt => (
                    <option value={opt} key={opt} />
                  ))}
                </datalist>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="organic"
            rules={{ required: "Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is your farm organic? <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-4"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {organicOptions.map(opt => (
                      <FormItem key={opt} className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value={opt} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">{opt}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="acres"
            rules={{ required: "Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many acres do you farm? <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Total acres" type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="livestock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Livestock (number and type)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 50 cattle, 200 chickens" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Business Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="entityType"
            rules={{ required: "Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Entity Type <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input list="entityTypeOptions" placeholder="Select or type entity type" {...field} />
                </FormControl>
                <datalist id="entityTypeOptions">
                  {entityTypes.map(opt => (
                    <option value={opt} key={opt} />
                  ))}
                </datalist>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="years"
            rules={{ required: "Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many years have you been in business? <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Number of years" type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}