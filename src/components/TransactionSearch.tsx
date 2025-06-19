
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, FileExport } from "lucide-react";

interface SearchFilters {
  searchTerm: string;
  category: string;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
}

interface TransactionSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onExport: () => void;
  categoryOptions: string[];
  resultsCount: number;
}

const TransactionSearch = ({
  filters,
  onFiltersChange,
  onExport,
  categoryOptions,
  resultsCount
}: TransactionSearchProps) => {
  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: "",
      category: "all",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: ""
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Transactions
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button onClick={onExport} className="flex items-center gap-2">
              <FileExport className="h-4 w-4" />
              Export Results ({resultsCount})
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Transaction Name
            </label>
            <Input
              placeholder="Search by transaction name..."
              value={filters.searchTerm}
              onChange={(e) => handleInputChange('searchTerm', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select value={filters.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                {categoryOptions.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="flex-1"
              />
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Range
            </label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min amount"
                value={filters.minAmount}
                onChange={(e) => handleInputChange('minAmount', e.target.value)}
                className="flex-1"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max amount"
                value={filters.maxAmount}
                onChange={(e) => handleInputChange('maxAmount', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionSearch;
