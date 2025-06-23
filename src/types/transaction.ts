
export interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  bankAccount: string;
  category: string;
  notes: string;
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
}
