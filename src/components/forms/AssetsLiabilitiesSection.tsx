import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

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
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Assets</h3>
            <div className="space-y-4">
              <FormField
                control={control}
                name="farmAssets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm Assets (livestock, crops, inventory)</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe your farm assets including livestock, stored crops, supplies, etc..."
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment & Machinery</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="List major equipment, tractors, implements, vehicles, etc..."
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="realEstate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Real Estate & Property</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe farm land, buildings, facilities you own..."
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Liabilities</h3>
            <div className="space-y-4">
              <FormField
                control={control}
                name="loans"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outstanding Loans</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="List any equipment loans, real estate mortgages, operating loans, etc..."
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="creditLines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Lines & Other Debts</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Operating lines of credit, credit cards, supplier credit, etc..."
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
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