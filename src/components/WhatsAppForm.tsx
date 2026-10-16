import { useState, type FormEvent } from "react";
import { STATES, waLink } from "@/lib/contact";

export type Field = {
  name: string;
  label: string;
  type: "text" | "tel" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  validate?: (v: string) => string | null;
  full?: boolean;
};

type Props = {
  id: string;
  title: string;
  subtitle: string;
  fields: Field[];
  buildMessage: (values: Record<string, string>) => string;
  submitLabel: string;
};

export { STATES };

export function WhatsAppForm({ id, title, subtitle, fields, buildMessage, submitLabel }: Props) {
  const empty = Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [values, setValues] = useState<Record<string, string>>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"edit" | "review" | "sent">("edit");

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = values[f.name].trim();
      if (f.required && !v) e[f.name] = `Please enter ${f.label.toLowerCase()}.`;
      else if (v && f.validate) {
        const msg = f.validate(v);
        if (msg) e[f.name] = msg;
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (validate()) setStep("review");
    else document.getElementById(`${id}-${fields.find((f) => errors[f.name] || !values[f.name].trim())?.name}`)?.focus();
  };

  const send = () => {
    window.open(waLink(buildMessage(values)), "_blank", "noopener,noreferrer");
    setStep("sent");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h3 className="text-2xl text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

      {step === "edit" && (
        <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" aria-label={title}>
          {fields.map((f) => {
            const fid = `${id}-${f.name}`;
            const err = errors[f.name];
            const common = {
              id: fid,
              name: f.name,
              value: values[f.name],
              "aria-invalid": err ? true : undefined,
              "aria-describedby": err ? `${fid}-err` : undefined,
              onChange: (e: { target: { value: string } }) => setValues((s) => ({ ...s, [f.name]: e.target.value })),
              className: "field",
            };
            return (
              <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label htmlFor={fid} className="mb-1.5 block text-sm font-medium text-foreground">
                  {f.label} {f.required ? <span className="text-gold">*</span> : <span className="text-muted-foreground">(optional)</span>}
                </label>
                {f.type === "select" ? (
                  <select {...common}>
                    <option value="">Select…</option>
                    {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea {...common} rows={4} placeholder={f.placeholder} maxLength={1000} />
                ) : (
                  <input {...common} type={f.type} placeholder={f.placeholder} maxLength={100} />
                )}
                {err && <p id={`${fid}-err`} role="alert" className="mt-1 text-xs text-destructive">{err}</p>}
              </div>
            );
          })}
          <div className="sm:col-span-2">
            {Object.keys(errors).length > 0 && (
              <p role="alert" className="mb-3 text-sm text-destructive">Please fix the highlighted fields.</p>
            )}
            <button type="submit" className="btn-gold w-full sm:w-auto">Review details</button>
            <p className="mt-3 text-xs text-muted-foreground">
              Privacy: nothing is stored on this website. Your details are only shared when you choose to send the WhatsApp message.
            </p>
          </div>
        </form>
      )}

      {step === "review" && (
        <div className="mt-6" aria-live="polite">
          <p className="text-sm font-semibold text-gold">Please confirm your details</p>
          <dl className="mt-3 divide-y divide-border rounded-xl border border-border">
            {fields.filter((f) => values[f.name].trim()).map((f) => (
              <div key={f.name} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-3 px-4 py-2.5 text-sm">
                <dt className="text-muted-foreground">{f.label}</dt>
                <dd className="break-words text-foreground">{values[f.name].trim()}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={send} className="btn-gold">{submitLabel}</button>
            <button type="button" onClick={() => setStep("edit")} className="btn-ghost">Edit details</button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">This opens WhatsApp with a prefilled message. You can review it again before pressing send.</p>
        </div>
      )}

      {step === "sent" && (
        <div className="mt-6 rounded-xl border border-border bg-surface p-5" role="status">
          <p className="font-semibold text-success">WhatsApp opened with your message.</p>
          <p className="mt-1 text-sm text-muted-foreground">Press send in WhatsApp to share it with us. If it didn't open, try again.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={send} className="btn-ghost">Open WhatsApp again</button>
            <button type="button" onClick={() => { setValues(empty); setErrors({}); setStep("edit"); }} className="btn-ghost">Start a new request</button>
          </div>
        </div>
      )}
    </div>
  );
}
