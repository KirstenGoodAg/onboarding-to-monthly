import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";
import DocumentUploadWithCheckbox from "./DocumentUploadWithCheckbox";

interface TaxesSectionProps {
  control: Control<FormValues>;
}

export default function TaxesSection({ control }: TaxesSectionProps) {
  const documentOptions = [
    "Past 3 years form 1049 Schedule F - Profit or Loss from Farming",
    "Past 3 years Form 4562 - Depreciation and Amortization",
    "Most recent detailed Depreciation and Amortization schedule",
    "Bank statement PDF or CSV files for every month last year and this year to date",
    "Mortgage amortization schedules",
    "Loan schedules",
    "Venmo/Cashapp CSV files for every month last year and this year to date"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Tax Information</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Help us understand your tax filing history and document availability.
        </p>
        
        <div className="space-y-6">
          <FormField
            control={control}
            name="taxesFiled"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you filed taxes for the past three years?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="yes" />
                      <label htmlFor="yes" className="text-sm">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="no" />
                      <label htmlFor="no" className="text-sm">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="profitLoss"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Did you earn a profit or incur a loss in the last year?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Profit" id="profit" />
                      <label htmlFor="profit" className="text-sm">Profit</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Loss" id="loss" />
                      <label htmlFor="loss" className="text-sm">Loss</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="I'm not sure" id="not-sure" />
                      <label htmlFor="not-sure" className="text-sm">I'm not sure</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="availableDocuments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you able to provide the following documents?</FormLabel>
                <FormControl>
                  <DocumentUploadWithCheckbox
                    documents={field.value || []}
                    onDocumentsChange={field.onChange}
                    documentOptions={documentOptions}
                  />
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