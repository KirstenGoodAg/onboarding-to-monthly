import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

interface YourGoalsSectionProps {
  control: Control<FormValues>;
}

export default function YourGoalsSection({ control }: YourGoalsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Goals & Vision</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Help us understand your aspirations so we can better support your farm's success.
        </p>
        
        <div className="space-y-6">
          <FormField
            control={control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your goals for your farm or business?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe your goals for this year and beyond - growth, profitability, sustainability, diversification, etc..."
                    className="min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="growthPlans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have plans to expand or change your operation?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Tell us about any expansion plans, new crops, additional livestock, new markets, etc..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="financialChallenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your biggest financial challenges?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Cash flow, seasonal fluctuations, equipment costs, labor expenses, market prices, etc..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="accountingAssistance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What would you most like help with regarding your accounting or records?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Organization, software training, financial reporting, tax planning, budgeting, etc..."
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