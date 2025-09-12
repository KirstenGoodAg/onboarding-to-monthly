import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

interface TaxesSectionProps {
  control: Control<FormValues>;
}

export default function TaxesSection({ control }: TaxesSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Tax & Professional Services</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tell us about your current tax preparation and professional service relationships.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            control={control}
            name="accountant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you currently have an accountant?</FormLabel>
                <FormControl>
                  <Input placeholder="Accountant name or N/A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bookkeeper"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you currently have a bookkeeper?</FormLabel>
                <FormControl>
                  <Input placeholder="Bookkeeper name or N/A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="incomeTax"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Who prepares your annual income tax returns?</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Tax preparer name or self-prepared" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={control}
            name="taxChallenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What tax-related challenges do you face?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe any difficulties with tax preparation, deductions, quarterly payments, etc..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="recordKeeping"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How do you currently keep records for tax purposes?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe your record-keeping system for tax deductions, depreciation, etc..."
                    className="min-h-[100px]"
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