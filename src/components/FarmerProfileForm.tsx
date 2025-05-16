import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useState } from "react";

type FormValues = {
  fullName: string;
  farmOrBusiness: string;
  email: string;
  phone: string;
  mailing: string;
  preferredContact: string;
  typeOfFarm: string;
  organic: string;
  acres: string;
  livestock: string;
  entityType: string;
  years: string;
  accountant: string;
  bookkeeper: string;
  payroll: string[];
  bookkeepingSystem: string;
  previousBookkeeping: string;
  receipts: string;
  employees: string;
  incomeTax: string;
  goals: string;
  accountingAssistance: string;
  additional: string;
};

const contactMethods = [
  { label: "Phone", value: "Phone" },
  { label: "Email", value: "Email" },
  { label: "Text", value: "Text" }
];

const farmTypes = [
  "Vegetable", "Tree Fruit", "Mixed Fruit/Vegetable", "Vineyard", "Livestock", "Grain", "Floriculture", "Other"
];
const organicOptions = ["Yes", "No", "Transitioning"];

const entityTypes = [
  "Sole Proprietor", "LLC", "S Corporation", "C Corporation", "Partnership", "Other"
];

const payrollOptions = [
  { label: "Employees", value: "employees" },
  { label: "Contractors", value: "contractors" },
  { label: "Neither", value: "neither" }
];

const bookkeepingSystems = [
  "QuickBooks Online", "QuickBooks Desktop", "Xero", "Wave", "Excel/Spreadsheets", "Other", "None"
];

export default function FarmerProfileForm() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      farmOrBusiness: "",
      email: "",
      phone: "",
      mailing: "",
      preferredContact: "",
      typeOfFarm: "",
      organic: "",
      acres: "",
      livestock: "",
      entityType: "",
      years: "",
      accountant: "",
      bookkeeper: "",
      payroll: [],
      bookkeepingSystem: "",
      previousBookkeeping: "",
      receipts: "",
      employees: "",
      incomeTax: "",
      goals: "",
      accountingAssistance: "",
      additional: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    setSubmitting(true);
    // Place for backend submit logic
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      alert("Form submitted!");
    }, 1200);
  };

  return (
    <div className="p-2 md:p-6 bg-white/90 rounded-xl shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Farmer Onboarding Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Section: Basic Info */}
          <div>
            <h2 className="text-lg font-semibold">Farmer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <FormField
                control={form.control}
                name="fullName"
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="farmOrBusiness"
                rules={{ required: "Farm or Business Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm or Business Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Farm or Business Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="mailing"
              rules={{ required: "Mailing Address is required" }}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Mailing Address <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Address, City, State, Zip" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredContact"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Preferred Method of Contact <span className="text-red-500">*</span></FormLabel>
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
          {/* Section: Farm Info */}
          <div>
            <h2 className="text-lg font-semibold">Farm Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <FormField
                control={form.control}
                name="typeOfFarm"
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Farm <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input list="farmTypeOptions" placeholder="Type of Farm" {...field} />
                    </FormControl>
                    <datalist id="farmTypeOptions">
                      {farmTypes.map(opt => (
                        <option value={opt} key={opt} />
                      ))}
                    </datalist>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organic"
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organic? <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex gap-4"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {organicOptions.map(opt => (
                          <FormItem key={opt} className="flex items-center gap-2">
                            <FormControl>
                              <RadioGroupItem value={opt} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">{opt}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acres"
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many acres do you farm? <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Acres" type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="livestock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Livestock (number and type)</FormLabel>
                    <FormControl>
                      <Input placeholder="Livestock details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Section: Business/Entity Info */}
          <div>
            <h2 className="text-lg font-semibold">Business/Entity Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <FormField
                control={form.control}
                name="entityType"
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Type <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input list="entityTypeOptions" placeholder="Entity Type" {...field} />
                    </FormControl>
                    <datalist id="entityTypeOptions">
                      {entityTypes.map(opt => (
                        <option value={opt} key={opt} />
                      ))}
                    </datalist>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="years"
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many years in business? <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Years" type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Section: Accounting/Payroll */}
          <div>
            <h2 className="text-lg font-semibold">Accounting & Payroll</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
                name="payroll"
                render={({ field }) => (
                  <FormItem>
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
            </div>
          </div>
          {/* Section: Bookkeeping */}
          <div>
            <h2 className="text-lg font-semibold">Bookkeeping & Tax Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <FormField
                control={form.control}
                name="bookkeepingSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current bookkeeping/accounting system?</FormLabel>
                    <FormControl>
                      <Input list="bookSystemOptions" placeholder="Bookkeeping System" {...field} />
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

              <FormField
                control={form.control}
                name="previousBookkeeping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Who did your previous bookkeeping?</FormLabel>
                    <FormControl>
                      <Input placeholder="Name or N/A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="receipts"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>How do you currently organize receipts?</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Receipt process" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Total number of employees</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Number of employees" type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="incomeTax"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Who prepares your annual income tax returns?</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name or N/A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Section: Goals & Assistance */}
          <div>
            <h2 className="text-lg font-semibold">Goals & Additional Information</h2>
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>What are your goals for your farm or business?</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe your goas for this year and beyond..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountingAssistance"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>What would you most like help with regarding your accounting or records?</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g. organization, software, reporting..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Section: Other/Additional */}
          <div>
            <FormField
              control={form.control}
              name="additional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional questions or comments?</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Let us know if you have any other questions or notes." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-4" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
