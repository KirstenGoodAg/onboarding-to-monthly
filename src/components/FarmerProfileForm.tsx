import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AboutYouSection from "./forms/AboutYouSection";
import AboutYourFarmSection from "./forms/AboutYourFarmSection";
import IncomeExpensesSection from "./forms/IncomeExpensesSection";
import AssetsLiabilitiesSection from "./forms/AssetsLiabilitiesSection";
import TaxesSection from "./forms/TaxesSection";
import YourGoalsSection from "./forms/YourGoalsSection";
import WhatDrivesYouSection from "./forms/WhatDrivesYouSection";
import { FormValues } from "@/types/farmerForm";

export default function FarmerProfileForm() {
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("about-you");
  
  const form = useForm<FormValues>({
    defaultValues: {
      // About You
      fullName: "",
      farmOrBusiness: "",
      email: "",
      phone: "",
      cellPhoneCarrier: "",
      mailing: "",
      preferredContact: "",
      
      // About Your Farm
      typeOfFarm: [],
      productServicesDetail: "",
      organic: "",
      acres: "",
      salesChannels: [],
      salesChannelDetails: "",
      entityType: "",
      years: "",
      
      // Income & Expenses
      lastYearRevenue: "",
      expectedRevenue: "",
      payroll: [],
      employees: "",
      receipts: "",
      bookkeepingSystem: "",
      businessAccounts: [],
      accountUsageDetails: "",
      businessPersonalSeparation: "",
      posApps: [],
      cashCheckPayments: "",
      personalAccountBusiness: [],
      governmentPayments: "",
      seasonalFluctuations: {
        revenueUp: [],
        revenueDown: [],
        expensesUp: [],
        expensesDown: []
      },
      
      // Assets & Liabilities
      farmAssets: "",
      equipment: "",
      realEstate: "",
      loans: "",
      creditLines: "",
      
      // Taxes
      accountant: "",
      bookkeeper: "",
      incomeTax: "",
      taxChallenges: "",
      recordKeeping: "",
      
      // Your Goals
      goals: "",
      accountingAssistance: "",
      growthPlans: "",
      financialChallenges: "",
      
      // What Drives You
      farmingMotivation: "",
      communityImpact: "",
      sustainabilityFocus: "",
      idealFarmerLife: "",
      favoriteAndLeastFavorite: "",
      farmingBarriers: "",
      optimisticOutlook: "",
      agricultureInfluences: "",
      additional: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    setSubmitting(true);
    // Place for backend submit logic
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      alert("Profile submitted successfully!");
    }, 1200);
  };

  const tabs = [
    { id: "about-you", label: "About You", component: AboutYouSection },
    { id: "about-farm", label: "About Your Farm", component: AboutYourFarmSection },
    { id: "income-expenses", label: "Income & Expenses", component: IncomeExpensesSection },
    { id: "assets-liabilities", label: "Assets & Liabilities", component: AssetsLiabilitiesSection },
    { id: "taxes", label: "Taxes", component: TaxesSection },
    { id: "goals", label: "Your Goals", component: YourGoalsSection },
    { id: "what-drives-you", label: "What Drives You", component: WhatDrivesYouSection },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Profile</h1>
        <p className="text-gray-600">Complete your profile to help us better serve your farming operation</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap w-full h-auto p-1 mb-8">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="text-xs sm:text-sm px-3 py-2 flex-shrink-0 min-w-0"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => {
              const Component = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <div className="min-h-[600px] p-6 border rounded-lg bg-gray-50/50">
                    <Component control={form.control} />
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>

          <div className="flex justify-between items-center pt-6 border-t">
            <div className="text-sm text-gray-500">
              Section {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length}
            </div>
            
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1].id);
                  }
                }}
                disabled={activeTab === tabs[0].id}
              >
                Previous
              </Button>
              
              {activeTab === tabs[tabs.length - 1].id ? (
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Complete Profile"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1].id);
                    }
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}