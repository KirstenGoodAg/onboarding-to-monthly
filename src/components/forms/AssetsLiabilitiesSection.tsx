import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";
import FileUploadSection from "./FileUploadSection";

interface AssetsLiabilitiesSectionProps {
  control: Control<FormValues>;
}

export default function AssetsLiabilitiesSection({ control }: AssetsLiabilitiesSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Assets & Liabilities</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Help us understand your farm's financial position by providing details about your assets and liabilities.
        </p>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-6">Assets</h2>
            <div className="space-y-6">
              <FormField
                control={control}
                name="assets"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadSection
                        title="Farm Assets"
                        items={field.value || []}
                        onItemsChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadSection
                        title="Equipment & Machinery"
                        items={field.value || []}
                        onItemsChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="realEstate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadSection
                        title="Real Estate & Property"
                        items={field.value || []}
                        onItemsChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Liabilities</h2>
            <div className="space-y-6">
              <FormField
                control={control}
                name="loans"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadSection
                        title="Outstanding Loans"
                        items={field.value || []}
                        onItemsChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="creditLines"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploadSection
                        title="Credit Lines & Other Debts"
                        items={field.value || []}
                        onItemsChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}