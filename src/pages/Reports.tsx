
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Download, FileText, TrendingUp, DollarSign, Calculator, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Reports = () => {
  const [balanceSheetDate, setBalanceSheetDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const handleDownload = (reportType: string) => {
    let fileName = "";
    
    if (reportType === "Balance Sheet" && balanceSheetDate) {
      fileName = `${reportType}_${format(balanceSheetDate, "yyyy-MM-dd")}.pdf`;
    } else if ((reportType === "Cash Flow Statement" || reportType === "Profit and Loss Statement") && dateRange.from && dateRange.to) {
      fileName = `${reportType}_${format(dateRange.from, "yyyy-MM-dd")}_to_${format(dateRange.to, "yyyy-MM-dd")}.pdf`;
    } else {
      fileName = `${reportType}_report.pdf`;
    }
    
    // Mock download - in a real app, this would call an API
    console.log(`Downloading ${fileName}`);
    
    // Create a mock blob and download
    const content = `${reportType} Report\n\nThis is a mock report. In a real application, this would contain actual financial data.`;
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
      title: "Balance Sheet",
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
              Download your financial statements. Select dates and choose the report you need.
            </p>
          </div>

          {/* Date Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Single Date Picker for Balance Sheet */}
            <Card className="border-2 border-blue-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <CalendarIcon className="h-5 w-5" />
                  Balance Sheet Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !balanceSheetDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {balanceSheetDate ? format(balanceSheetDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={balanceSheetDate}
                      onSelect={setBalanceSheetDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Date Range Picker for Cash Flow and P&L */}
            <Card className="col-span-1 md:col-span-1 lg:col-span-2 border-2 border-green-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CalendarIcon className="h-5 w-5" />
                  Report Period Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "Start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                          disabled={(date) => dateRange.from ? date < dateRange.from : false}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => {
              const isBalanceSheet = report.id === "balance";
              const isDateRequired = isBalanceSheet ? !balanceSheetDate : (!dateRange.from || !dateRange.to);
              
              return (
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
                      disabled={isDateRequired}
                    >
                      <Download className="h-4 w-4" />
                      Download Report
                    </Button>
                    {isDateRequired && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {isBalanceSheet ? "Select a date to download" : "Select date range to download"}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
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
                    <li>• Balance sheets show your financial position at a specific date</li>
                    <li>• Cash flow statements track money movement during the selected period</li>
                    <li>• P&L statements summarize income and expenses for the selected period</li>
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
