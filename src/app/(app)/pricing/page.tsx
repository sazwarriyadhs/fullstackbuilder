import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

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
    price: "$25",
    frequency: "/month",
    description: "For professionals and small teams.",
    features: [
      "All features in Free",
      "Online Database Connection",
      "Design Download/Export",
      "Priority Support",
      "Team Collaboration (up to 5 users)",
    ],
    cta: "Upgrade to Pro",
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
              <Button className="w-full" variant={tier.popular ? "default" : "outline"}>{tier.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
