
import { Alert, AlertDescription } from "@/components/ui/alert";

const ShopifyBanner = () => {
  return (
    <Alert className="bg-yellow-50 border-yellow-200 mb-6">
      <AlertDescription className="text-yellow-800 font-medium text-center">
        Please connect your Shopify account to get accurate financial analysis!
      </AlertDescription>
    </Alert>
  );
};

export default ShopifyBanner;
