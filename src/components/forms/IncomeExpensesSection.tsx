import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  "Quickbooks", "Xero", "Excel/Google Sheets", "Manual/handwritten notes", "Other"
];

const businessAccountOptions = [
  { label: "Business Checking", value: "business-checking" },
  { label: "Business Savings", value: "business-savings" },
  { label: "Business Credit Cards", value: "business-credit-cards" },
  { label: "Personal Checking/Credit Cards", value: "personal-checking-credit" },
  { label: "Other", value: "other" }
];

const separationOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "I try", value: "i-try" },
  { label: "Other", value: "other" }
];

const posAppsOptions = [
  { label: "Square", value: "square" },
  { label: "Shopify", value: "shopify" },
  { label: "Stripe", value: "stripe" },
  { label: "Barn2Door", value: "barn2door" },
  { label: "Venmo", value: "venmo" },
  { label: "Cashapp", value: "cashapp" },
  { label: "Zelle", value: "zelle" },
  { label: "GoCardless", value: "gocardless" },
  { label: "PayPal", value: "paypal" },
  { label: "Zoho", value: "zoho" },
  { label: "QuickBooks Online", value: "quickbooks-online" },
  { label: "Xero", value: "xero" },
  { label: "Other", value: "other" }
];

const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

const personalAccountBusinessOptions = [
  { label: "Mortgage", value: "mortgage" },
  { label: "Rent", value: "rent" },
  { label: "Utilities", value: "utilities" },
  { label: "Insurance", value: "insurance" },
  { label: "Gas/Fuel", value: "gas-fuel" },
  { label: "Other", value: "other" }
];

const timeperiods = [
  { label: "Jan-Feb", value: "jan-feb" },
  { label: "Mar-Apr", value: "mar-apr" },
  { label: "May-Jun", value: "may-jun" },
  { label: "Jul-Aug", value: "jul-aug" },
  { label: "Sep-Oct", value: "sep-oct" },
  { label: "Nov-Dec", value: "nov-dec" }
];

const fluctuationTypes = [
  { label: "Revenue goes up", key: "revenueUp" },
  { label: "Revenue goes down", key: "revenueDown" },
  { label: "Expenses go up", key: "expensesUp" },
  { label: "Expenses go down", key: "expensesDown" }
];

export default function IncomeExpensesSection({ control }: IncomeExpensesSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Income & Expense Tracking</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            control={control}
            name="lastYearRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximately how much revenue did you make last year?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $100,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="expectedRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximately how much revenue do you expect to make this year?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $120,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
        </div>

        <FormField
          control={control}
          name="businessAccounts"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Accounts used for business purposes (select all that apply)</FormLabel>
              <div className="flex flex-col gap-2">
                {businessAccountOptions.map(opt => (
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="accountUsageDetails"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Account usage details (How many accounts of each type, how are accounts used, etc)</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="1 Wells Fargo Business Checking used for large operating expenses, 1 Chase Business Credit Card used for smaller daily expenses"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="businessPersonalSeparation"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Do you keep business and personal transactions separate?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-2"
                >
                  {separationOptions.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value} className="text-sm cursor-pointer">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="posApps"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Point of Sale/Merchant Apps used for sales/invoicing (select all that apply)</FormLabel>
              <div className="flex flex-col gap-2">
                {posAppsOptions.map(opt => (
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cashCheckPayments"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Do you receive or make payments via cash or check on a monthly basis?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-2"
                >
                  {yesNoOptions.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`cash-check-${opt.value}`} />
                      <Label htmlFor={`cash-check-${opt.value}`} className="text-sm cursor-pointer">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalAccountBusiness"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Is there any business income or expense that may (inevitably or accidentally) appear on personal bank accounts? (select all that apply)</FormLabel>
              <div className="flex flex-col gap-2">
                {personalAccountBusinessOptions.map(opt => (
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="governmentPayments"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Have you received income from grants and/or government payments?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-2"
                >
                  {yesNoOptions.map(opt => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`government-${opt.value}`} />
                      <Label htmlFor={`government-${opt.value}`} className="text-sm cursor-pointer">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="seasonalFluctuations"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Are there certain times of the year you expect income and/or expenses to fluctuate?</FormLabel>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 bg-gray-50 text-left font-medium"></th>
                      {timeperiods.map(period => (
                        <th key={period.value} className="border border-gray-300 p-2 bg-gray-50 text-center font-medium text-sm">
                          {period.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fluctuationTypes.map(type => (
                      <tr key={type.key}>
                        <td className="border border-gray-300 p-2 font-medium text-sm">{type.label}</td>
                        {timeperiods.map(period => (
                          <td key={period.value} className="border border-gray-300 p-2 text-center">
                            <Checkbox
                              checked={field.value?.[type.key as keyof typeof field.value]?.includes(period.value) || false}
                              onCheckedChange={checked => {
                                const currentValues = field.value || { revenueUp: [], revenueDown: [], expensesUp: [], expensesDown: [] };
                                const currentTypeValues = currentValues[type.key as keyof typeof currentValues] || [];
                                
                                if (checked) {
                                  field.onChange({
                                    ...currentValues,
                                    [type.key]: [...currentTypeValues, period.value]
                                  });
                                } else {
                                  field.onChange({
                                    ...currentValues,
                                    [type.key]: currentTypeValues.filter((v: string) => v !== period.value)
                                  });
                                }
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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