"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Inquiry = {
  id: string;
  inquiry_source: "domestic" | "global";
  name: string;
  company: string | null;
  country: string | null;
  phone: string | null;
  email: string;
  inquiry_type: string;
  quantity: string | null;
  message: string;
  status: "접수" | "확인중" | "답변완료" | "보류";
  created_at: string;
};

const statusOptions = ["접수", "확인중", "답변완료", "보류"] as const;

export default function AdminInquiriesPage() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [sourceFilter, setSourceFilter] = useState<"all" | "domestic" | "global">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | Inquiry["status"]>("all");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const loggedIn = !!session;
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        fetchInquiries();
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getSession();
    const loggedIn = !!data.session;
    setIsLoggedIn(loggedIn);
    setSessionChecked(true);

    if (loggedIn) {
      fetchInquiries();
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("로그인 실패: " + error.message);
      return;
    }

    setEmail("");
    setPassword("");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setInquiries([]);
  }

  async function fetchInquiries() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage("문의 목록을 불러오지 못했습니다: " + error.message);
      setLoading(false);
      return;
    }

    setInquiries((data || []) as Inquiry[]);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Inquiry["status"]) {
    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("상태 변경 실패: " + error.message);
      return;
    }

    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  const filteredInquiries = inquiries.filter((item) => {
    const sourceMatched = sourceFilter === "all" || item.inquiry_source === sourceFilter;
    const statusMatched = statusFilter === "all" || item.status === statusFilter;
    return sourceMatched && statusMatched;
  });

  if (!sessionChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <p className="text-sm font-semibold text-slate-500">관리자 세션 확인 중...</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <section className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Admin Login
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950">
            문의 관리 로그인
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            관리자 계정으로 로그인하면 접수된 국내·해외 문의를 확인할 수 있습니다.
          </p>

          {errorMessage && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">이메일</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="admin@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-700">비밀번호</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="비밀번호"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-blue-700 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-800"
            >
              로그인
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
              UREVS O 문의 관리
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              국내 구매/납품 문의와 해외 총판/수입 문의를 확인하고 처리 상태를 변경합니다.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              홈페이지로 이동
            </a>
            <button
              onClick={fetchInquiries}
              className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
            >
              새로고침
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <SummaryCard title="전체 문의" value={inquiries.length} />
          <SummaryCard title="국내 문의" value={inquiries.filter((item) => item.inquiry_source === "domestic").length} />
          <SummaryCard title="해외 문의" value={inquiries.filter((item) => item.inquiry_source === "global").length} />
          <SummaryCard title="미처리 문의" value={inquiries.filter((item) => item.status !== "답변완료").length} />
        </div>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">문의 구분</span>
              <select
                value={sourceFilter}
                onChange={(event) => setSourceFilter(event.target.value as typeof sourceFilter)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">전체</option>
                <option value="domestic">국내 문의</option>
                <option value="global">해외 문의</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-700">처리 상태</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">전체</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              <div className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                표시 중: {filteredInquiries.length}건
              </div>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-8 space-y-5">
          {loading ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
              문의 목록을 불러오는 중입니다.
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
              표시할 문의가 없습니다.
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} onStatusChange={updateStatus} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-extrabold text-slate-950">{value}</p>
    </div>
  );
}

function InquiryCard({
  inquiry,
  onStatusChange,
}: {
  inquiry: Inquiry;
  onStatusChange: (id: string, status: Inquiry["status"]) => void;
}) {
  const createdAt = new Date(inquiry.created_at).toLocaleString("ko-KR");

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${
              inquiry.inquiry_source === "domestic"
                ? "bg-blue-50 text-blue-700"
                : "bg-cyan-50 text-cyan-700"
            }`}>
              {inquiry.inquiry_source === "domestic" ? "국내 문의" : "Global Inquiry"}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              {inquiry.inquiry_type}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
            {inquiry.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500">{createdAt}</p>
        </div>

        <label className="block min-w-40">
          <span className="text-sm font-bold text-slate-700">처리 상태</span>
          <select
            value={inquiry.status}
            onChange={(event) =>
              onStatusChange(inquiry.id, event.target.value as Inquiry["status"])
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoItem label="회사/병원명" value={inquiry.company || "-"} />
        <InfoItem label="국가" value={inquiry.country || "-"} />
        <InfoItem label="연락처" value={inquiry.phone || "-"} />
        <InfoItem label="이메일" value={inquiry.email} />
        <InfoItem label="예상 수량" value={inquiry.quantity || "-"} />
        <InfoItem label="문의 상태" value={inquiry.status} />
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-5">
        <p className="text-sm font-bold text-slate-700">문의 내용</p>
        <p className="mt-3 whitespace-pre-wrap leading-8 text-slate-700">
          {inquiry.message}
        </p>
      </div>
    </article>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-semibold text-slate-800">{value}</p>
    </div>
  );
}
