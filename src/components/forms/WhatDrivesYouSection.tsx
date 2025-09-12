import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

interface WhatDrivesYouSectionProps {
  control: Control<FormValues>;
}

export default function WhatDrivesYouSection({ control }: WhatDrivesYouSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">What Drives You</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Share your passion and purpose - help us understand what motivates you as a farmer.
        </p>
        
        <div className="space-y-6">
          <FormField
            control={control}
            name="farmingMotivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What inspired you to become a farmer?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Tell us your story - family tradition, love of the land, desire for sustainability, etc..."
                    className="min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="communityImpact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How do you want to impact your community?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Local food systems, environmental stewardship, education, economic development, etc..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sustainabilityFocus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What does sustainability mean to your operation?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Environmental practices, economic viability, social responsibility, etc..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="additional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional questions, comments, or anything else you'd like us to know?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Share anything else that would help us better understand and support your farm..."
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