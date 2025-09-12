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
                <p className="text-sm text-muted-foreground italic mt-1 mb-3">
                  Do you have any owner/partner salary goals? Do you know what you need to generate to break even? Are you planning to expand or change your operation significantly in the next few years?
                </p>
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
            name="nextImportantStep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From your perspective, what is the next most important step for you to achieve your goals?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Tell us about the most important next step you need to take..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confidenceReasons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your reasons for feeling confident (or not) about your farm's success?</FormLabel>
                <p className="text-sm text-muted-foreground italic mt-1 mb-3">
                  Do you have any suspicions that you are losing money somewhere? Do you feel confident that you understand your market demand and sales channels? Do you have cash reserves set aside to manage unexpected emergencies?
                </p>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Share your thoughts on your farm's prospects and any concerns you might have..."
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