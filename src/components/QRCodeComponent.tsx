// components/QRCodeComponent.tsx
'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QRCodeComponent() {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = 'tel:087864530047\nNama: Azwar Riyadh Subarkah';
        const url = await QRCode.toDataURL(qrData);
        setQrUrl(url);
      } catch (err) {
        console.error(err);
      }
    };

    generateQRCode();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">QR Code Kontak</h2>
      {qrUrl && <img src={qrUrl} alt="QR Code Azwar Riyadh Subarkah" className="w-40 h-40" />}
      <p>087864530047<br />Azwar Riyadh Subarkah</p>
    </div>
  );
}
