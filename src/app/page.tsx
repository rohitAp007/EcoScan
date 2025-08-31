"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ScanLine } from "lucide-react";
import BarcodeScanner from "@/components/barcode-scanner";
import { getProductData, type ProductData } from "@/app/actions";
import ProductCard from "@/components/product-card";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";

export default function Home() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const { toast } = useToast();

  const handleFetchProduct = async (scannedBarcode: string) => {
    if (!scannedBarcode) return;
    setLoading(true);
    setProduct(null);
    try {
      const { product: productData, error } = await getProductData(
        scannedBarcode
      );
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } else if (productData) {
        setProduct(productData);
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
      setBarcode("");
    }
  };

  const handleManualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFetchProduct(barcode);
  };

  const handleScanSuccess = (scannedBarcode: string) => {
    setShowScanner(false);
    handleFetchProduct(scannedBarcode);
  };

  const clearSearch = () => {
    setProduct(null);
    setBarcode("");
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <Icons.logo className="h-10 w-10 text-primary" />
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            EcoScan
          </h1>
        </div>
        <p className="text-muted-foreground">Your Living Companion</p>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : product ? (
          <ProductCard product={product} onClear={clearSearch} />
        ) : (
          <div className="w-full space-y-4 rounded-lg bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Scan a barcode or enter it manually to check a product&apos;s eco-friendliness.
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => setShowScanner(true)}
            >
              <ScanLine className="mr-2 h-5 w-5" />
              Scan Barcode
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex-grow border-t"></div>
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-grow border-t"></div>
            </div>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter barcode..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="h-12 text-base"
              />
              <Button type="submit" size="lg" disabled={!barcode}>
                Search
              </Button>
            </form>
          </div>
        )}
      </div>

      <footer className="mt-auto pt-8 text-center text-xs text-muted-foreground">
        <p>No login needed • Privacy-first (camera only for scanning)</p>
      </footer>

      {showScanner && (
        <BarcodeScanner
          onScan={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}
    </main>
  );
}
