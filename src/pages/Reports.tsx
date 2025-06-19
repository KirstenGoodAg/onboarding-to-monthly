
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Download, FileText, TrendingUp, DollarSign, Calculator } from "lucide-react";

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  // Generate months array
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Generate years array (current year and 5 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  const handleDownload = (reportType: string) => {
    const monthName = months.find(m => m.value === selectedMonth)?.label || "Current";
    const fileName = `${reportType}_${monthName}_${selectedYear}.pdf`;
    
    // Mock download - in a real app, this would call an API
    console.log(`Downloading ${fileName}`);
    
    // Create a mock blob and download
    const content = `${reportType} for ${monthName} ${selectedYear}\n\nThis is a mock report. In a real application, this would contain actual financial data.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reports = [
    {
      id: "balance",
      title: "Balance Statement",
      description: "View your assets, liabilities, and equity at a specific point in time",
      icon: Calculator,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "cashflow",
      title: "Cash Flow Statement", 
      description: "Track cash inflows and outflows from operations, investing, and financing",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "pnl",
      title: "Profit and Loss Statement",
      description: "Review your revenues, expenses, and net income over a period",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
      <div className="flex flex-1 w-full justify-center items-start">
        <div className="w-full max-w-6xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Financial Reports</h1>
            <p className="text-gray-600">
              Download your financial statements for any month. Select a time period and choose the report you need.
            </p>
          </div>

          {/* Date Selection */}
          <Card className="mb-8 border-2 border-green-200 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <FileText className="h-5 w-5" />
                Select Report Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className={`${report.bgColor} rounded-t-lg`}>
                  <CardTitle className={`flex items-center gap-3 ${report.color}`}>
                    <report.icon className="h-6 w-6" />
                    {report.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {report.description}
                  </p>
                  <Button 
                    onClick={() => handleDownload(report.title)}
                    className="w-full flex items-center gap-2"
                    disabled={!selectedMonth}
                  >
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                  {!selectedMonth && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Select a month to download
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="mt-8 bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">About Your Reports</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Reports are generated based on your categorized transactions</li>
                    <li>• Balance statements show your financial position at month-end</li>
                    <li>• Cash flow statements track money movement during the period</li>
                    <li>• P&L statements summarize income and expenses for the month</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
