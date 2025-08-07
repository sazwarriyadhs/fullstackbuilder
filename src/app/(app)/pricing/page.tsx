"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import Image from "next/image";
import QRCodeComponent from "@/components/QRCodeComponent";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    name: "Free",
    price: "$0",
    frequency: "/month",
    description: "For individuals and hobby projects.",
    features: [
      "Access to Template Gallery",
      "Visual Builder",
      "Local Database Connection",
      "JSON Export",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "Rp 25.000",
    frequency: "/bulan",
    description: "For professionals and small teams.",
    features: [
      "All features in Free",
      "Online Database Connection",
      "Design Download/Export",
      "Priority Support",
      "Team Collaboration (up to 5 users)",
      "Unlimited Users",
      "Dedicated Support & Onboarding",
      "Advanced Security & SSO",
      "Custom Integrations",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    frequency: "",
    description: "For large organizations.",
    features: [
      "All features in Pro",
      "Unlimited Users",
      "Dedicated Support & Onboarding",
      "Advanced Security & SSO",
      "Custom Integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const ewallets = [
    { name: 'GoPay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/308px-Gopay_logo.svg.png?20210531070158', alt: 'GoPay Logo', hint: 'gopay logo' },
    { name: 'OVO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/1920px-Logo_ovo_purple.svg.png', alt: 'OVO Logo', hint: 'ovo logo' },
    { name: 'ShopeePay', logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdnDdBqILuWW0ZrKVSmb6b0geMqz04nbVGEjMGVkUaTtT085faQTXAk3PdFDl7Nkd462NIeWFokuwg9xQ_mYKXHp6IXGb7jROTrQX26bbrL8M_aFRWZV3bRDJKmEqTFuqRua6MqWHJinE/s320-rw/ShopeePay+Logo+-+Free+Vector+Download+PNG.webp', alt: 'ShopeePay Logo', hint: 'shopeepay logo' },
    { name: 'DANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Dana_logo.png', alt: 'DANA Logo', hint: 'dana logo' },
];

export default function PricingPage() {
  const { toast } = useToast()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Find the right plan for you</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Start for free, then upgrade to a paid plan for more features.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}>
            <CardHeader className="p-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                {tier.popular && <div className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Popular</div>}
              </div>
              <p className="mt-4">
                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                <span className="text-base font-medium text-muted-foreground">{tier.frequency}</span>
              </p>
              <CardDescription className="mt-2">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 px-6 pb-6">
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-500 mr-3 mt-1" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                   <Button className="w-full" variant={tier.name === 'Pro' ? "default" : "outline"} disabled={tier.name !== 'Pro'}>{tier.cta}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Pembayaran Paket Pro</DialogTitle>
                    <DialogDescription>
                      Pilih metode pembayaran e-wallet Anda.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                    {ewallets.map((wallet) => (
                      <Dialog key={wallet.name}>
                        <DialogTrigger asChild>
                          <button className="flex items-center justify-center p-4 bg-muted/50 rounded-lg transition-transform hover:scale-105 h-24">
                            <Image src={wallet.logo} alt={wallet.alt} width={100} height={40} objectFit="contain" data-ai-hint={wallet.hint} />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Pembayaran dengan {wallet.name}</DialogTitle>
                            <DialogDescription>Pindai kode QR di bawah untuk menyelesaikan pembayaran Anda.</DialogDescription>
                          </DialogHeader>
                          <QRCodeComponent />
                          <DialogFooter>
                            <Button 
                              className="w-full"
                              onClick={() => {
                                toast({
                                  title: "Pembayaran Berhasil",
                                  description: "Paket Pro Anda telah aktif.",
                                });
                              }}
                            >
                              Konfirmasi Pembayaran
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
