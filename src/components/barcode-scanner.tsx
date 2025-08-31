"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CameraOff, X } from "lucide-react";
import { Button } from "./ui/button";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

// Type assertion for BarcodeDetector as it may not be in default TS lib
declare global {
  interface Window {
    BarcodeDetector: any;
  }
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let detector: any;

    const startCamera = async () => {
      if (!("BarcodeDetector" in window)) {
        setError("Barcode Detector API is not supported in this browser.");
        return;
      }
      
      try {
        detector = new window.BarcodeDetector({
          formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
        });
      } catch (err) {
        setError("Failed to create Barcode Detector.");
        return;
      }

      if (
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function"
      ) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          setError(
            "Camera access was denied. Please enable camera permissions in your browser settings."
          );
        }
      } else {
        setError("Camera access is not supported by your browser.");
      }
    };

    startCamera();

    const intervalId = setInterval(async () => {
      if (videoRef.current && detector && videoRef.current.readyState === 4) {
        try {
          const barcodes = await detector.detect(videoRef.current);
          if (barcodes.length > 0) {
            clearInterval(intervalId);
            onScan(barcodes[0].rawValue);
          }
        } catch (err) {
          // Detection can sometimes fail, but we don't want to show an error for every frame.
        }
      }
    }, 200);

    return () => {
      clearInterval(intervalId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onScan]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Scan Barcode</DialogTitle>
          <DialogDescription>
            Point your camera at a product&apos;s barcode.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video w-full bg-muted">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1/2 w-5/6 rounded-lg border-2 border-white/50" />
          </div>
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
              <Alert variant="destructive">
                <CameraOff className="h-4 w-4" />
                <AlertTitle>Scanner Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
        <div className="p-6 pt-0">
           <Button variant="outline" className="w-full" onClick={onClose}>Cancel</Button>
        </div>
         <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanner;
