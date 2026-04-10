import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Globe,
  LoaderCircle,
  Mail,
  MessageCircle,
  Shield,
  Smartphone,
  Star,
  Tv,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = 1 | 2 | 3 | 4 | 5;

type RegionGroup = {
  continent: string;
  countries: string[];
};

const LINKS = {
  checkout: "https://placeholder.example/checkout",
  installationGuide: "https://placeholder.example/installation-guide",
  privacyTerms: "https://placeholder.example/privacy-terms",
};

const faqQuestion = "How to get a free IPTV trial for World Cup 2026?";

const sportsCategories = [
  "US Major Leagues",
  "World Football",
  "International & Commonwealth",
  "Pro Tour & Individual",
  "Motorsport",
];

const regions: RegionGroup[] = [
  { continent: "Americas", countries: ["🇨🇦 Canada", "🇺🇸 USA", "🇲🇽 Mexico", "🇧🇷 Brazil", "🇻🇪 Venezuela", "🇸🇷 Suriname"] },
  {
    continent: "Europe",
    countries: [
      "🇬🇧 UK",
      "🇮🇪 Ireland",
      "🇩🇪 Germany",
      "🇦🇹 Austria",
      "🇳🇱 Netherlands",
      "🇧🇪 Belgium",
      "🇮🇹 Italy",
      "🇫🇷 France",
      "🇪🇸 Spain",
      "🇵🇹 Portugal",
      "🇨🇭 Switzerland",
      "🇵🇱 Poland",
      "🇬🇷 Greece",
      "🇨🇾 Cyprus",
      "🇸🇪 Sweden",
      "🇩🇰 Denmark",
      "🇳🇴 Norway",
      "🇫🇮 Finland",
      "🇮🇸 Iceland",
      "🇭🇺 Hungary",
      "🇷🇴 Romania",
      "🇽🇰 Kosovo",
      "🇷🇺 Russia",
      "🇺🇦 Ukraine",
      "🇨🇿 Czech Republic",
      "🇲🇰 North Macedonia",
      "🇷🇸 Serbia",
      "🇧🇦 Bosnia",
      "🇭🇷 Croatia",
      "🇸🇮 Slovenia",
      "🇲🇪 Montenegro",
      "🇧🇬 Bulgaria",
      "🇪🇪 Estonia",
      "🇱🇹 Lithuania",
    ],
  },
  {
    continent: "Asia",
    countries: [
      "🇮🇱 Israel",
      "🇹🇷 Turkey",
      "🇮🇷 Iran",
      "🇦🇫 Afghanistan",
      "🇵🇰 Pakistan",
      "🇮🇳 India",
      "🇯🇵 Japan",
      "🇹🇼 Taiwan",
      "🇸🇬 Singapore",
      "🇺🇿 Uzbekistan",
      "🇰🇿 Kazakhstan",
      "🇬🇪 Georgia",
      "🇦🇿 Azerbaijan",
      "🇦🇲 Armenia",
      "🇨🇳 China",
      "🇻🇳 Vietnam",
      "🇲🇾 Malaysia",
      "🇮🇩 Indonesia",
      "🇰🇷 South Korea",
      "🇹🇭 Thailand",
      "🇵🇭 Philippines",
    ],
  },
  { continent: "Africa", countries: ["🇨🇲 Cameroon", "🇲🇦 Morocco", "🇪🇬 Egypt", "🇹🇳 Tunisia", "🇩🇿 Algeria", "🇱🇾 Libya", "🇸🇩 Sudan"] },
  { continent: "Oceania", countries: ["🇦🇺 Australia", "🇳🇿 New Zealand", "🇲🇹 Malta", "🇱🇨 Saint Lucia"] },
  { continent: "Middle East", countries: ["🇱🇧 Lebanon", "🇸🇾 Syria", "🇮🇶 Iraq", "🇸🇦 Saudi Arabia", "🇰🇼 Kuwait", "🇶🇦 Qatar", "🇴🇲 Oman", "🇧🇭 Bahrain", "🇯🇴 Jordan", "🇵🇸 Palestine", "🇾🇪 Yemen", "🇦🇪 Emirates"] },
];

const deviceGroups = [
  { title: "Smartphones", devices: ["Android", "iPhone", "Huawei"], icon: Smartphone },
  { title: "Tablets", devices: ["iPad", "Android Tablet"], icon: Smartphone },
  { title: "Computers", devices: ["PC", "Laptop", "MacBook"], icon: Globe },
  { title: "TV & Streaming", devices: ["Smart TV", "FireStick", "Android Box", "MAG Box"], icon: Tv },
];

const contactApps = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "telegram", label: "Telegram", icon: Users },
  { id: "imessage", label: "iMessage", icon: Mail },
] as const;

const countryCodes = [
  { label: "🇺🇸 +1", value: "+1" },
  { label: "🇬🇧 +44", value: "+44" },
  { label: "🇫🇷 +33", value: "+33" },
  { label: "🇩🇪 +49", value: "+49" },
  { label: "🇮🇹 +39", value: "+39" },
  { label: "🇪🇸 +34", value: "+34" },
  { label: "🇲🇦 +212", value: "+212" },
  { label: "🇮🇳 +91", value: "+91" },
];

const Index = () => {
  const [step, setStep] = useState<Step>(1);
  const [selectedCountry, setSelectedCountry] = useState("🇺🇸 USA");
  const [selectedDevice, setSelectedDevice] = useState("Android");
  const [contactMethod, setContactMethod] = useState<(typeof contactApps)[number]["id"]>("whatsapp");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [channelsFound, setChannelsFound] = useState(0);
  const stepTransitionLockRef = useRef(false);

  const fullPhone = `${phoneCode}${phone.replace(/\s+/g, "")}`;
  const phoneValid = /^\+[1-9]\d{7,14}$/.test(fullPhone);

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
    const message = encodeURIComponent(
      `LUX FREE IPTV Priority Access ($2): ${selectedCountry}, ${selectedDevice}, ${fullPhone}. World Cup 2026 with Instant Delivery.`,
    );
    if (contactMethod === "whatsapp") return `https://wa.me/?text=${message}`;
    if (contactMethod === "telegram") return `https://t.me/share/url?url=${encodeURIComponent(LINKS.checkout)}&text=${message}`;
    return LINKS.installationGuide;
  }, [contactMethod, fullPhone, selectedCountry, selectedDevice]);

  const schemaGraph = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          name: "LUX FREE IPTV Free Trial Wizard",
          applicationCategory: "EntertainmentApplication",
          operatingSystem: "Android, iOS, Smart TV, FireStick, PC",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "LUX FREE IPTV free trial for World Cup 2026 with 4K Anti-freeze Technology and Instant Delivery",
          },
        },
        {
          "@type": "SpecialOffer",
          name: "PRIORITY ACCESS",
          price: "2",
          priceCurrency: "USD",
          category: "Skip the Line",
          description: "Priority pass for faster activation and Instant Delivery",
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: faqQuestion,
              acceptedAnswer: {
                "@type": "Answer",
                text: "Use the LUX FREE IPTV Free Trial Wizard: select region, device, messaging app, and phone number to unlock your World Cup 2026 trial with Instant Delivery.",
              },
            },
          ],
        },
      ],
    }),
    [],
  );

  const schemaJson = useMemo(() => JSON.stringify(schemaGraph), [schemaGraph]);

  const goToStep = (targetStep: Step) => {
    if (stepTransitionLockRef.current) return;
    stepTransitionLockRef.current = true;

    setStep((currentStep) => {
      const distance = Math.abs(targetStep - currentStep);
      return distance <= 1 ? targetStep : currentStep;
    });

    window.setTimeout(() => {
      stepTransitionLockRef.current = false;
    }, 180);
  };

  const handlePhoneCodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPhoneCode(event.target.value);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleMessagingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneValid) goToStep(4);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 md:px-8" aria-label="LUX FREE IPTV Free Trial Wizard">
      <div className="pointer-events-none absolute inset-0 star-grid" />

      <section className="mx-auto max-w-6xl space-y-6">
        <header className="glass-panel hero-nebula rounded-2xl p-6 md:p-10" aria-label="Hero section">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">LUX FREE IPTV</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">FREE TRIAL — World Cup 2026 Ready</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            4K Anti-freeze Technology + Instant Delivery for World Cup 2026 streaming.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1"><Star className="h-4 w-4 text-primary" /> Trustpilot 4.9/5</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1"><BadgeCheck className="h-4 w-4 text-success" /> 30 Days Money-Back Guarantee</span>
          </div>
        </header>

        <article className="glass-panel rounded-2xl p-5 md:p-7" aria-label="Five step trial wizard">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Step {step} of 5</h2>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Premium Access</span>
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <h3 className="text-lg font-medium">Select your streaming regions</h3>

              <section aria-label="Sports Categories" className="space-y-3">
                <p className="text-sm font-semibold text-primary">🏆 SPORTS CATEGORIES</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  {sportsCategories.map((item) => (
                    <div key={item} className="rounded-xl border border-border bg-surface-glass/50 p-3 text-sm">{item}</div>
                  ))}
                </div>
              </section>

              <section aria-label="All countries" className="space-y-3">
                <p className="text-sm font-semibold">🌐 ALL COUNTRIES <span className="rounded-full border border-primary px-2 py-0.5 text-primary">84+</span></p>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {regions.map((group) => (
                    <div key={group.continent} className="rounded-xl border border-border bg-surface-glass/50 p-3">
                      <p className="mb-2 text-sm font-medium text-primary">📍 {group.continent}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.countries.map((country) => (
                          <button
                            key={`${group.continent}-${country}`}
                            type="button"
                            onClick={() => setSelectedCountry(country)}
                            className={`rounded-md border px-2.5 py-1 text-xs transition ${
                              selectedCountry === country
                                ? "border-primary bg-primary/20 text-foreground"
                                : "border-border bg-background/40 text-muted-foreground hover:border-primary/60"
                            }`}
                            aria-label={`Select country ${country}`}
                            title={country}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex gap-3">
                <Button variant="outline" className="w-full" disabled>← Back</Button>
                <Button variant="wizard" className="w-full" onClick={() => goToStep(2)}>Continue to Device <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <h3 className="text-lg font-medium">What will you watch on?</h3>
              <div className="grid gap-4 lg:grid-cols-2">
                {deviceGroups.map(({ title, devices, icon: Icon }) => (
                  <section key={title} className="rounded-xl border border-border bg-surface-glass/50 p-4" aria-label={title}>
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><Icon className="h-4 w-4" /> {title.toUpperCase()}</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {devices.map((device) => (
                        <button
                          key={`${title}-${device}`}
                          type="button"
                          onClick={() => setSelectedDevice(device)}
                          className={`rounded-lg border p-3 text-left text-sm transition ${
                            selectedDevice === device
                              ? "border-primary bg-primary/15 glow-accent"
                              : "border-border bg-background/30 hover:border-primary/60"
                          }`}
                          aria-label={`Select device ${device}`}
                        >
                          {device}
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="w-full" onClick={() => goToStep(1)}>← Back</Button>
                <Button variant="wizard" className="w-full" onClick={() => goToStep(3)}>Continue <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
              onSubmit={handleMessagingSubmit}
            >
              <h3 className="text-lg font-medium">Which messaging apps do you use?</h3>
              <p className="text-sm text-primary">SELECT MESSAGING APPS</p>

              <div className="grid gap-3 sm:grid-cols-3">
                {contactApps.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setContactMethod(id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      contactMethod === id ? "border-primary bg-primary/15 glow-accent" : "border-border bg-surface-glass/50"
                    }`}
                    aria-label={`Select ${label}`}
                  >
                    <Icon className="mb-2 h-5 w-5 text-primary" />
                    <p className="font-medium">{label}</p>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-muted-foreground" htmlFor="phone-input">Enter your phone number to receive trial details</label>
                <div className="flex gap-2">
                  <select
                    aria-label="Country code"
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={phoneCode}
                    onChange={handlePhoneCodeChange}
                  >
                    {countryCodes.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                  <Input
                    id="phone-input"
                    type="tel"
                    placeholder="6768789897"
                    value={phone}
                    onChange={handlePhoneChange}
                    aria-label="International phone number"
                  />
                </div>
                {!phoneValid && phone.length > 0 && <p className="text-sm text-destructive">Please enter a valid number format.</p>}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="outline" className="w-full" onClick={() => goToStep(2)}>← Back</Button>
                <Button type="submit" variant="wizard" className="w-full" disabled={!phoneValid}>Continue <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </motion.form>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-center">
              <h3 className="text-xl font-semibold">Preparing your trial...</h3>
              <LoaderCircle className="mx-auto h-11 w-11 animate-spin text-primary" />
              <p className="text-5xl font-semibold text-primary" aria-live="polite">{channelsFound}</p>
              <p className="text-lg font-medium">CHANNELS FOUND</p>
              <p className="text-muted-foreground">Generating your <span className="font-medium text-primary">USA</span> trial</p>
              <p className="text-sm text-muted-foreground">📶 Scanning available channels...</p>
              <div className="flex gap-3">
                <Button variant="outline" className="w-full" onClick={() => goToStep(3)}>← Back</Button>
                <Button variant="wizard" className="w-full" onClick={() => goToStep(5)}>Continue <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <h3 className="text-xl font-semibold">Choose your access</h3>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <section className="rounded-xl border border-border bg-muted/30 p-5" aria-label="Standard queue">
                  <p className="text-sm text-muted-foreground">FREE</p>
                  <h4 className="text-2xl font-semibold">Standard Queue</h4>
                  <p className="mt-1 text-lg">$0</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>👥 #84 in queue</li>
                    <li>⏱ Standard Queue -8.0 hrs wait</li>
                  </ul>
                  <Button variant="outline" className="mt-4 w-full">Continue Free — I Can Wait →</Button>
                </section>

                <section className="rounded-xl border border-primary bg-primary/10 p-5 glow-accent" aria-label="Priority access">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-primary">⚡ PRIORITY ACCESS</p>
                    <span className="rounded-full border border-primary px-2 py-1 text-xs text-primary">👑 MOST POPULAR</span>
                  </div>
                  <h4 className="text-2xl font-semibold">Skip the Line</h4>
                  <p className="mt-1 text-4xl font-bold text-primary">$2</p>
                  <div className="mt-4 rounded-lg border border-border bg-background/30 p-3 text-sm">
                    <p className="font-medium">⏰ 24-HOUR PASS</p>
                    <p className="text-muted-foreground">Only 5 people ahead of you • ⏱ 30 min delivery</p>
                  </div>
                  <a href={priorityLink} target="_blank" rel="noreferrer" aria-label="Get priority access" className="block">
                    <Button variant="priority" className="mt-4 w-full">⚡ Get Priority Access — $2 →</Button>
                  </a>
                </section>
              </div>

              <div className="rounded-xl border border-border bg-surface-glass/50 p-4 text-sm text-muted-foreground">
                <p className="flex flex-wrap items-center gap-3"><Shield className="h-4 w-4 text-success" /> Secure Payment <CheckCircle2 className="h-4 w-4 text-primary" /> Instant Setup <BadgeCheck className="h-4 w-4 text-success" /> 30 Days Money-Back Guarantee</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <a href={LINKS.installationGuide} target="_blank" rel="noreferrer" className="text-primary hover:underline">Installation Guide</a>
                <a href={LINKS.privacyTerms} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground hover:underline">Privacy & Terms</a>
                <a href={LINKS.checkout} target="_blank" rel="noreferrer" className="text-primary hover:underline">Checkout</a>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" className="w-full" onClick={() => goToStep(4)}>← Back</Button>
                <a href={LINKS.checkout} target="_blank" rel="noreferrer" className="w-full">
                  <Button variant="wizard" className="w-full">Continue to Checkout <ArrowRight className="h-4 w-4" /></Button>
                </a>
              </div>
            </motion.div>
          )}
        </article>

        <section className="glass-panel rounded-2xl p-5" aria-label="Frequently asked question">
          <h2 className="text-lg font-semibold">FAQ</h2>
          <p className="mt-3 font-medium">{faqQuestion}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Select region + device + messaging app, add your number, then choose standard queue or priority access to unlock World Cup 2026 trial with Instant Delivery.
          </p>
        </section>
      </section>

      <script id="lux-free-iptv-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
    </main>
  );
};

export default Index;