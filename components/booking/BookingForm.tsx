// components/booking/booking-form.tsx
"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitBooking, toDateKey, type BookingOptions } from "@/lib/booking";

type Props = {
  options: BookingOptions;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
};

type Errors = Partial<Record<"name" | "phone" | "serviceType" | "vehicleType" | "date", string>>;

const emptyForm = {
  name: "",
  phone: "",
  serviceType: "",
  vehicleType: "",
  notes: "",
};

export default function BookingForm({ options, date, onDateChange }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof emptyForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleAddOn = (id: string, checked: boolean) =>
    setAddOns((list) => (checked ? [...list, id] : list.filter((x) => x !== id)));

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 8)
      e.phone = "Please enter a valid phone number.";
    if (!form.serviceType) e.serviceType = "Please choose a service.";
    if (!form.vehicleType) e.vehicleType = "Please choose your vehicle type.";
    if (!date) e.date = "Please pick a date on the calendar.";
    return e;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0 || !date) return;

    setSubmitting(true);
    const result = await submitBooking({
      ...form,
      name: form.name.trim(),
      addOns,
      date: toDateKey(date),
    });
    setSubmitting(false);
    if (result.ok) setDone(true);
  }

  function reset() {
    setForm(emptyForm);
    setAddOns([]);
    setErrors({});
    onDateChange(undefined);
    setDone(false);
  }

  if (done) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          <h2 className="text-2xl font-bold">Request sent</h2>
          <p className="max-w-sm text-muted-foreground">
            Thanks, {form.name.split(" ")[0]}. We&apos;ll contact you shortly to
            confirm your booking.
          </p>
          <Button variant="outline" onClick={reset}>
            Make another booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Booking details</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name + phone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>

          {/* Service + vehicle */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service type</Label>
              <Select
                value={form.serviceType}
                onValueChange={(v) => set("serviceType", v ?? "")}
              >
                <SelectTrigger id="serviceType" className="w-full" aria-invalid={!!errors.serviceType}>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {options.serviceTypes.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-destructive">{errors.serviceType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle type</Label>
              <Select
                value={form.vehicleType}
                onValueChange={(v) => set("vehicleType", v ?? "")}
              >
                <SelectTrigger id="vehicleType" className="w-full" aria-invalid={!!errors.vehicleType}>
                  <SelectValue placeholder="Select your vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {options.vehicleTypes.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicleType && (
                <p className="text-sm text-destructive">{errors.vehicleType}</p>
              )}
            </div>
          </div>

          {/* Add-ons (optional) */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">
              Additional add-ons{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {options.addOns.map((o) => (
                <div key={o.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`addon-${o.id}`}
                    checked={addOns.includes(o.id)}
                    onCheckedChange={(checked) => toggleAddOn(o.id, checked === true)}
                  />
                  <Label htmlFor={`addon-${o.id}`} className="cursor-pointer font-normal">
                    {o.label}
                  </Label>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Date: set from the calendar */}
          <div className="space-y-2">
            <Label htmlFor="date">Preferred date</Label>
            <Input
              id="date"
              readOnly
              value={
                date
                  ? date.toLocaleDateString("en-AU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""
              }
              placeholder="Pick an available date on the calendar"
              aria-invalid={!!errors.date}
            />
            {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Additional notes{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              rows={4}
              placeholder="Address, parking, anything we should know about the vehicle..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-amber-500 text-black hover:bg-amber-400"
          >
            {submitting ? "Sending..." : "Request booking"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}