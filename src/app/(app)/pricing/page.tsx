import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";

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
    { name: 'GoPay', logo: '/images/gopay.png', alt: 'GoPay Logo', hint: 'gopay logo' },
    { name: 'OVO', logo: '/images/ovo.png', alt: 'OVO Logo', hint: 'ovo logo' },
    { name: 'ShopeePay', logo: '/images/shopeepay.png', alt: 'ShopeePay Logo', hint: 'shopeepay logo' },
    { name: 'DANA', logo: '/images/dana.png', alt: 'DANA Logo', hint: 'dana logo' },
];

export default function PricingPage() {
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
              <Button className="w-full" variant={tier.name === 'Pro' ? "default" : "outline"} disabled={tier.name === 'Pro'}>{tier.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

       <Card className="mt-12">
        <CardHeader>
          <CardTitle>Pembayaran E-Wallet</CardTitle>
          <CardDescription>Pindai kode QR untuk melakukan pembayaran dengan e-wallet pilihan Anda.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
                <Image src="/images/qris.png" alt="QR Code" width={200} height={200} className="rounded-lg" data-ai-hint="payment qris" />
                <p className="text-center mt-2 text-sm font-medium">087864530047</p>
                <p className="text-center text-xs text-muted-foreground">a.n Azwar Riyadh Subarkah</p>
            </div>
          <div className="flex-1">
            <p className="mb-4 text-muted-foreground">Kami menerima pembayaran melalui:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ewallets.map((wallet) => (
                <div key={wallet.name} className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                  <Image src={wallet.logo} alt={wallet.alt} width={80} height={25} objectFit="contain" data-ai-hint={wallet.hint} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
