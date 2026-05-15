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
            <a href="#product" className="hover:text-blue-700">제품소개</a>
            <a href="#domestic" className="hover:text-blue-700">국내문의</a>
            <a href="#global" className="hover:text-blue-700">해외문의</a>
            <a href="#faq" className="hover:text-blue-700">FAQ</a>
          </nav>

          <a href="#contact" className="rounded-full bg-blue-700 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800">
            문의하기
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
              상처 부위 보호와 드레싱 관리를 위한 창상피복재
            </p>

            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              UREVS O는 상처 부위 보호 및 드레싱 관리를 위해 사용하는 의료기기 제품입니다.
              제품 사용 전 사용목적, 사용방법, 주의사항을 반드시 확인하세요.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#product" className="rounded-full bg-blue-700 px-7 py-3 text-center text-sm font-bold text-white hover:bg-blue-800">
                제품 정보 보기
              </a>
              <a href="#domestic" className="rounded-full border border-blue-200 bg-white px-7 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-50">
                국내 구매/납품 문의
              </a>
              <a href="#global" className="rounded-full border border-slate-200 bg-white px-7 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50">
                해외 총판 문의
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-2xl">
            <div className="overflow-hidden rounded-[1.5rem] border border-blue-200 bg-white">
              <img
                src="/images/urevs-o-product.svg"
                alt="UREVS O 제품 이미지"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Product Overview</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
            상처 부위 보호를 위한 드레싱 솔루션
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            UREVS O는 상처 부위를 외부 환경으로부터 보호하고 드레싱 상태를 관리하기 위해 사용하는 창상피복재입니다.
            정확한 사용목적과 적용 범위는 제품 허가사항 및 사용설명서를 기준으로 확인해야 합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard title="상처 부위 보호" description="상처 부위를 덮어 외부 접촉으로부터 보호하는 데 사용됩니다." />
          <FeatureCard title="드레싱 관리" description="드레싱 부위의 관리와 고정을 고려한 제품입니다." />
          <FeatureCard title="사용 편의성" description="제품 규격과 사용 부위에 따라 적절한 사이즈를 선택할 수 있습니다." />
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Product Information
          </p>
          <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
            UREVS O 제품 기본 정보
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ProductInfoItem label="제품명" value="UREVS O" />
            <ProductInfoItem label="영문명" value="UREVS O Wound Dressing" />
            <ProductInfoItem label="제품 구분" value="창상피복재" />
            <ProductInfoItem label="제품 형태" value="필름 타입 드레싱 제품" />
            <ProductInfoItem label="사용 목적" value="상처 부위 보호 및 드레싱 관리" />
            <ProductInfoItem label="제품 특징" value="투명 타입, 드레싱 관리, 규격 선택 가능" />
            <ProductInfoItem label="허가번호" value="제품 허가증 확인 후 입력" />
            <ProductInfoItem label="제조사" value="제품 자료 확인 후 입력" />
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-500">
            위 제품 정보는 현재 홈페이지 구성용 초안이며, 최종 문구는 제품 허가증, 사용설명서, 카탈로그 자료 확인 후 수정됩니다.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Product Images</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
              제품 이미지 및 자료 영역
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              현재는 임시 이미지가 표시되어 있으며, 실제 제품 사진이 준비되면 동일한 파일명으로 교체하여 반영할 수 있습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ProductImageCard src="/images/urevs-o-product.svg" title="제품 정면 이미지" description="UREVS O 제품 본품 사진으로 교체 예정" />
            <ProductImageCard src="/images/urevs-o-package.svg" title="제품 포장 이미지" description="제품 박스 또는 포장 사진으로 교체 예정" />
            <ProductImageCard src="/images/urevs-o-detail.svg" title="제품 상세 이미지" description="제품 규격 또는 상세 사진으로 교체 예정" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Before Use</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">사용 전 확인하세요</h2>
              <p className="mt-5 leading-8 text-slate-300">
                제품 포장 상태와 유효기간을 확인한 후 사용하세요. 사용 중 이상 반응이 있거나 상처 상태가 악화되는 경우
                사용을 중지하고 전문가와 상담하세요.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {["제품 포장 및 유효기간 확인", "사용 부위 정리", "제품 개봉", "필요한 부위에 부착", "사용 중 상태 확인", "이상 반응 시 사용 중지 및 상담"].map((step, index) => (
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
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
              국내·해외 문의 접수
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
              국내 구매/납품 문의와 해외 총판/수입 문의를 구분하여 접수합니다.
            </p>
          </div>

          {submitStatus === "error" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              문의 저장에 실패했습니다: {errorMessage}
            </div>
          )}

          {submitStatus === "domestic-success" && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700">
              국내 문의가 정상 접수되었습니다.
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
              <h3 className="mt-3 text-2xl font-extrabold text-slate-950">국내 구매 및 납품 문의</h3>
              <p className="mt-4 leading-8 text-slate-600">
                개인 구매, 병원 납품, 약국 입점, 의료소모품 업체 도매 문의를 접수합니다.
              </p>

              <form onSubmit={handleDomesticSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput label="이름" name="name" placeholder="홍길동" required />
                  <FormInput label="회사/병원명" name="company" placeholder="OO병원 / OO약국" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput label="연락처" name="phone" placeholder="010-0000-0000" required />
                  <FormInput label="이메일" name="email" type="email" placeholder="example@email.com" required />
                </div>
                <FormSelect
                  label="문의 유형"
                  name="inquiryType"
                  options={["개인 구매 문의", "병원 납품 문의", "약국 입점 문의", "의료소모품 업체 도매 문의", "대량 구매 문의"]}
                  required
                />
                <FormInput label="예상 수량" name="quantity" placeholder="예: 10개 / 100개 / 박스 단위" />
                <FormTextarea label="문의 내용" name="message" placeholder="제품 규격, 구매 목적, 납품 희망 일정 등을 입력해주세요." required />
                <ConsentCheck />
                <button type="submit" className="w-full rounded-full bg-blue-700 px-7 py-3 text-sm font-bold text-white hover:bg-blue-800">
                  국내 문의 접수하기
                </button>
              </form>
            </div>

            <div id="global" className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Global Inquiry</p>
              <h3 className="mt-3 text-2xl font-extrabold">Global Distribution Inquiry</h3>
              <p className="mt-4 leading-8 text-slate-300">
                Product availability and regulatory status may vary by country.
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
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">자주 묻는 질문</h2>
        </div>

        <div className="mt-12 space-y-4">
          <FaqItem question="UREVS O는 어떤 제품인가요?" answer="상처 부위 보호와 드레싱 관리를 위해 사용하는 창상피복재입니다." />
          <FaqItem question="개인도 구매할 수 있나요?" answer="판매 가능 여부와 구매 방식은 제품 규격, 유통 조건, 관련 신고 여부 확인 후 안내됩니다." />
          <FaqItem question="병원 납품이 가능한가요?" answer="병원, 약국, 의료소모품 업체 납품 문의를 접수할 수 있습니다." />
          <FaqItem question="해외 수출이 가능한가요?" answer="국가별 의료기기 등록 및 수입 규정이 다르므로, 대상 국가 확인 후 안내가 필요합니다." />
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
                <p>회사정보: 사업자등록 후 입력 예정</p>
                <p>사업자등록번호: 등록 후 입력 예정</p>
                <p>의료기기 판매업 신고번호: 신고 후 입력 예정</p>
                <p>제품 문의: 문의폼을 통해 접수</p>
              </div>
              <div>
                <p>주소: 등록 후 입력 예정</p>
                <p>전화번호: 등록 후 입력 예정</p>
                <p>이메일: 등록 후 입력 예정</p>
                <p>광고심의 관련 표시: 확인 후 입력</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            <p>본 페이지의 제품 설명은 최종 허가사항, 사용설명서, 광고심의 결과에 따라 수정될 수 있습니다.</p>
            <a href="/privacy" className="mt-3 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-200">
              개인정보처리방침
            </a>
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

function ProductImageCard({ src, title, description }: { src: string; title: string; description: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <img src={src} alt={title} className="h-64 w-full object-cover" />
      </div>
      <h3 className="mt-5 text-xl font-extrabold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
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
        className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
          dark ? "border-white/10 bg-white/10 text-white" : "border-slate-200 bg-white text-slate-900"
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
          dark ? "border-white/10 bg-white/10 text-white" : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <option value="" className="text-slate-900">선택해주세요</option>
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
        className={`mt-2 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none ${
          dark ? "border-white/10 bg-white/10 text-white" : "border-slate-200 bg-white text-slate-900"
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
      <span>{dark ? "Consent to collection and use of personal information for inquiry response." : "문의 접수를 위한 개인정보 수집 및 이용에 동의합니다."}</span>
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
