// components/QRCodeComponent.tsx
'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Skeleton } from './ui/skeleton';

export default function QRCodeComponent() {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // This is a simple text QR, not a full QRIS standard payload.
        // For a real application, a proper QRIS generator would be needed.
        const qrData = 'Pembayaran untuk: Azwar Riyadh Subarkah\nNo: 087864530047';
        const url = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 256,
        });
        setQrUrl(url);
      } catch (err) {
        console.error("Failed to generate QR Code:", err);
      } finally {
        setLoading(false);
      }
    };

    generateQRCode();
  }, []);

  if (loading) {
    return (
        <div className="flex flex-col items-center gap-4 py-4">
            <Skeleton className="w-[250px] h-[250px] rounded-lg" />
            <div className="text-center space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
    )
  }

  if (!qrUrl) {
    return <p className="text-destructive text-center">Gagal memuat Kode QR.</p>
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {qrUrl && <img src={qrUrl} alt="QR Code Pembayaran" width={250} height={250} className="rounded-lg" />}
      <div className="text-center">
        <p className="font-medium">087864530047</p>
        <p className="text-xs text-muted-foreground">a.n Azwar Riyadh Subarkah</p>
      </div>
    </div>
  );
}
