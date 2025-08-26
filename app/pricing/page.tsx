import React from "react";
import { Button } from "@/components/ui/button";

const PricingPage = () => {
  return (
    <main className="w-full flex justify-center items-center">
      <section className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-violet-500">
            Pricing
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Simple, transparent pricing that scales with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="group relative overflow-hidden rounded-2xl p-6 flex flex-col border bg-gradient-to-b from-sky-50 to-white dark:from-sky-900/30 dark:to-slate-900/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/30 to-transparent dark:from-sky-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Starter</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              For trying things out
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                $0
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-300">
                /mo
              </span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>✓ 100 messages / month</li>
              <li>✓ Community support</li>
              <li>✓ Basic models</li>
            </ul>
            <div className="mt-auto">
              <Button className="w-full mt-6 hover:translate-y-[-1px] transition-transform" variant="outline">
                Get started
              </Button>
            </div>
          </div>

          {/* Pro */}
          <div className="group relative overflow-visible rounded-2xl p-6 flex flex-col border-2 border-transparent shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
            <span className="absolute -top-3 right-4 z-10 text-xs bg-white/20 text-white px-2 py-1 rounded-md backdrop-blur">
              Most Popular
            </span>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_40%)] opacity-60" />
            <h2 className="relative text-xl font-bold">Pro</h2>
            <p className="relative mt-1 text-sm text-white/90">
              For daily power users
            </p>
            <div className="relative mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold">
                $12
              </span>
              <span className="text-sm text-white/80">
                /mo
              </span>
            </div>
            <ul className="relative mt-6 space-y-2 text-sm text-white/95">
              <li>✓ 5,000 messages / month</li>
              <li>✓ Priority support</li>
              <li>✓ Advanced models</li>
              <li>✓ Faster responses</li>
            </ul>
            <div className="relative mt-auto">
              <Button
                className="w-full mt-6 bg-white/15 hover:bg-white/25 text-white border border-white/20 hover:translate-y-[-1px] transition-all"
                variant="default"
              >
                Upgrade to Pro
              </Button>
            </div>
          </div>

          {/* Team */}
          <div className="group relative overflow-hidden rounded-2xl p-6 flex flex-col border bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/30 dark:to-slate-900/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/30 to-transparent dark:from-emerald-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Team</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              For small teams
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                $49
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-300">
                /mo
              </span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>✓ 25,000 messages / month</li>
              <li>✓ Shared history</li>
              <li>✓ Admin controls</li>
              <li>✓ SSO (Google)</li>
            </ul>
            <div className="mt-auto">
              <Button className="w-full mt-6 hover:translate-y-[-1px] transition-transform" variant="outline">
                Contact sales
              </Button>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-10 text-slate-500 dark:text-slate-300">
          Need a custom plan? Reach out at support@chatpika.app
        </p>
      </section>
    </main>
  );
};

export default PricingPage;