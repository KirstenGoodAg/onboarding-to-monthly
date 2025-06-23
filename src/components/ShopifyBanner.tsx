
import { Alert, AlertDescription } from "@/components/ui/alert";

const ShopifyBanner = () => {
  return (
    <Alert className="bg-yellow-50 border-yellow-200 mb-6">
      <AlertDescription className="text-yellow-800 font-medium text-center">
        Bank Feed Error! Please log into your{" "}
        <a 
          href="https://www.xero.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-yellow-900 font-semibold"
        >
          Xero
        </a>{" "}
        account to reconnect your bank feeds.
      </AlertDescription>
    </Alert>
  );
};

export default ShopifyBanner;
