import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/farmerForm";

interface AboutYouSectionProps {
  control: Control<FormValues>;
}

const contactMethods = [
  { label: "Phone", value: "Phone" },
  { label: "Email", value: "Email" },
  { label: "Text", value: "Text" }
];

export default function AboutYouSection({ control }: AboutYouSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Tell us about yourself</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="fullName"
            rules={{ required: "Full Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="farmOrBusiness"
            rules={{ required: "Farm or Business Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm or Business Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Your farm or business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            rules={{ required: "Phone is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="cellPhoneCarrier"
            rules={{ required: "Cell Phone Carrier is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cell Phone Carrier <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Verizon, AT&T, T-Mobile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="mailing"
          rules={{ required: "Mailing Address is required" }}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Mailing Address <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea placeholder="123 Farm Road, City, State, ZIP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="preferredContact"
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>How would you prefer we contact you? <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex gap-6"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {contactMethods.map(option => (
                    <FormItem key={option.value} className="flex items-center gap-2">
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{option.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}