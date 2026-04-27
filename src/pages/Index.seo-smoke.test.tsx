import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import Index from "./Index";

type SchemaNode = {
  "@type"?: string;
  mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
};

const getJsonLdScripts = () => document.querySelectorAll('script#lux-free-iptv-schema[type="application/ld+json"]');

const readFaqFromSchema = () => {
  const scripts = getJsonLdScripts();
  expect(scripts).toHaveLength(1);

  const payload = scripts[0].textContent;
  expect(payload).toBeTruthy();

  const parsed = JSON.parse(payload ?? "{}") as { "@graph"?: SchemaNode[] };
  const faq = parsed["@graph"]?.find((node) => node["@type"] === "FAQPage");
  expect(faq?.mainEntity?.length).toBeGreaterThan(0);

  return faq?.mainEntity ?? [];
};

const expectFaqToMatchSelection = (country: string, device: string) => {
  const entries = readFaqFromSchema();
  const allTexts = entries.map((entry) => `${entry.name ?? ""} ${entry.acceptedAnswer?.text ?? ""}`).join(" ");

  expect(allTexts).toContain(country);
  expect(allTexts).toContain(device);
};

describe("Index SEO smoke test", () => {
  beforeEach(() => {
    vi.spyOn(window, "setInterval").mockReturnValue(0 as unknown as ReturnType<typeof window.setInterval>);
    vi.spyOn(window, "clearInterval").mockImplementation(() => undefined);
    vi.spyOn(window, "setTimeout").mockImplementation(((handler: TimerHandler) => {
      if (typeof handler === "function") handler();
      return 0 as unknown as ReturnType<typeof window.setTimeout>;
    }) as typeof window.setTimeout);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps one JSON-LD script and updates FAQ content for region/device across step changes", async () => {
    render(<Index />);

    const region = "🇫🇷 France";
    const device = "FireStick";

    expectFaqToMatchSelection("🇺🇸 USA", "Android");

    fireEvent.click(screen.getByRole("button", { name: /select country france/i }));
    expectFaqToMatchSelection(region, "Android");

    fireEvent.click(screen.getByRole("button", { name: /^continue/i }));
    await waitFor(() => expect(screen.getByText(/what will you watch on\?/i)).toBeInTheDocument());
    expectFaqToMatchSelection(region, "Android");

    fireEvent.click(screen.getByRole("button", { name: /select device firestick/i }));
    expectFaqToMatchSelection(region, device);

    fireEvent.click(screen.getByRole("button", { name: /^continue/i }));
    await waitFor(() => expect(screen.getByText(/which messaging apps do you use\?/i)).toBeInTheDocument());
    expectFaqToMatchSelection(region, device);

    fireEvent.change(screen.getByLabelText(/international phone number/i), { target: { value: "6768789897" } });
    fireEvent.click(screen.getByRole("button", { name: /^continue/i }));

    await waitFor(() => expect(screen.getByText(/preparing your trial/i)).toBeInTheDocument());
    expectFaqToMatchSelection(region, device);

    fireEvent.click(screen.getByRole("button", { name: /^continue/i }));
    await waitFor(() => expect(screen.getByText(/choose your access/i)).toBeInTheDocument());
    expectFaqToMatchSelection(region, device);
  });
});
