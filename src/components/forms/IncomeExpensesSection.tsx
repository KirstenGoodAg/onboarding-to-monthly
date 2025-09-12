import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

interface IncomeExpensesSectionProps {
  control: Control<FormValues>;
}

const payrollOptions = [
  { label: "Employees", value: "employees" },
  { label: "Contractors", value: "contractors" },
  { label: "Neither", value: "neither" }
];

const bookkeepingSystems = [
  "QuickBooks Online", "QuickBooks Desktop", "Xero", "Wave", "Excel/Spreadsheets", "Other", "None"
];

export default function IncomeExpensesSection({ control }: IncomeExpensesSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Income & Expense Tracking</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            control={control}
            name="bookkeepingSystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current bookkeeping/accounting system?</FormLabel>
                <FormControl>
                  <Input list="bookSystemOptions" placeholder="Select or type your system" {...field} />
                </FormControl>
                <datalist id="bookSystemOptions">
                  {bookkeepingSystems.map(opt => (
                    <option value={opt} key={opt} />
                  ))}
                </datalist>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="previousBookkeeping"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who did your previous bookkeeping?</FormLabel>
                <FormControl>
                  <Input placeholder="Name or N/A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total number of employees</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Number of employees" type="number" min="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="payroll"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Do you process payroll? (select all that apply)</FormLabel>
              <div className="flex flex-col gap-2">
                {payrollOptions.map(opt => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <Checkbox
                      checked={field.value?.includes(opt.value)}
                      onCheckedChange={checked => {
                        if (checked) {
                          field.onChange([...(field.value || []), opt.value]);
                        } else {
                          field.onChange((field.value || []).filter((v: string) => v !== opt.value));
                        }
                      }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="receipts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How do you currently organize receipts and expenses?</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Describe your current receipt organization process..."
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}