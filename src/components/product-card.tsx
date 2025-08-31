"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductData } from "@/app/actions";
import EcoSummary from "./eco-summary";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface ProductCardProps {
  product: ProductData;
  onClear: () => void;
}

const getVerdict = (grade?: string) => {
  const lowerGrade = grade?.toLowerCase().replace("+", "-plus");
  switch (lowerGrade) {
    case "a":
    case "a-plus":
      return { verdict: "Eco-Friendly", variant: "default" as const };
    case "b":
    case "c":
      return { verdict: "Neutral", variant: "accent" as const };
    case "d":
    case "e":
    case "f":
      return { verdict: "Not Eco-Friendly", variant: "destructive" as const };
    default:
      return { verdict: "Unknown", variant: "secondary" as const };
  }
};

const badgeVariantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  accent: "bg-accent text-accent-foreground border-transparent",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

export default function ProductCard({ product, onClear }: ProductCardProps) {
  const { verdict, variant } = getVerdict(product.ecoScoreGrade);

  return (
    <Card className="w-full max-w-md overflow-hidden text-center">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full bg-muted">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint="product image"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="p-6">
          <CardTitle className="text-2xl font-headline">{product.name}</CardTitle>
          <CardDescription className="mt-2 flex items-center justify-center gap-2">
            <span>Eco-Score:</span>
            <Badge
              className={cn(badgeVariantClasses[variant])}
            >
              {product.ecoScoreGrade?.toUpperCase() || verdict}
            </Badge>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 pt-0">
        <EcoSummary summary={product.aiSummary} ecoScoreGrade={product.ecoScoreGrade} />
      </CardContent>
      <CardFooter className="bg-muted/50 p-6">
        <Button className="w-full" variant="outline" onClick={onClear}>
          Scan Another Product
        </Button>
      </CardFooter>
    </Card>
  );
}
