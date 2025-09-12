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
            name="idealFarmerLife"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What does your ideal life as a farmer look like?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe your vision of the perfect farming lifestyle..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="favoriteAndLeastFavorite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your favorite and least favorite things about the farming business?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Share what you love most and what challenges you the most..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="farmingBarriers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>In your experience, what are the greatest barriers to running a successful farm?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe the biggest challenges you face or have observed..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="optimisticOutlook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you optimistic about the upcoming year? Why or why not?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Share your outlook and what factors influence your perspective..."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="agricultureInfluences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who are some of your greatest influences in agriculture?</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Mentors, authors, farmers, researchers, or others who have shaped your approach..."
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
                <FormLabel>Additional questions, comments, or anything else you would like us to know?</FormLabel>
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