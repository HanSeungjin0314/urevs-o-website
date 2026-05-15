"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SubmitStatus = "idle" | "domestic-success" | "global-success" | "error";

const KR = {
  navProduct: "\uc81c\ud488\uc18c\uac1c",
  navDomestic: "\uad6d\ub0b4\ubb38\uc758",
  navGlobal: "\ud574\uc678\ubb38\uc758",
  inquiry: "\ubb38\uc758\ud558\uae30",
  heroSubtitle: "\uc0c1\ucc98 \ubd80\uc704 \ubcf4\ud638\uc640 \ub4dc\ub808\uc2f1 \uad00\ub9ac\ub97c \uc704\ud55c \ucc3d\uc0c1\ud53c\ubcf5\uc7ac",
  heroDesc: "UREVS O\ub294 \uc0c1\ucc98 \ubd80\uc704 \ubcf4\ud638 \ubc0f \ub4dc\ub808\uc2f1 \uad00\ub9ac\ub97c \uc704\ud574 \uc0ac\uc6a9\ud558\ub294 \uc758\ub8cc\uae30\uae30 \uc81c\ud488\uc785\ub2c8\ub2e4. \uc81c\ud488 \uc0ac\uc6a9 \uc804 \uc0ac\uc6a9\ubaa9\uc801, \uc0ac\uc6a9\ubc29\ubc95, \uc8fc\uc758\uc0ac\ud56d\uc744 \ubc18\ub4dc\uc2dc \ud655\uc778\ud558\uc138\uc694.",
  productInfoView: "\uc81c\ud488 \uc815\ubcf4 \ubcf4\uae30",
  domesticInquiry: "\uad6d\ub0b4 \uad6c\ub9e4/\ub0a9\ud488 \ubb38\uc758",
  globalInquiry: "\ud574\uc678 \ucd1d\ud310 \ubb38\uc758",
  productImageLater: "\uc2e4\uc81c \uc81c\ud488 \uc0ac\uc9c4\uc73c\ub85c \uad50\uccb4 \uc608\uc815",
  overviewTitle: "\uc0c1\ucc98 \ubd80\uc704 \ubcf4\ud638\ub97c \uc704\ud55c \ub4dc\ub808\uc2f1 \uc194\ub8e8\uc158",
  overviewDesc: "UREVS O\ub294 \uc0c1\ucc98 \ubd80\uc704\ub97c \uc678\ubd80 \ud658\uacbd\uc73c\ub85c\ubd80\ud130 \ubcf4\ud638\ud558\uace0 \ub4dc\ub808\uc2f1 \uc0c1\ud0dc\ub97c \uad00\ub9ac\ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\ud558\ub294 \ucc3d\uc0c1\ud53c\ubcf5\uc7ac\uc785\ub2c8\ub2e4. \uc815\ud655\ud55c \uc0ac\uc6a9\ubaa9\uc801\uacfc \uc801\uc6a9 \ubc94\uc704\ub294 \uc81c\ud488 \ud5c8\uac00\uc0ac\ud56d \ubc0f \uc0ac\uc6a9\uc124\uba85\uc11c\ub97c \uae30\uc900\uc73c\ub85c \ud655\uc778\ud574\uc57c \ud569\ub2c8\ub2e4.",
  feature1Title: "\uc0c1\ucc98 \ubd80\uc704 \ubcf4\ud638",
  feature1Desc: "\uc0c1\ucc98 \ubd80\uc704\ub97c \ub36e\uc5b4 \uc678\ubd80 \uc811\ucd09\uc73c\ub85c\ubd80\ud130 \ubcf4\ud638\ud558\ub294 \ub370 \uc0ac\uc6a9\ub429\ub2c8\ub2e4.",
  feature2Title: "\ub4dc\ub808\uc2f1 \uad00\ub9ac",
  feature2Desc: "\ub4dc\ub808\uc2f1 \ubd80\uc704\uc758 \uad00\ub9ac\uc640 \uace0\uc815\uc744 \uace0\ub824\ud55c \uc81c\ud488\uc785\ub2c8\ub2e4.",
  feature3Title: "\uc0ac\uc6a9 \ud3b8\uc758\uc131",
  feature3Desc: "\uc81c\ud488 \uaddc\uaca9\uacfc \uc0ac\uc6a9 \ubd80\uc704\uc5d0 \ub530\ub77c \uc801\uc808\ud55c \uc0ac\uc774\uc988\ub97c \uc120\ud0dd\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
  prodInfo: "\uc81c\ud488 \uc815\ubcf4",
  basicInfo: "UREVS O \uc81c\ud488 \uae30\ubcf8 \uc815\ubcf4",
  productName: "\uc81c\ud488\uba85",
  englishName: "\uc601\ubb38\uba85",
  productCategory: "\uc81c\ud488 \uad6c\ubd84",
  woundDressing: "\ucc3d\uc0c1\ud53c\ubcf5\uc7ac",
  productType: "\uc81c\ud488 \ud615\ud0dc",
  filmType: "\ud544\ub984 \ud0c0\uc785 \ub4dc\ub808\uc2f1 \uc81c\ud488",
  intendedUse: "\uc0ac\uc6a9 \ubaa9\uc801",
  intendedUseValue: "\uc0c1\ucc98 \ubd80\uc704 \ubcf4\ud638 \ubc0f \ub4dc\ub808\uc2f1 \uad00\ub9ac",
  features: "\uc81c\ud488 \ud2b9\uc9d5",
  featuresValue: "\ud22c\uba85 \ud0c0\uc785, \ub4dc\ub808\uc2f1 \uad00\ub9ac, \uaddc\uaca9 \uc120\ud0dd \uac00\ub2a5",
  approvalNo: "\ud5c8\uac00\ubc88\ud638",
  approvalNoValue: "\uc81c\ud488 \ud5c8\uac00\uc99d \ud655\uc778 \ud6c4 \uc785\ub825",
  manufacturer: "\uc81c\uc870\uc0ac",
  manufacturerValue: "\uc81c\ud488 \uc790\ub8cc \ud655\uc778 \ud6c4 \uc785\ub825",
  prodNote: "\uc704 \uc81c\ud488 \uc815\ubcf4\ub294 \ud604\uc7ac \ud648\ud398\uc774\uc9c0 \uad6c\uc131\uc6a9 \ucd08\uc548\uc774\uba70, \ucd5c\uc885 \ubb38\uad6c\ub294 \uc81c\ud488 \ud5c8\uac00\uc99d, \uc0ac\uc6a9\uc124\uba85\uc11c, \uce74\ud0c8\ub85c\uadf8 \uc790\ub8cc \ud655\uc778 \ud6c4 \uc218\uc815\ub429\ub2c8\ub2e4.",
  keyFeatures: "UREVS O\uc758 \uc8fc\uc694 \ud2b9\uc9d5",
  keyFeatureNote: "\ucd5c\uc885 \ud45c\ud604\uc740 \ud5c8\uac00\uc99d, \uce74\ud0c8\ub85c\uadf8, \uc0ac\uc6a9\uc124\uba85\uc11c \ud655\uc778 \ud6c4 \uc870\uc815\ud574\uc57c \ud569\ub2c8\ub2e4. \ud604\uc7ac \ubb38\uad6c\ub294 \uc758\ub8cc\uae30\uae30 \uad11\uace0\uc2ec\uc758 \uac00\ub2a5\uc131\uc744 \uace0\ub824\ud55c \uc548\uc804\ud55c \ucd08\uc548\uc785\ub2c8\ub2e4.",
  beforeUse: "\uc0ac\uc6a9 \uc804 \ud655\uc778\ud558\uc138\uc694",
  beforeUseDesc: "\uc81c\ud488 \ud3ec\uc7a5 \uc0c1\ud0dc\uc640 \uc720\ud6a8\uae30\uac04\uc744 \ud655\uc778\ud55c \ud6c4 \uc0ac\uc6a9\ud558\uc138\uc694. \uc0ac\uc6a9 \uc911 \uc774\uc0c1 \ubc18\uc751\uc774 \uc788\uac70\ub098 \uc0c1\ucc98 \uc0c1\ud0dc\uac00 \uc545\ud654\ub418\ub294 \uacbd\uc6b0 \uc0ac\uc6a9\uc744 \uc911\uc9c0\ud558\uace0 \uc804\ubb38\uac00\uc640 \uc0c1\ub2f4\ud558\uc138\uc694.",
  inquiryHeading: "\uad6d\ub0b4\xb7\ud574\uc678 \ubb38\uc758 \uc811\uc218",
  inquiryDesc: "\uad6d\ub0b4 \uad6c\ub9e4/\ub0a9\ud488 \ubb38\uc758\uc640 \ud574\uc678 \ucd1d\ud310/\uc218\uc785 \ubb38\uc758\ub97c \uad6c\ubd84\ud558\uc5ec \uc811\uc218\ud569\ub2c8\ub2e4. \ubb38\uc758 \uc81c\ucd9c \uc2dc Supabase DB\uc5d0 \uc800\uc7a5\ub429\ub2c8\ub2e4.",
  domesticTitle: "\uad6d\ub0b4 \uad6c\ub9e4 \ubc0f \ub0a9\ud488 \ubb38\uc758",
  domesticDesc: "\uac1c\uc778 \uad6c\ub9e4, \ubcd1\uc6d0 \ub0a9\ud488, \uc57d\uad6d \uc785\uc810, \uc758\ub8cc\uc18c\ubaa8\ud488 \uc5c5\uccb4 \ub3c4\ub9e4 \ubb38\uc758\ub97c \uc811\uc218\ud569\ub2c8\ub2e4.",
  name: "\uc774\ub984",
  companyHospital: "\ud68c\uc0ac/\ubcd1\uc6d0\uba85",
  phone: "\uc5f0\ub77d\ucc98",
  email: "\uc774\uba54\uc77c",
  inquiryType: "\ubb38\uc758 \uc720\ud615",
  personalPurchase: "\uac1c\uc778 \uad6c\ub9e4 \ubb38\uc758",
  hospitalSupply: "\ubcd1\uc6d0 \ub0a9\ud488 \ubb38\uc758",
  pharmacyEntry: "\uc57d\uad6d \uc785\uc810 \ubb38\uc758",
  wholesale: "\uc758\ub8cc\uc18c\ubaa8\ud488 \uc5c5\uccb4 \ub3c4\ub9e4 \ubb38\uc758",
  bulkOrder: "\ub300\ub7c9 \uad6c\ub9e4 \ubb38\uc758",
  estimatedQuantity: "\uc608\uc0c1 \uc218\ub7c9",
  message: "\ubb38\uc758 \ub0b4\uc6a9",
  messagePlaceholder: "\uc81c\ud488 \uaddc\uaca9, \uad6c\ub9e4 \ubaa9\uc801, \ub0a9\ud488 \ud76c\ub9dd \uc77c\uc815 \ub4f1\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",
  submitDomestic: "\uad6d\ub0b4 \ubb38\uc758 \uc811\uc218\ud558\uae30",
  select: "\uc120\ud0dd\ud574\uc8fc\uc138\uc694",
  consent: "\ubb38\uc758 \uc811\uc218\ub97c \uc704\ud55c \uac1c\uc778\uc815\ubcf4 \uc218\uc9d1 \ubc0f \uc774\uc6a9\uc5d0 \ub3d9\uc758\ud569\ub2c8\ub2e4.",
  domesticSuccess: "\uad6d\ub0b4 \ubb38\uc758\uac00 \uc815\uc0c1 \uc811\uc218\ub418\uc5c8\uc2b5\ub2c8\ub2e4. Supabase inquiries \ud14c\uc774\ube14\uc5d0\uc11c \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
  saveFail: "\ubb38\uc758 \uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4: ",
  faqTitle: "\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38",
  faq1q: "UREVS O\ub294 \uc5b4\ub5a4 \uc81c\ud488\uc778\uac00\uc694?",
  faq1a: "\uc0c1\ucc98 \ubd80\uc704 \ubcf4\ud638\uc640 \ub4dc\ub808\uc2f1 \uad00\ub9ac\ub97c \uc704\ud574 \uc0ac\uc6a9\ud558\ub294 \ucc3d\uc0c1\ud53c\ubcf5\uc7ac\uc785\ub2c8\ub2e4.",
  faq2q: "\uac1c\uc778\ub3c4 \uad6c\ub9e4\ud560 \uc218 \uc788\ub098\uc694?",
  faq2a: "\ud310\ub9e4 \uac00\ub2a5 \uc5ec\ubd80\uc640 \uad6c\ub9e4 \ubc29\uc2dd\uc740 \uc81c\ud488 \uaddc\uaca9, \uc720\ud1b5 \uc870\uac74, \uad00\ub828 \uc2e0\uace0 \uc5ec\ubd80 \ud655\uc778 \ud6c4 \uc548\ub0b4\ub429\ub2c8\ub2e4.",
  faq3q: "\ubcd1\uc6d0 \ub0a9\ud488\uc774 \uac00\ub2a5\ud55c\uac00\uc694?",
  faq3a: "\ubcd1\uc6d0, \uc57d\uad6d, \uc758\ub8cc\uc18c\ubaa8\ud488 \uc5c5\uccb4 \ub0a9\ud488 \ubb38\uc758\ub97c \uc811\uc218\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
  faq4q: "\ud574\uc678 \uc218\ucd9c\uc774 \uac00\ub2a5\ud55c\uac00\uc694?",
  faq4a: "\uad6d\uac00\ubcc4 \uc758\ub8cc\uae30\uae30 \ub4f1\ub85d \ubc0f \uc218\uc785 \uaddc\uc815\uc774 \ub2e4\ub974\ubbc0\ub85c, \ub300\uc0c1 \uad6d\uac00 \ud655\uc778 \ud6c4 \uc548\ub0b4\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.",
  footerCompany: "\ud68c\uc0ac\uc815\ubcf4: \uc0ac\uc5c5\uc790\ub4f1\ub85d \ud6c4 \uc785\ub825 \uc608\uc815",
  footerBiz: "\uc0ac\uc5c5\uc790\ub4f1\ub85d\ubc88\ud638: \ub4f1\ub85d \ud6c4 \uc785\ub825 \uc608\uc815",
  footerLicense: "\uc758\ub8cc\uae30\uae30 \ud310\ub9e4\uc5c5 \uc2e0\uace0\ubc88\ud638: \uc2e0\uace0 \ud6c4 \uc785\ub825 \uc608\uc815",
  footerInquiry: "\uc81c\ud488 \ubb38\uc758: \ubb38\uc758\ud3fc\uc744 \ud1b5\ud574 \uc811\uc218",
  footerAddress: "\uc8fc\uc18c: \ub4f1\ub85d \ud6c4 \uc785\ub825 \uc608\uc815",
  footerPhone: "\uc804\ud654\ubc88\ud638: \ub4f1\ub85d \ud6c4 \uc785\ub825 \uc608\uc815",
  footerEmail: "\uc774\uba54\uc77c: \ub4f1\ub85d \ud6c4 \uc785\ub825 \uc608\uc815",
  footerReview: "\uad11\uace0\uc2ec\uc758 \uad00\ub828 \ud45c\uc2dc: \ud655\uc778 \ud6c4 \uc785\ub825",
  footerNote: "\ubcf8 \ud398\uc774\uc9c0\uc758 \uc81c\ud488 \uc124\uba85\uc740 \ucd5c\uc885 \ud5c8\uac00\uc0ac\ud56d, \uc0ac\uc6a9\uc124\uba85\uc11c, \uad11\uace0\uc2ec\uc758 \uacb0\uacfc\uc5d0 \ub530\ub77c \uc218\uc815\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
  key1: "\uc0c1\ucc98 \ubd80\uc704 \ubcf4\ud638 \ubaa9\uc801\uc758 \ucc3d\uc0c1\ud53c\ubcf5\uc7ac",
  key2: "\ub4dc\ub808\uc2f1 \uad00\ub9ac\uc5d0 \uc801\ud569\ud55c \ud544\ub984 \ud0c0\uc785 \uad6c\uc870",
  key3: "\uc0ac\uc6a9 \ubd80\uc704 \ud655\uc778\uc744 \uace0\ub824\ud55c \ud22c\uba85 \ud0c0\uc785",
  key4: "\ub2e4\uc591\ud55c \uc0ac\uc6a9 \ud658\uacbd\uc744 \uace0\ub824\ud55c \uaddc\uaca9 \uc120\ud0dd \uac00\ub2a5",
  key5: "\uad6d\ub0b4 \uad6c\ub9e4 \ubc0f \uc758\ub8cc\uae30\uad00 \ub0a9\ud488 \ubb38\uc758 \uac00\ub2a5",
  key6: "\ud574\uc678 \ubc14\uc774\uc5b4 \ubc0f \ucd1d\ud310 \ubb38\uc758 \uac00\ub2a5",
  step1: "\uc81c\ud488 \ud3ec\uc7a5 \ubc0f \uc720\ud6a8\uae30\uac04 \ud655\uc778",
  step2: "\uc0ac\uc6a9 \ubd80\uc704 \uc815\ub9ac",
  step3: "\uc81c\ud488 \uac1c\ubd09",
  step4: "\ud544\uc694\ud55c \ubd80\uc704\uc5d0 \ubd80\ucc29",
  step5: "\uc0ac\uc6a9 \uc911 \uc0c1\ud0dc \ud655\uc778",
  step6: "\uc774\uc0c1 \ubc18\uc751 \uc2dc \uc0ac\uc6a9 \uc911\uc9c0 \ubc0f \uc0c1\ub2f4",} as const;

const domesticInquiryOptions = [
  KR.personalPurchase,
  KR.hospitalSupply,
  KR.pharmacyEntry,
  KR.wholesale,
  KR.bulkOrder,
];

const keyFeatures = [
  KR.keyFeatures,
];

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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-lg font-bold text-white">
              U
            </div>
            <div>
              <p className="text-lg font-bold">UREVS O</p>
              <p className="text-xs text-slate-500">Wound Dressing</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#product" className="hover:text-blue-700">{KR.navProduct}</a>
            <a href="#domestic" className="hover:text-blue-700">{KR.navDomestic}</a>
            <a href="#global" className="hover:text-blue-700">{KR.navGlobal}</a>
            <a href="#faq" className="hover:text-blue-700">FAQ</a>
          </nav>

          <a href="#contact" className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
            {KR.inquiry}
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-br from-white via-blue-50 to-cyan-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Medical Device Wound Dressing
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
              UREVS O<br />
              <span className="text-blue-700">Wound Dressing</span>
            </h1>

            <p className="mt-6 text-xl font-semibold text-slate-700">
              {KR.heroSubtitle}
            </p>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              {KR.heroDesc}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#product" className="rounded-full bg-blue-700 px-7 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-blue-800">
                {KR.productInfoView}
              </a>
              <a href="#domestic" className="rounded-full border border-blue-200 bg-white px-7 py-3 text-center text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50">
                {KR.domesticInquiry}
              </a>
              <a href="#global" className="rounded-full border border-slate-200 bg-white px-7 py-3 text-center text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                {KR.globalInquiry}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-2xl">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-100 to-cyan-100 p-8">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] border border-blue-200 bg-white shadow-inner">
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-700 text-4xl font-extrabold text-white shadow-lg">
                    U
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">UREVS O</p>
                  <p className="mt-2 text-sm font-medium text-slate-500">Product image area</p>
                  <p className="mt-1 text-xs text-slate-400">{KR.productImageLater}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Product Overview</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
            {KR.overviewTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            {KR.overviewDesc}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard title={KR.feature1Title} description={KR.feature1Desc} />
          <FeatureCard title={KR.feature2Title} description={KR.feature2Desc} />
          <FeatureCard title={KR.feature3Title} description={KR.feature3Desc} />
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Product Information
          </p>
          <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
            {KR.basicInfo}
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ProductInfoItem label={KR.productName} value="UREVS O" />
            <ProductInfoItem label={KR.englishName} value="UREVS O Wound Dressing" />
            <ProductInfoItem label={KR.productCategory} value={KR.woundDressing} />
            <ProductInfoItem label={KR.productType} value={KR.filmType} />
            <ProductInfoItem label={KR.intendedUse} value={KR.intendedUseValue} />
            <ProductInfoItem label={KR.features} value={KR.featuresValue} />
            <ProductInfoItem label={KR.approvalNo} value={KR.approvalNoValue} />
            <ProductInfoItem label={KR.manufacturer} value={KR.manufacturerValue} />
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-500">
            {KR.prodNote}
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Key Features</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                {KR.keyFeatures}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {KR.keyFeatureNote}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[KR.key1, KR.key2, KR.key3, KR.key4, KR.key5, KR.key6].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 h-2 w-2 rounded-full bg-blue-700" />
                  <p className="font-semibold leading-7 text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Before Use</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                {KR.beforeUse}
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                {KR.beforeUseDesc}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[KR.step1, KR.step2, KR.step3, KR.step4, KR.step5, KR.step6].map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-sm font-bold text-cyan-300">STEP {index + 1}</p>
                  <p className="mt-2 font-semibold leading-7">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Inquiry</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
              {KR.inquiryHeading}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
              {KR.inquiryDesc}
            </p>
          </div>

          {submitStatus === "error" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              {KR.saveFail}{errorMessage}
            </div>
          )}

          {submitStatus === "domestic-success" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700">
              {KR.domesticSuccess}
            </div>
          )}

          {submitStatus === "global-success" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-4 text-sm font-semibold text-cyan-700">
              Global inquiry has been submitted successfully. You can check it in the Supabase inquiries table.
            </div>
          )}

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div id="domestic" className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Domestic Inquiry</p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
                {KR.domesticTitle}
              </h3>
              <p className="mt-4 leading-8 text-slate-600">
                {KR.domesticDesc}
              </p>

              <form onSubmit={handleDomesticSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput label={KR.name} name="name" placeholder={KR.name} required />
                  <FormInput label={KR.companyHospital} name="company" placeholder={KR.companyHospital} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput label={KR.phone} name="phone" placeholder="010-0000-0000" required />
                  <FormInput label={KR.email} name="email" type="email" placeholder="example@email.com" required />
                </div>
                <FormSelect label={KR.inquiryType} name="inquiryType" options={domesticInquiryOptions} required />
                <FormInput label={KR.estimatedQuantity} name="quantity" placeholder="10 pcs / 100 pcs / box" />
                <FormTextarea label={KR.message} name="message" placeholder={KR.messagePlaceholder} required />
                <ConsentCheck />
                <button type="submit" className="w-full rounded-full bg-blue-700 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-800">
                  {KR.submitDomestic}
                </button>
              </form>
            </div>

            <div id="global" className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Global Inquiry</p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight">Global Distribution Inquiry</h3>
              <p className="mt-4 leading-8 text-slate-300">
                UREVS O is a wound dressing product for wound protection and dressing management. Product availability and regulatory status may vary by country.
              </p>

              <form onSubmit={handleGlobalSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput dark label="Name" name="name" placeholder="John Smith" required />
                  <FormInput dark label="Company" name="company" placeholder="Company name" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput dark label="Country" name="country" placeholder="USA / UAE / Vietnam" required />
                  <FormInput dark label="Email" name="email" type="email" placeholder="sales@example.com" required />
                </div>
                <FormInput dark label="WhatsApp / Phone" name="phone" placeholder="+82 10 0000 0000" />
                <FormSelect
                  dark
                  label="Inquiry Type"
                  name="inquiryType"
                  options={["Distributor Inquiry", "Import Inquiry", "Catalog Request", "Regulatory Document Request", "Bulk Order Inquiry"]}
                  required
                />
                <FormTextarea dark label="Message" name="message" placeholder="Please describe your target market, quantity, and required documents." required />
                <ConsentCheck dark />
                <button type="submit" className="w-full rounded-full bg-cyan-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-md transition hover:bg-cyan-300">
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
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
            {KR.faqTitle}
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          <FaqItem question={KR.faq1q} answer={KR.faq1a} />
          <FaqItem question={KR.faq2q} answer={KR.faq2a} />
          <FaqItem question={KR.faq3q} answer={KR.faq3a} />
          <FaqItem question={KR.faq4q} answer={KR.faq4a} />
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
                <p>{KR.footerCompany}</p>
                <p>{KR.footerBiz}</p>
                <p>{KR.footerLicense}</p>
                <p>{KR.footerInquiry}</p>
              </div>
              <div>
                <p>{KR.footerAddress}</p>
                <p>{KR.footerPhone}</p>
                <p>{KR.footerEmail}</p>
                <p>{KR.footerReview}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            <p>{KR.footerNote}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl font-extrabold text-blue-700">
        {"\u2713"}
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
  placeholder,
  required = false,
  dark = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <span className={`text-sm font-bold ${dark ? "text-slate-200" : "text-slate-700"}`}>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
          dark
            ? "border-white/10 bg-white/10 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300/30"
            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
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
        className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
          dark
            ? "border-white/10 bg-white/10 text-white focus:border-cyan-300 focus:ring-cyan-300/30"
            : "border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500/20"
        }`}
      >
        <option value="" className="text-slate-900">{dark ? "Select" : KR.select}</option>
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
  placeholder,
  required = false,
  dark = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <span className={`text-sm font-bold ${dark ? "text-slate-200" : "text-slate-700"}`}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className={`mt-2 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
          dark
            ? "border-white/10 bg-white/10 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300/30"
            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
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
      <span>{dark ? "Consent to collection and use of personal information for inquiry response." : KR.consent}</span>
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

