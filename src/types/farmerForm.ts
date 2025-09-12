export type FormValues = {
  // About You
  fullName: string;
  farmOrBusiness: string;
  email: string;
  phone: string;
  cellPhoneCarrier: string;
  mailing: string;
  preferredContact: string;
  
  // About Your Farm
  typeOfFarm: string[];
  productServicesDetail: string;
  organic: string;
  acres: string;
  salesChannels: string[];
  salesChannelDetails: string;
  entityType: string;
  years: string;
  
  // Income & Expenses
  lastYearRevenue: string;
  expectedRevenue: string;
  payroll: string[];
  employees: string;
  receipts: string;
  bookkeepingSystem: string;
  businessAccounts: string[];
  accountUsageDetails: string;
  businessPersonalSeparation: string;
  
  // Assets & Liabilities
  farmAssets: string;
  equipment: string;
  realEstate: string;
  loans: string;
  creditLines: string;
  
  // Taxes
  accountant: string;
  bookkeeper: string;
  incomeTax: string;
  taxChallenges: string;
  recordKeeping: string;
  
  // Your Goals
  goals: string;
  accountingAssistance: string;
  growthPlans: string;
  financialChallenges: string;
  
  // What Drives You
  farmingMotivation: string;
  communityImpact: string;
  sustainabilityFocus: string;
  idealFarmerLife: string;
  favoriteAndLeastFavorite: string;
  farmingBarriers: string;
  optimisticOutlook: string;
  agricultureInfluences: string;
  additional: string;
};