import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero-road.jpg";
import { WhatsAppForm, type Field } from "@/components/WhatsAppForm";
import { EMAIL, MAILTO, PHONE_DISPLAY, STATES, TEL, isPhone, waLink } from "@/lib/contact";

const TITLE = "Clear Challan — Traffic Challan & RTO Assistance Across India";
const DESC =
  "Independent help with pending, court and Lok Adalat traffic challans plus RTO paperwork — licence, RC, NOC, transfer. All India. Contact on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const NAV = [
  ["#services", "Challan Help"],
  ["#rto", "RTO Services"],
  ["#process", "Process"],
  ["#faq", "FAQs"],
  ["#contact", "Contact"],
] as const;

const CHALLAN_TYPES = [
  "Pending traffic challan",
  "Court / complicated challan",
  "Lok Adalat assistance",
  "Multiple challans on one vehicle",
  "Wrong challan / dispute",
  "Commercial vehicle challan",
  "Other / not sure",
];

const CHALLAN_SERVICES = [
  ["Pending Traffic Challans", "Help checking, understanding and settling pending e-challans through the proper channel."],
  ["Court / Complicated Challans", "Guidance on challans sent to virtual or regular court and the documents you may need."],
  ["Lok Adalat Assistance", "Support preparing for Lok Adalat sessions where eligible challans may be taken up."],
  ["Multiple Challans, One Vehicle", "Organising several challans on a single vehicle into one clear plan."],
  ["Wrong Challan / Dispute Guidance", "Guidance on raising a grievance when a challan appears incorrect."],
  ["Commercial Vehicle Challans", "Assistance for trucks, taxis, buses and fleet owners with frequent challans."],
];

const RTO_SERVICES = [
  "Driving licence assistance",
  "Learner licence",
  "Duplicate driving licence",
  "Licence renewal",
  "Vehicle registration",
  "Ownership transfer",
  "RC correction",
  "Duplicate RC",
  "NOC for another state",
  "Address change",
  "Fitness certificate assistance",
  "Permit assistance",
  "Hypothecation addition",
  "Hypothecation removal",
  "Other RTO paperwork",
];

const STEPS = [
  ["Share details", "Send your vehicle or challan details through the form or WhatsApp."],
  ["Case review", "We review the case and explain the options and our service fee upfront."],
  ["Guided action", "We assist with the paperwork and process with the relevant authority."],
  ["Updates", "You receive updates until the authority completes its decision."],
];

const FAQS = [
  ["Are you a government website?", "No. Clear Challan is an independent assistance service and is not affiliated with any government department, police, court or RTO."],
  ["Can you guarantee my challan will be cancelled?", "No. We never guarantee cancellation, waivers or any legal outcome. Decisions are made solely by the competent authority or court."],
  ["How much do you charge?", "Service fees depend on the case. We share the fee clearly after reviewing your details, before any work begins. Official fines and government fees are separate."],
  ["Do you work outside my city?", "Yes, we assist customers across India. Some processes may require your presence or original documents as per local rules."],
  ["What details do I need to share?", "Usually your vehicle registration number and, if available, the challan number. For RTO work, a licence or RC reference helps."],
  ["Is my information safe?", "This website does not store your form data. Details are only shared when you choose to send a WhatsApp message or email."],
];

const phoneRule = (v: string) => (isPhone(v) ? null : "Enter a valid 10-digit Indian mobile number.");
const nameRule = (v: string) => (v.length >= 2 ? null : "Name looks too short.");
const regRule = (v: string) =>
  /^[A-Z]{2}[\s-]?\d{1,2}[\s-]?[A-Z]{0,3}[\s-]?\d{1,4}$|^\d{2}\s?BH\s?\d{4}\s?[A-Z]{1,2}$/i.test(v.trim())
    ? null
    : "Enter a valid registration number, e.g. DL 01 AB 1234.";

const challanFields: Field[] = [
  { name: "name", label: "Full name", type: "text", required: true, validate: nameRule },
  { name: "phone", label: "Phone number", type: "tel", required: true, placeholder: "10-digit mobile", validate: phoneRule },
  { name: "state", label: "State", type: "select", required: true, options: STATES },
  { name: "vehicle", label: "Vehicle registration number", type: "text", required: true, placeholder: "DL 01 AB 1234", validate: regRule },
  { name: "challan", label: "Challan number", type: "text" },
  { name: "type", label: "Challan type", type: "select", required: true, options: CHALLAN_TYPES },
  { name: "notes", label: "Description / notes", type: "textarea", required: true, placeholder: "Briefly describe the challan(s) and your situation" },
];

const rtoFields: Field[] = [
  { name: "name", label: "Name", type: "text", required: true, validate: nameRule },
  { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "10-digit mobile", validate: phoneRule },
  { name: "state", label: "State", type: "select", required: true, options: STATES },
  { name: "service", label: "Service requested", type: "select", required: true, options: RTO_SERVICES },
  { name: "ref", label: "Vehicle / licence reference", type: "text", full: true, placeholder: "Registration or DL number" },
  { name: "details", label: "Details", type: "textarea", required: true, placeholder: "What do you need help with?" },
];

type Vals = { [k: string]: string } & Record<"name"|"phone"|"state"|"vehicle"|"challan"|"type"|"notes"|"service"|"ref"|"details", string>;
const challanMsg = (v: Vals) =>
  [
    "*Traffic Challan Assistance Request — Clear Challan*",
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    `State: ${v.state}`,
    `Vehicle No.: ${v.vehicle.toUpperCase()}`,
    `Challan No.: ${v.challan || "Not provided"}`,
    `Challan type: ${v.type}`,
    `Notes: ${v.notes}`,
  ].join("\n");

const rtoMsg = (v: Vals) =>
  [
    "*RTO Service Assistance Request — Clear Challan*",
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    `State: ${v.state}`,
    `Service: ${v.service}`,
    `Vehicle/Licence ref: ${v.ref || "Not provided"}`,
    `Details: ${v.details}`,
  ].join("\n");

function Logo() {
  return (
    <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label="Clear Challan home">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold text-gold font-display text-lg">C</span>
      <span className="truncate font-display text-xl text-foreground">Clear <span className="text-gold">Challan</span></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:flex lg:justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden lg:flex lg:items-center lg:gap-7">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} className="text-sm text-muted-foreground transition-colors hover:text-gold">{l}</a>
          ))}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold !py-2 !px-5 text-sm">WhatsApp</a>
        </nav>
        <button
          type="button"
          className="btn-ghost !p-2.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background px-5 pb-5 lg:hidden">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-border py-3.5 text-foreground">{l}</a>
          ))}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a href={TEL} className="btn-ghost">Call</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl text-foreground sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-16" aria-labelledby="hero-title">
          <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-hero-fade" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:pb-28 sm:pt-28">
            <p className="inline-block rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs text-muted-foreground">
              Independent assistance service — not affiliated with any government department
            </p>
            <h1 id="hero-title" className="mt-6 max-w-3xl text-4xl leading-tight text-foreground sm:text-6xl">
              Traffic challans and RTO paperwork, <span className="text-gold-gradient">handled with clarity.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Guidance and assistance for pending, court and Lok Adalat challans plus everyday RTO work — anywhere in India.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#challan-form" className="btn-gold">Get challan help</a>
              <a href="#rto-form" className="btn-ghost">RTO services</a>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section aria-label="About our service" className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
            {[
              ["10+ yrs", "Experience*"],
              ["10,000+", "Challans cleared*"],
              ["All India", "Service coverage"],
              ["Upfront", "Fee after case review"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl text-gold">{n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto max-w-6xl px-5 pb-6 text-xs text-muted-foreground">*Figures as stated by the business owner; not independently verified.</p>
        </section>

        {/* Challan services */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHead eyebrow="Challan assistance" title="Help with every kind of traffic challan" text="We help you understand your challan and take the right next step with the right authority." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CHALLAN_SERVICES.map(([t, d], i) => (
              <article key={t} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold">
                <span className="font-display text-sm text-gold">0{i + 1}</span>
                <h3 className="mt-3 text-xl text-foreground">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* RTO */}
        <section id="rto" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <SectionHead eyebrow="RTO services" title="RTO paperwork, guided step by step" text="Assistance and guidance with common RTO work. Final approval always depends on the relevant RTO or transport authority." />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {RTO_SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {s} assistance
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHead eyebrow="How it works" title="A simple, transparent process" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="border-t-2 border-gold pt-5">
                <span className="font-display text-3xl text-gold">{i + 1}</span>
                <h3 className="mt-2 text-lg text-foreground">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* What we help with / reviews placeholder */}
        <section aria-labelledby="help-title" className="mx-auto max-w-6xl px-5 pb-20">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 id="help-title" className="text-2xl text-foreground">What we help with</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Understanding what a challan is for and where it stands</li>
                <li>• Knowing which authority handles your case</li>
                <li>• Preparing documents for court, Lok Adalat or RTO</li>
                <li>• Keeping multiple challans and applications organised</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-border p-7">
              <h2 className="text-2xl text-foreground">Customer reviews</h2>
              <p className="mt-4 text-sm text-muted-foreground">Space reserved for genuine customer reviews, to be added later. We do not publish made-up testimonials.</p>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section id="contact" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <SectionHead eyebrow="Get in touch" title="Tell us about your case" text="Choose the form that fits. You'll review your details before WhatsApp opens." />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div id="challan-form">
                <WhatsAppForm id="challan" title="Traffic Challan Help" subtitle="For pending, court, Lok Adalat or disputed challans." fields={challanFields} buildMessage={(v) => challanMsg(v as Vals)} submitLabel="Confirm & open WhatsApp" />
              </div>
              <div id="rto-form">
                <WhatsAppForm id="rto" title="RTO Service Request" subtitle="For licence, RC, transfer, NOC and other RTO work." fields={rtoFields} buildMessage={(v) => rtoMsg(v as Vals)} submitLabel="Open WhatsApp with RTO request" />
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <a href={TEL} className="btn-ghost">Call {PHONE_DISPLAY}</a>
              <a href={waLink("Hello Clear Challan, I need assistance.")} target="_blank" rel="noopener noreferrer" className="btn-ghost">Chat on WhatsApp</a>
              <a href={MAILTO} className="btn-ghost break-all">{EMAIL}</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
          <SectionHead eyebrow="FAQs" title="Common questions" />
          <div className="mt-10 divide-y divide-border border-y border-border">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  {q}
                  <span className="shrink-0 text-gold transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section aria-labelledby="disc" className="mx-auto max-w-6xl px-5 pb-16">
          <div className="rounded-2xl border border-gold/40 bg-gold-soft p-6">
            <h2 id="disc" className="font-sans text-sm font-bold uppercase tracking-wider text-gold">Important disclaimer</h2>
            <p className="mt-2 text-sm text-foreground">
              Clear Challan is an independent assistance service and is not affiliated with any government department, traffic police, court or RTO. Service fees are shared after reviewing your case details. All outcomes depend on the competent authority, and we do not guarantee cancellation, reduction or any specific legal result. Official fines and government fees are payable separately.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">Traffic challan and RTO assistance across India.</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="font-sans text-sm font-bold text-foreground">Quick links</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV.map(([h, l]) => <li key={h}><a href={h} className="text-muted-foreground hover:text-gold">{l}</a></li>)}
            </ul>
          </nav>
          <address className="not-italic">
            <h2 className="font-sans text-sm font-bold text-foreground">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href={TEL} className="hover:text-gold">Phone: {PHONE_DISPLAY}</a></li>
              <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp: {PHONE_DISPLAY}</a></li>
              <li><a href={MAILTO} className="break-all hover:text-gold">{EMAIL}</a></li>
              <li>Service area: All India</li>
            </ul>
          </address>
        </div>
        <p className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Clear Challan · Independent assistance service — not affiliated with any government department.
        </p>
      </footer>

      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="btn-gold fixed bottom-5 right-5 z-40 !p-4 sm:hidden">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>
      </a>
    </div>
  );
}
