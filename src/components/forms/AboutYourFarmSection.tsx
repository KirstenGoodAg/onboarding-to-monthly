import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

interface AboutYourFarmSectionProps {
  control: Control<FormValues>;
}

const farmTypes = [
  "Specialty Crops", "Beef", "Pork", "Dairy", "Chicken Broilers", "Chicken Eggs", 
  "Other Poultry", "Livestock (live animal sales)", "Value Added Products", 
  "Consumer Packaged Goods", "By-product sales (offal, compost, etc)", 
  "Agritourism", "Farm Consulting", "Other"
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
        <div className="md:col-span-2">
          <FormField
            control={control}
            name="typeOfFarm"
            rules={{ required: "Please select at least one farm type" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Farm (select all that apply) <span className="text-red-500">*</span></FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {farmTypes.map(type => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <Checkbox
                        checked={field.value?.includes(type)}
                        onCheckedChange={checked => {
                          if (checked) {
                            field.onChange([...(field.value || []), type]);
                          } else {
                            field.onChange((field.value || []).filter((v: string) => v !== type));
                          }
                        }}
                      />
                      {type}
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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