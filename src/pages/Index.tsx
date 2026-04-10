import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Globe,
  LoaderCircle,
  Mail,
  MessageCircle,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Tv,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = 1 | 2 | 3 | 4;

type RegionGroup = {
  continent: string;
  countries: string[];
};

const regions: RegionGroup[] = [
  { continent: "Americas", countries: ["United States", "Canada", "Brazil", "Mexico", "Argentina"] },
  { continent: "Europe", countries: ["United Kingdom", "Germany", "France", "Italy", "Spain"] },
  { continent: "Asia", countries: ["India", "Japan", "South Korea", "Singapore", "Malaysia"] },
  { continent: "Africa", countries: ["South Africa", "Egypt", "Morocco", "Kenya", "Nigeria"] },
  { continent: "Oceania", countries: ["Australia", "New Zealand", "Fiji", "Papua New Guinea"] },
  { continent: "Middle East", countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain"] },
];

const devices = [
  { label: "Android", icon: Smartphone },
  { label: "iPhone", icon: Smartphone },
  { label: "PC", icon: Globe },
  { label: "Smart TV", icon: Tv },
  { label: "FireStick", icon: Sparkles },
  { label: "Tablet", icon: Smartphone },
];

const faqQuestion = "How to get a free IPTV trial for World Cup 2026?";

const Index = () => {
  const [step, setStep] = useState<Step>(1);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [selectedDevice, setSelectedDevice] = useState("Android");
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "telegram">("whatsapp");
  const [phone, setPhone] = useState("");
  const [channelsFound, setChannelsFound] = useState(0);

  const phoneValid = /^\+[1-9]\d{7,14}$/.test(phone.trim());

  useEffect(() => {
    if (step !== 4) return;
    let value = 0;
    const timer = window.setInterval(() => {
      value += 17;
      setChannelsFound(Math.min(value, 678));
      if (value >= 678) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, [step]);

  const priorityLink = useMemo(() => {
    const msg = encodeURIComponent(
      `Priority Access request ($2): ${selectedCountry}, ${selectedDevice}, ${phone}. Need instant free trial with 4K Anti-freeze Technology and Instant Email Delivery.`,
    );
    return contactMethod === "whatsapp" ? `https://wa.me/?text=${msg}` : `https://t.me/share/url?url=https://inlineiptv.example&text=${msg}`;
  }, [contactMethod, phone, selectedCountry, selectedDevice]);

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Inline IPTV Free Trial Wizard",
        applicationCategory: "EntertainmentApplication",
        operatingSystem: "Android, iOS, Smart TV, FireStick, PC",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free IPTV trial with 4K Anti-freeze Technology and Instant Email Delivery",
        },
      },
      {
        "@type": "SpecialOffer",
        name: "Priority Access",
        price: "2",
        priceCurrency: "USD",
        category: "Skip the Line",
        description: "Skip standard queue of 8.0 hours and activate trial priority.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: faqQuestion,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use the Inline IPTV Free Trial Wizard: pick your region and device, submit a valid international WhatsApp or Telegram number, then choose standard or priority activation to receive your World Cup 2026-ready trial instantly.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 md:px-8" aria-label="Inline IPTV Free Trial Wizard">
      <div className="pointer-events-none absolute inset-0 star-grid" />

      <section className="mx-auto max-w-6xl space-y-6">
        <header className="glass-panel hero-nebula rounded-2xl p-6 md:p-10" aria-label="Hero section">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground" title="Trust and speed features">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
              <Star className="h-4 w-4 text-primary" /> Trustpilot 4.9/5
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
              <BadgeCheck className="h-4 w-4 text-success" /> 30 Days Money-Back Guarantee
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
            Inline IPTV Free Trial Wizard — World Cup 2026 Ready
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Activate in minutes with 4K Anti-freeze Technology and Instant Email Delivery.
          </p>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]" aria-label="Wizard and queue details">
          <article className="glass-panel rounded-2xl p-5 md:p-7" title="Trial wizard form">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Step {step} of 4</h2>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Mobile-first secure flow</span>
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h3 className="text-lg font-medium">Select Your Region</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {regions.map((group) => (
                    <div key={group.continent} className="rounded-xl border border-border bg-surface-glass/50 p-3">
                      <p className="mb-2 text-sm font-medium text-primary">{group.continent}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.countries.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => setSelectedCountry(country)}
                            className={`rounded-md border px-2.5 py-1 text-xs transition ${
                              selectedCountry === country
                                ? "border-primary bg-primary/20 text-foreground"
                                : "border-border bg-background/40 text-muted-foreground hover:border-primary/60"
                            }`}
                            aria-label={`Select country ${country}`}
                            title={`Select ${country}`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="wizard" className="w-full" onClick={() => setStep(2)}>
                  Continue to Device <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h3 className="text-lg font-medium">Choose Your Device</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {devices.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSelectedDevice(label)}
                      className={`rounded-xl border p-4 text-left transition ${
                        selectedDevice === label
                          ? "border-primary bg-primary/15 glow-accent"
                          : "border-border bg-surface-glass/50 hover:border-primary/60"
                      }`}
                      aria-label={`Select device ${label}`}
                      title={`Device ${label}`}
                    >
                      <Icon className="mb-2 h-5 w-5 text-primary" />
                      <p className="font-medium">{label}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="wizard" className="w-full" onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                if (phoneValid) setStep(4);
              }}>
                <h3 className="text-lg font-medium">Contact & Delivery</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setContactMethod("whatsapp")}
                    className={`rounded-xl border p-4 text-left transition ${contactMethod === "whatsapp" ? "border-primary bg-primary/15" : "border-border bg-surface-glass/50"}`}
                    aria-label="Use WhatsApp"
                  >
                    <MessageCircle className="mb-2 h-5 w-5 text-primary" />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod("telegram")}
                    className={`rounded-xl border p-4 text-left transition ${contactMethod === "telegram" ? "border-primary bg-primary/15" : "border-border bg-surface-glass/50"}`}
                    aria-label="Use Telegram"
                  >
                    <Users className="mb-2 h-5 w-5 text-primary" />
                    Telegram
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground" htmlFor="phone-input">
                    International phone number (E.164 format)
                  </label>
                  <Input
                    id="phone-input"
                    type="tel"
                    placeholder="+14155552671"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-label="International phone number"
                    title="Enter valid international number"
                  />
                  {!phoneValid && phone.length > 0 && (
                    <p className="mt-2 text-sm text-destructive">Please enter a valid international number, e.g. +14155552671.</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="w-full" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" variant="wizard" className="w-full" disabled={!phoneValid}>
                    Generate Free Trial
                  </Button>
                </div>
              </motion.form>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-center">
                <LoaderCircle className="mx-auto h-11 w-11 animate-spin text-primary" />
                <h3 className="text-2xl font-semibold">Generating USA Trial</h3>
                <p className="text-muted-foreground">Provisioning your {selectedDevice} package for {selectedCountry}...</p>
                <p className="animate-counter-rise text-4xl font-semibold text-primary" aria-live="polite" title="Channels found">
                  {channelsFound} Channels Found
                </p>
                <a href={priorityLink} target="_blank" rel="noreferrer" aria-label="Open contact app with priority request">
                  <Button variant="priority" className="w-full">Open {contactMethod === "whatsapp" ? "WhatsApp" : "Telegram"} & Confirm Trial</Button>
                </a>
              </motion.div>
            )}
          </article>

          <aside className="space-y-5" aria-label="Queue and trust blocks">
            <section className="glass-panel rounded-2xl p-5" title="Queue options">
              <h2 className="text-lg font-semibold">Queue Status</h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Standard Queue</p>
                  <p className="text-xl font-semibold">8.0 hrs wait</p>
                </div>
                <div className="rounded-xl border border-primary bg-primary/10 p-4 glow-accent">
                  <p className="text-sm text-primary">Priority Access</p>
                  <p className="text-xl font-semibold">$2 — Skip the Line</p>
                </div>
              </div>
            </section>

            <section className="glass-panel rounded-2xl p-5" title="Trust signals">
              <h2 className="text-lg font-semibold">Why Users Trust Inline IPTV</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-success" /> 30 Days Money-Back Guarantee</li>
                <li className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Trustpilot-rated onboarding support</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> Instant Email Delivery after activation</li>
              </ul>
            </section>

            <section className="glass-panel rounded-2xl p-5" aria-label="Frequently asked question">
              <h2 className="text-lg font-semibold">FAQ</h2>
              <p className="mt-3 font-medium">{faqQuestion}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Select region + device, add a valid WhatsApp/Telegram number, then choose standard or priority route to unlock an optimized trial for World Cup 2026 streaming.
              </p>
            </section>
          </aside>
        </section>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
    </main>
  );
};

export default Index;
