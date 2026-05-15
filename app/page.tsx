"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SubmitStatus = "idle" | "domestic-success" | "global-success" | "error";

export default function Home() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDomesticSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from("inquiries").insert({
      inquiry_source: "domestic",
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      country: "Korea",
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      inquiry_type: String(formData.get("inquiryType") || ""),
      quantity: String(formData.get("quantity") || ""),
      message: String(formData.get("message") || ""),
    });

    if (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setSubmitStatus("domestic-success");
    setErrorMessage("");
    form.reset();
  }

  async function handleGlobalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from("inquiries").insert({
      inquiry_source: "global",
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      country: String(formData.get("country") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      inquiry_type: String(formData.get("inquiryType") || ""),
      quantity: "",
      message: String(formData.get("message") || ""),
    });

    if (error) {
      setSubmitStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setSubmitStatus("global-success");
    setErrorMessage("");
    form.reset();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-extrabold text-slate-950">UREVS O</p>
            <p className="text-xs font-medium text-slate-500">Wound Dressing</p>
          </div>

          <nav className="hidden gap-6 text-sm font-bold text-slate-600 md:flex">
            <a href="#product" className="hover:text-blue-700">Product</a>
            <a href="#domestic" className="hover:text-blue-700">Domestic</a>
            <a href="#global" className="hover:text-blue-700">Global</a>
            <a href="#faq" className="hover:text-blue-700">FAQ</a>
          </nav>

          <a href="#contact" className="rounded-full bg-blue-700 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800">
            Inquiry
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-br from-white via-blue-50 to-cyan-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700">
              Medical Device Wound Dressing
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
              UREVS O<br />
              <span className="text-blue-700">Wound Dressing</span>
            </h1>

            <p className="mt-6 text-xl font-semibold text-slate-700">
              Wound dressing product for wound protection and dressing management.
            </p>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              UREVS O is a wound dressing product used for wound protection and dressing management.
              Please check the approved intended use, instructions for use, and precautions before use.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#product" className="rounded-full bg-blue-700 px-7 py-3 text-center text-sm font-bold text-white hover:bg-blue-800">
                Product Info
              </a>
              <a href="#domestic" className="rounded-full border border-blue-200 bg-white px-7 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-50">
                Domestic Inquiry
              </a>
              <a href="#global" className="rounded-full border border-slate-200 bg-white px-7 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50">
                Global Inquiry
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-2xl">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-blue-50">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-700 text-4xl font-extrabold text-white">
                  U
                </div>
                <p className="text-2xl font-extrabold text-slate-950">UREVS O</p>
                <p className="mt-2 text-sm text-slate-500">Product image will be added later.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Product Overview</p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
          Product information
        </h2>
        <p className="mt-5 max-w-3xl leading-8 text-slate-600">
          This section contains preliminary product information. Final wording should be updated after checking the product approval document, IFU, and catalog.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard title="Wound Protection" description="Used to cover and protect the wound area from external contact." />
          <FeatureCard title="Dressing Management" description="Designed for wound dressing management and fixation." />
          <FeatureCard title="Usability" description="Available product size options can be selected according to the use case." />
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Product Information
          </p>
          <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
            UREVS O Basic Product Information
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ProductInfoItem label="Product Name" value="UREVS O" />
            <ProductInfoItem label="English Name" value="UREVS O Wound Dressing" />
            <ProductInfoItem label="Product Category" value="Wound Dressing" />
            <ProductInfoItem label="Product Type" value="Film type dressing product" />
            <ProductInfoItem label="Intended Use" value="Wound protection and dressing management" />
            <ProductInfoItem label="Features" value="Transparent type, dressing management, size options" />
            <ProductInfoItem label="Approval Number" value="To be added after checking approval document" />
            <ProductInfoItem label="Manufacturer" value="To be added after checking product documents" />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Inquiry</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
              Domestic / Global Inquiry
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
              Domestic and global inquiries are saved to Supabase.
            </p>
          </div>

          {submitStatus === "error" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              Failed to save inquiry: {errorMessage}
            </div>
          )}

          {submitStatus === "domestic-success" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700">
              Domestic inquiry has been submitted successfully.
            </div>
          )}

          {submitStatus === "global-success" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-4 text-sm font-semibold text-cyan-700">
              Global inquiry has been submitted successfully.
            </div>
          )}

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div id="domestic" className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Domestic Inquiry</p>
              <h3 className="mt-3 text-2xl font-extrabold text-slate-950">Domestic Purchase / Supply Inquiry</h3>

              <form onSubmit={handleDomesticSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput label="Name" name="name" required />
                  <FormInput label="Company / Hospital" name="company" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput label="Phone" name="phone" required />
                  <FormInput label="Email" name="email" type="email" required />
                </div>
                <FormSelect
                  label="Inquiry Type"
                  name="inquiryType"
                  options={["Personal Purchase", "Hospital Supply", "Pharmacy Entry", "Wholesale", "Bulk Order"]}
                  required
                />
                <FormInput label="Estimated Quantity" name="quantity" />
                <FormTextarea label="Message" name="message" required />
                <ConsentCheck />
                <button type="submit" className="w-full rounded-full bg-blue-700 px-7 py-3 text-sm font-bold text-white hover:bg-blue-800">
                  Submit Domestic Inquiry
                </button>
              </form>
            </div>

            <div id="global" className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Global Inquiry</p>
              <h3 className="mt-3 text-2xl font-extrabold">Global Distribution Inquiry</h3>

              <form onSubmit={handleGlobalSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput dark label="Name" name="name" required />
                  <FormInput dark label="Company" name="company" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput dark label="Country" name="country" required />
                  <FormInput dark label="Email" name="email" type="email" required />
                </div>
                <FormInput dark label="WhatsApp / Phone" name="phone" />
                <FormSelect
                  dark
                  label="Inquiry Type"
                  name="inquiryType"
                  options={["Distributor Inquiry", "Import Inquiry", "Catalog Request", "Regulatory Document Request", "Bulk Order Inquiry"]}
                  required
                />
                <FormTextarea dark label="Message" name="message" required />
                <ConsentCheck dark />
                <button type="submit" className="w-full rounded-full bg-cyan-400 px-7 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300">
                  Submit Global Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">FAQ</h2>
        </div>

        <div className="mt-12 space-y-4">
          <FaqItem question="What is UREVS O?" answer="UREVS O is a wound dressing product for wound protection and dressing management." />
          <FaqItem question="Can individuals purchase it?" answer="Purchase availability will be guided after checking distribution conditions and regulatory requirements." />
          <FaqItem question="Can hospitals or distributors inquire?" answer="Yes. Domestic and global inquiries can be submitted through the inquiry forms." />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-12 text-slate-300">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-2xl font-extrabold text-white">UREVS O</p>
              <p className="mt-2 text-sm text-slate-400">Wound Dressing</p>
            </div>

            <div className="grid gap-3 text-sm leading-7 md:grid-cols-2">
              <div>
                <p>Company information: To be added after business registration</p>
                <p>Business registration number: To be added later</p>
                <p>Medical device sales license: To be added later</p>
                <p>Product inquiry: Submit through inquiry form</p>
              </div>
              <div>
                <p>Address: To be added later</p>
                <p>Phone: To be added later</p>
                <p>Email: To be added later</p>
                <p>Advertising review information: To be added after confirmation</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            <p>Product descriptions may be revised based on approval documents, IFU, catalog, and advertising review.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl font-extrabold text-blue-700">
        ✓
      </div>
      <h3 className="text-xl font-extrabold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function ProductInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  required = false,
  dark = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <span className={`text-sm font-bold ${dark ? "text-slate-200" : "text-slate-700"}`}>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
          dark
            ? "border-white/10 bg-white/10 text-white"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      />
    </label>
  );
}

function FormSelect({
  label,
  name,
  options,
  required = false,
  dark = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <span className={`text-sm font-bold ${dark ? "text-slate-200" : "text-slate-700"}`}>{label}</span>
      <select
        name={name}
        required={required}
        className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
          dark
            ? "border-white/10 bg-white/10 text-white"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <option value="" className="text-slate-900">Select</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-slate-900">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FormTextarea({
  label,
  name,
  required = false,
  dark = false,
}: {
  label: string;
  name: string;
  required?: boolean;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <span className={`text-sm font-bold ${dark ? "text-slate-200" : "text-slate-700"}`}>{label}</span>
      <textarea
        name={name}
        required={required}
        rows={5}
        className={`mt-2 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none ${
          dark
            ? "border-white/10 bg-white/10 text-white"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      />
    </label>
  );
}

function ConsentCheck({ dark = false }: { dark?: boolean }) {
  return (
    <label className={`flex items-start gap-3 rounded-2xl p-4 text-sm leading-6 ${
      dark ? "bg-white/10 text-slate-300" : "bg-white text-slate-600"
    }`}>
      <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300" />
      <span>Consent to collection and use of personal information for inquiry response.</span>
    </label>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-extrabold text-slate-950">Q. {question}</h3>
      <p className="mt-3 leading-7 text-slate-600">A. {answer}</p>
    </div>
  );
}
