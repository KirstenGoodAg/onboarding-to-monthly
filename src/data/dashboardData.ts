
// Example financial data
export const dataMap = {
  "6m": [
    { month: "Jan", revenue: 15500 },
    { month: "Feb", revenue: 14800 },
    { month: "Mar", revenue: 17000 },
    { month: "Apr", revenue: 16200 },
    { month: "May", revenue: 17500 },
    { month: "Jun", revenue: 18700 },
  ],
  "12m": [
    { month: "Jul", revenue: 14000 },
    { month: "Aug", revenue: 13100 },
    { month: "Sep", revenue: 15000 },
    { month: "Oct", revenue: 15500 },
    { month: "Nov", revenue: 16000 },
    { month: "Dec", revenue: 14200 },
    { month: "Jan", revenue: 15500 },
    { month: "Feb", revenue: 14800 },
    { month: "Mar", revenue: 17000 },
    { month: "Apr", revenue: 16200 },
    { month: "May", revenue: 17500 },
    { month: "Jun", revenue: 18700 },
  ],
  "2y": [
    // 24 months data (simplified for brevity)
    ...Array.from({ length: 24 }).map((_, idx) => ({
      month: `M${idx + 1}`,
      revenue: 12000 + idx * 400 + ((idx % 3) * 500),
    })),
  ],
  "3y": [
    // 36 months data (simplified for brevity)
    ...Array.from({ length: 36 }).map((_, idx) => ({
      month: `M${idx + 1}`,
      revenue: 10000 + idx * 400 + ((idx % 4) * 700),
    })),
  ],
};

// Glance stats data for different time periods
export const glanceStatsData = {
  "current-month": [
    { label: "Top-line Revenue", value: "$18,700" },
    { label: "Net Profits", value: "$2,100" },
    { label: "Cash on Hand", value: "$6,500" },
  ],
  "last-month": [
    { label: "Top-line Revenue", value: "$17,500" },
    { label: "Net Profits", value: "$1,850" },
    { label: "Cash on Hand", value: "$6,200" },
  ],
  "last-quarter": [
    { label: "Top-line Revenue", value: "$52,400" },
    { label: "Net Profits", value: "$5,750" },
    { label: "Cash on Hand", value: "$6,500" },
  ],
  "year-to-date": [
    { label: "Top-line Revenue", value: "$98,200" },
    { label: "Net Profits", value: "$11,300" },
    { label: "Cash on Hand", value: "$6,500" },
  ],
  "previous-year": [
    { label: "Top-line Revenue", value: "$156,800" },
    { label: "Net Profits", value: "$18,900" },
    { label: "Cash on Hand", value: "$5,100" },
  ],
  "two-years-ago": [
    { label: "Top-line Revenue", value: "$142,300" },
    { label: "Net Profits", value: "$16,200" },
    { label: "Cash on Hand", value: "$4,800" },
  ],
};

// Placeholder: uncategorized transactions
export const uncategorizedTransactions = [
  { id: 1, name: "John Deere Repair", amount: -530.12, date: "2025-05-20" },
  { id: 2, name: "Fertilizer Purchase", amount: -276.79, date: "2025-05-19" },
  { id: 3, name: "Tractor Fuel", amount: -116.42, date: "2025-05-17" },
];

// Placeholder: recent inbox messages
export const recentInboxMessages = [
  { id: 1, subject: "Advisor Question: Crop Rotation", date: "2025-05-20" },
  { id: 2, subject: "Document Reminder: Tax Form", date: "2025-05-19" },
  { id: 3, subject: "Welcome to Good Agriculture!", date: "2025-05-18" },
];

// Sample expense data
export const recentExpenses = [
  { id: 1, description: "Fertilizer Purchase", amount: 276.79, category: "Supplies", date: "2025-05-28", bankAccount: "Farm Operating" },
  { id: 2, description: "Tractor Fuel", amount: 116.42, category: "Fuel", date: "2025-05-27", bankAccount: "Farm Operating" },
  { id: 3, description: "Seed Purchase", amount: 445.23, category: "Supplies", date: "2025-05-26", bankAccount: "Farm Operating" },
  { id: 4, description: "Equipment Repair", amount: 530.12, category: "Maintenance", date: "2025-05-25", bankAccount: "Farm Operating" },
  { id: 5, description: "Irrigation Equipment", amount: 892.45, category: "Equipment", date: "2025-05-24", bankAccount: "Savings" },
  { id: 6, description: "Pesticide Application", amount: 234.67, category: "Supplies", date: "2025-05-23", bankAccount: "Farm Operating" },
  { id: 7, description: "Labor Costs", amount: 1200.00, category: "Labor", date: "2025-05-22", bankAccount: "Farm Operating" },
  { id: 8, description: "Insurance Payment", amount: 345.88, category: "Insurance", date: "2025-05-21", bankAccount: "Savings" },
  { id: 9, description: "Vehicle Maintenance", amount: 189.33, category: "Maintenance", date: "2025-05-20", bankAccount: "Farm Operating" },
  { id: 10, description: "Office Supplies", amount: 67.45, category: "Office", date: "2025-05-19", bankAccount: "Farm Operating" },
];

export const expenseCategoriesData = {
  "1m": [
    { name: "Supplies", value: 956.69, color: "#8884d8" },
    { name: "Fuel", value: 116.42, color: "#82ca9d" },
    { name: "Maintenance", value: 719.45, color: "#ffc658" },
    { name: "Equipment", value: 892.45, color: "#ff7300" },
    { name: "Labor", value: 1200.00, color: "#8dd1e1" },
    { name: "Insurance", value: 345.88, color: "#d084d0" },
    { name: "Office", value: 67.45, color: "#ffb347" },
  ],
  "6m": [
    { name: "Supplies", value: 5740.15, color: "#8884d8" },
    { name: "Fuel", value: 698.52, color: "#82ca9d" },
    { name: "Maintenance", value: 4316.70, color: "#ffc658" },
    { name: "Equipment", value: 5354.70, color: "#ff7300" },
    { name: "Labor", value: 7200.00, color: "#8dd1e1" },
    { name: "Insurance", value: 2075.28, color: "#d084d0" },
    { name: "Office", value: 404.70, color: "#ffb347" },
  ],
  "12m": [
    { name: "Supplies", value: 11480.30, color: "#8884d8" },
    { name: "Fuel", value: 1397.04, color: "#82ca9d" },
    { name: "Maintenance", value: 8633.40, color: "#ffc658" },
    { name: "Equipment", value: 10709.40, color: "#ff7300" },
    { name: "Labor", value: 14400.00, color: "#8dd1e1" },
    { name: "Insurance", value: 4150.56, color: "#d084d0" },
    { name: "Office", value: 809.40, color: "#ffb347" },
  ],
};
