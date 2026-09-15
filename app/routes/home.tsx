import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "../lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Resume, KVItem } from "../../types/index";
import {
  Zap,
  TrendingUp,
  Eye,
  FileCheck,
  BarChart3,
  ArrowRight,
  Users,
  MessageSquare,
  Quote,
  Shield,
  CheckCircle2,
  Coffee
} from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Rizzumé - AI Resume Analyzer" },
    { name: "description", content: "Get brutally honest AI feedback on your resume. See what recruiters really think." },
  ];
}

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="h-screen px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight animate-fade-in">
            Your Resume <span className="text-white">Sucks</span>.
            <br />Let's Fix That.
          </h1>
          <p className="text-2xl md:text-3xl text-white/70 mb-12 max-w-4xl mx-auto font-light animate-slide-up animation-delay-200 py-2">
            Turn <span className="text-white font-medium">"made coffee"</span> into <span className="text-white font-medium">"orchestrated cross-functional initiatives generating 300% efficiency gains"</span>
          </p>

          <Link
            to="/upload"
            className="group relative inline-flex items-center gap-3 bg-white text-black font-bold px-12 py-6 rounded-2xl hover:bg-gray-200 transition-all duration-500 text-xl shadow-2xl hover:shadow-white/20 hover:scale-105 animate-scale-in animation-delay-400"
          >
            <span className="relative z-10">Fix My Resume</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>

      {/* What is Rizzume? Section */}
      <section className="min-h-screen px-4 py-20 my-8 flex items-center justify-center relative border-y border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto w-full text-center relative z-10 space-y-12">
          <h2 className="text-5xl md:text-7xl font-bold mb-20 tracking-tight animate-fade-in text-center">
            What is <span className="text-white">Rizzume</span>?
          </h2>

          <div className="relative animate-slide-up animation-delay-200 mx-auto">
            <div className="absolute -inset-4 bg-white/[0.08] rounded-3xl blur-xl opacity-50"></div>
            <div className="relative p-12 md:p-16 bg-black/50 backdrop-blur-sm border border-white/10 rounded-3xl max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-10 animate-fade-in-up animation-delay-300">
                <div className="text-center md:text-left">
                  <span className="text-white font-semibold bg-white/10 px-4 py-2 rounded-lg block text-lg md:text-2xl">"Responsible for making coffee"</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white/90 flex-shrink-0 my-2 md:my-0">
                  →
                </div>
                <div className="text-center md:text-left">
                  <span className="text-white font-semibold bg-gradient-to-r from-white/10 to-transparent px-4 py-2 rounded-lg block text-lg md:text-2xl border border-white/20">"Catalyzed 40% productivity boost through strategic beverage optimization"</span>
                </div>
              </div>

              <div className="mt-16 p-8 bg-gradient-to-r from-gray-900/10 to-gray-400/10 border border-white/20 rounded-2xl max-w-4xl mx-auto">
                <p className="text-2xl font-medium text-gray-300 py-2 animate-fade-in-up animation-delay-500 text-center">
                  We turn your boring job description into <span className="text-white font-bold">career ammunition</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is Rizzume For? Section */}
      <section className="min-h-screen px-4 flex items-center justify-center relative border-y border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              Who Is This <span className="text-white">For</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative animate-fade-in-up animation-delay-200">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <Users className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">Students</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-300">
                  Who think "Microsoft Office" is a skill
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in-up animation-delay-400">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <TrendingUp className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">Job Switchers</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-500">
                  Rebranding without the crisis
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in-up animation-delay-600">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <Eye className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">Intern Hunters</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-700">
                  More than "I breathe, therefore I am"
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in-up animation-delay-800">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <Zap className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">Professionals</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-900">
                  Making boring sound brilliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="min-h-screen px-4 flex items-center justify-center relative border-y border-white/10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Why This Doesn't <span className="text-white">Suck</span>
            </h2>
            <p className="text-2xl text-white/70 font-light animate-slide-up animation-delay-200 py-2">We don't just sound smart. <span className="text-white font-medium">We make you sound smart.</span></p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative animate-fade-in-up animation-delay-200">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <Shield className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">Privacy That Actually Matters</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-300">
                  Your data stays yours. We don't store it. Period.
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in-up animation-delay-300">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <FileCheck className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">ATS-Proof</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-400">
                  Human-sounding. ATS-surviving. Not mutually exclusive.
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in-up animation-delay-400">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <Zap className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">Achievements &gt; Responsibilities</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-500">
                  Stop listing job duties. Start proving value.
                </p>
              </div>
            </div>

            <div className="group relative md:col-span-2 animate-fade-in-up animation-delay-500">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <Eye className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">Pick Your Poison</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-600">
                  Professional, Confident, Witty, or Sarcastic. Choose your weapon.
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in-up animation-delay-600">
              <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/50 transition-all duration-300 group-hover:scale-105">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-fit mb-6 group-hover:bg-white/20 transition-colors">
                  <BarChart3 className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">No Fake Stuff</h3>
                <p className="text-white/70 group-hover:text-gray-300 transition-colors text-lg py-2 animate-fade-in-up animation-delay-700">
                  Credible. Measurable. Actually believable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="min-h-screen px-4 flex items-center justify-center relative border-y border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              Before vs <span className="text-white">After</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="group relative animate-slide-up animation-delay-200">
              <div className="absolute -inset-1 bg-white/20 rounded-3xl opacity-10 group-hover:opacity-30 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-white/30 rounded-3xl p-12 h-full hover:border-white/60 transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-6 h-6 rounded-full bg-white animate-pulse"></div>
                  <h3 className="text-3xl font-bold py-2 animate-fade-in-up animation-delay-200">Before</h3>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                  <p className="text-2xl text-gray-300 leading-relaxed font-light py-2 animate-fade-in-up animation-delay-300">
                    "Worked on social media for college fest."
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative animate-slide-up animation-delay-400">
              <div className="absolute -inset-1 bg-white/20 rounded-3xl opacity-10 group-hover:opacity-30 transition-all duration-500 blur-sm"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-white/30 rounded-3xl p-12 h-full hover:border-white/60 transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-6 h-6 rounded-full bg-white animate-pulse"></div>
                  <h3 className="text-3xl font-bold py-2 animate-fade-in-up animation-delay-400">After</h3>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                  <p className="text-2xl text-gray-300 leading-relaxed font-light py-2 animate-fade-in-up animation-delay-500">
                    "Generated 3× engagement increase through strategic digital campaigns."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Edge Section */}
      <section className="min-h-screen px-4 flex items-center justify-center relative border-y border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              Why We're <span className="text-white">Better</span>
            </h2>
          </div>

          <div className="relative animate-slide-up animation-delay-200">
            <div className="absolute -inset-4 bg-white/[0.08] rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-3">
                <div className="p-12 border-b md:border-b-0 md:border-r border-white/10">
                  <h3 className="text-3xl font-bold mb-8 text-center text-gray-300 py-2 animate-fade-in-up animation-delay-200">Others</h3>
                  <ul className="space-y-6 text-white/70">
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-300">
                      <span className="text-2xl text-gray-500">✗</span>
                      <span className="text-white/70">Generic AI garbage</span>
                    </li>
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-400">
                      <span className="text-2xl text-gray-500">✗</span>
                      <span className="text-white/70">Hoards your data</span>
                    </li>
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-500">
                      <span className="text-2xl text-gray-500">✗</span>
                      <span className="text-white/70">Makes shit up</span>
                    </li>
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-600">
                      <span className="text-2xl text-gray-500">✗</span>
                      <span className="text-white/70">Robotic tone</span>
                    </li>
                  </ul>
                </div>

                <div className="p-12 md:col-span-2 bg-gradient-to-br from-gray-500/10 to-white/5">
                  <h3 className="text-3xl font-bold mb-8 text-center text-white py-2 animate-fade-in-up animation-delay-200">Rizzume</h3>
                  <ul className="space-y-6 text-gray-300">
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-400">
                      <CheckCircle2 className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <span className="font-medium text-white/70 py-1">Personalized. Believable. Actually good.</span>
                    </li>
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-500">
                      <CheckCircle2 className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <span className="font-medium text-white/70 py-1">No backend. Your data = yours.</span>
                    </li>
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-600">
                      <CheckCircle2 className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <span className="font-medium text-white/70 py-1">Real achievements. Real metrics.</span>
                    </li>
                    <li className="flex items-start gap-4 text-lg animate-fade-in-up animation-delay-700">
                      <CheckCircle2 className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <span className="font-medium text-white/70 py-1">Sounds human. Gets you hired.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <p className="text-xl text-white/70 mb-6 font-light py-2 animate-fade-in">
              "A Final Jab"
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up animation-delay-200">
              Still scrolling?
            </p>
            <p className="text-xl text-white/70 mb-12 animate-slide-up animation-delay-400 py-2">
              This procrastination energy explains a lot.
            </p>

            <a
              href="https://github.com/yugnanda"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-5 rounded-2xl transition-all duration-300 text-xl shadow-2xl hover:shadow-white/30 hover:scale-105 animate-scale-in animation-delay-600"
            >
              <Coffee className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-center animate-fade-in animation-delay-800">
            <p className="text-white/70 py-2">&copy; 2025 Rizzumé. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
