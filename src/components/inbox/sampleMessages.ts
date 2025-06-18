
import { Message } from "./MessageListItem";

export const sampleMessages: Message[] = [
  {
    id: 1,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Welcome to Good Agriculture - Next Steps',
    content: 'Hi there! Welcome to Good Agriculture. I\'m excited to work with you on organizing your farm\'s financial data. To get started, please upload your bank statements from the last 12 months. This will help us establish baseline financial patterns for your operation.',
    date: '2024-06-17',
    time: '2:30 PM',
    read: false
  },
  {
    id: 2,
    type: 'text',
    from: 'Sarah Johnson',
    subject: 'Quick question about enterprise setup',
    content: 'Hey! Quick question - do you want to track your corn and soybean operations separately? I can help set up enterprise allocations for each crop if that would be helpful for your planning.',
    date: '2024-06-16',
    time: '11:45 AM',
    read: true
  },
  {
    id: 3,
    type: 'phone',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Phone Call Notes - Enterprise Allocation Discussion',
    content: 'Call Summary (30 min): Discussed setting up enterprise allocations for corn (400 acres) and soybeans (300 acres). Farmer wants to track input costs, labor, and equipment separately for each crop. Need to allocate shared expenses like land rent proportionally. Action items: Upload seed purchase receipts and fuel records.',
    date: '2024-06-15',
    time: '3:00 PM',
    read: true
  },
  {
    id: 4,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Bank Statement Import - Missing Transactions',
    content: 'I noticed some gaps in the imported bank data from March. Could you double-check that all accounts were included? Also, I see several large equipment purchases that we should categorize properly. Let\'s schedule a call to review these together.',
    date: '2024-06-14',
    time: '9:15 AM',
    read: true
  },
  {
    id: 5,
    type: 'text',
    from: 'Sarah Johnson',
    subject: 'Fuel allocation question',
    content: 'For the fuel purchases in April - should I allocate 60% to corn and 40% to soybeans based on acreage? Or do you track fuel usage differently?',
    date: '2024-06-13',
    time: '4:20 PM',
    read: true
  },
  {
    id: 6,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Seed Cost Allocation - Need Your Input',
    content: 'I\'m working on allocating your seed costs between enterprises. I have the corn seed invoices, but I\'m missing the soybean seed purchases from March. Could you upload those receipts when you get a chance? Also, let me know if you want to track treated vs. untreated seed costs separately.',
    date: '2024-06-12',
    time: '1:45 PM',
    read: true
  },
  {
    id: 7,
    type: 'phone',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Phone Call Notes - Financial Categories Review',
    content: 'Call Summary (45 min): Reviewed transaction categorization for Q1. Farmer confirmed fertilizer allocation method (50% spring application, 50% fall). Discussed creating separate categories for crop insurance vs. general insurance. Need to adjust labor allocation - farmer does 70% corn work, hired help split evenly.',
    date: '2024-06-11',
    time: '10:30 AM',
    read: true
  },
  {
    id: 8,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Equipment Depreciation and Allocation',
    content: 'I\'m setting up equipment depreciation schedules for your financial reports. For the new planter purchased in February, should I allocate the depreciation 60/40 between corn and soybeans, or do you prefer a different split? Also, do you want to track custom work separately from owned equipment costs?',
    date: '2024-06-10',
    time: '8:30 AM',
    read: true
  },
  {
    id: 9,
    type: 'text',
    from: 'Sarah Johnson',
    subject: 'Chemical application records',
    content: 'Can you upload your chemical application records? I need them to properly allocate herbicide and fungicide costs between corn and soybeans. The spray records will help with accurate enterprise costing.',
    date: '2024-06-09',
    time: '12:15 PM',
    read: true
  },
  {
    id: 10,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Monthly Financial Review - Ready for Your Input',
    content: 'Your May financial summary is ready for review! I\'ve categorized 95% of transactions and allocated costs between corn and soybean enterprises. A few items need your input: 1) Three equipment repair bills that could apply to either enterprise, 2) Fuel allocation for field prep work, 3) Whether to split the soil testing costs. Can we schedule a call this week to finalize these details?',
    date: '2024-06-08',
    time: '4:45 PM',
    read: true
  }
];
