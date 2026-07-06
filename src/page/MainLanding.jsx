import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EduTalksLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="font-sans text-slate-900 overflow-x-hidden bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
            : "bg-white/80 backdrop-blur-xl border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                🎓
              </div>
              <span className="text-2xl font-extrabold text-slate-900">
                EduTalks
              </span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-8 items-center">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>

            <div className="hidden md:flex gap-3 items-center">
              <Link
                to="/login"
                className="px-5 py-2.5 text-slate-600 border border-slate-200 rounded-lg font-semibold text-sm hover:border-indigo-500 hover:text-indigo-500 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-semibold text-sm hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2"
              >
                Get Started →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl text-slate-900"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-28 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] bg-gradient-radial from-indigo-500/5 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-500 text-sm font-semibold mb-6 animate-fade-in-down">
            ✨ Powered by Advanced AI Technology
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight animate-fade-in-up">
            Empower Learning Through
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              AI-Driven Discussions
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay">
            Transform your study materials into intelligent discussions and
            comprehensive question papers. Upload notes, collaborate with peers,
            and let AI revolutionize your learning experience.
          </p>

          <div className="flex gap-4 justify-center mb-16 animate-fade-in-up-delay-2">
            <button className="px-8 py-4 bg-indigo-500 text-white rounded-xl font-semibold text-base hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              Start Free Trial →
            </button>
            <button className="px-8 py-4 bg-transparent text-slate-600 border border-slate-200 rounded-xl font-semibold text-base hover:border-indigo-500 hover:text-indigo-500 transition-all">
              Watch Demo
            </button>
          </div>

          <div className="max-w-6xl mx-auto animate-fade-in-up-delay-3">
            <div className="w-full h-[600px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10">
              <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
              </div>
              <div className="p-10 grid grid-cols-[250px_1fr] gap-6 h-[calc(100%-40px)]">
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="h-10 bg-indigo-500/20 rounded-md"></div>
                  <div className="h-10 bg-indigo-500/20 rounded-md"></div>
                  <div className="h-10 bg-indigo-500/20 rounded-md"></div>
                </div>
                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <div className="h-3 bg-white/10 rounded"></div>
                  <div className="h-3 bg-white/10 rounded w-3/5"></div>
                  <div className="h-3 bg-white/10 rounded"></div>
                  <div className="h-3 bg-white/10 rounded w-3/5"></div>
                  <div className="h-3 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-extrabold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-white/60">Active Students</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                2M+
              </div>
              <div className="text-white/60">Questions Generated</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                15K+
              </div>
              <div className="text-white/60">Discussions Created</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-white/60">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 1: AI Discussion Creation */}
      <section id="features" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                AI Discussion Creation
              </span>
              <h2 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Start Intelligent Discussions in Seconds
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Create engaging discussions from sheets, uploaded documents, or
                general topics. Our AI understands context and facilitates
                meaningful learning conversations.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Launch discussions from previously generated question sets",
                  "Convert any document into a structured discussion",
                  "Start free-form educational conversations on any topic",
                  "AI moderates and suggests relevant discussion points",
                  "Collaborate with students and teachers in real-time",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="w-6 h-6 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Try Discussion Creator →
              </button>
            </div>

            <div className="relative">
              <div className="w-full h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-3 mb-6">
                    <div className="px-4 py-2 bg-indigo-500/10 text-indigo-500 rounded-lg text-sm font-semibold">
                      From Sheet
                    </div>
                    <div className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">
                      From Document
                    </div>
                    <div className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">
                      General
                    </div>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-5 mb-4 border border-slate-200"
                    >
                      <div className="h-5 bg-slate-900 rounded w-4/5 mb-3"></div>
                      <div className="h-3.5 bg-slate-400/30 rounded w-3/5"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Question Paper Generator */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="md:order-2">
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Question Paper Generator
              </span>
              <h2 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Generate Comprehensive Question Papers with AI
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Transform discussions and study materials into professional
                question papers. Create MCQs, short questions, long questions,
                and true/false tests automatically.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Multiple question formats: MCQ, Short, Long, True/False",
                  "AI ensures questions cover all key concepts",
                  "Difficulty levels from basic to advanced",
                  "Instant paper generation from any discussion",
                  "Export to PDF, Word, or print directly",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="w-6 h-6 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Generate Questions →
              </button>
            </div>

            <div className="relative md:order-1">
              <div className="w-full h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-b from-white to-slate-50 h-full">
                  <div className="text-center mb-8">
                    <div className="h-6 bg-slate-900 rounded w-3/5 mx-auto mb-3"></div>
                    <div className="h-4 bg-slate-400/30 rounded w-2/5 mx-auto"></div>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-5 mb-4 border border-slate-200"
                    >
                      <div className="h-4.5 bg-indigo-500 rounded w-1/3 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3.5 bg-slate-400/20 rounded"></div>
                        <div className="h-3.5 bg-slate-400/20 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Document Upload */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Document Upload & Analysis
              </span>
              <h2 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Upload Any Document, Get Instant Insights
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Upload books, PDFs, lecture notes, or study guides. Our AI
                analyzes the content and creates intelligent discussions and
                question papers from your materials.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Support for PDF, DOCX, TXT, and image files",
                  "OCR technology for scanned documents",
                  "AI extracts key concepts and themes",
                  "Automatic content categorization",
                  "Secure cloud storage for all your materials",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="w-6 h-6 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Upload Document →
              </button>
            </div>

            <div className="relative">
              <div className="w-full h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex items-center justify-center p-10">
                <div className="w-full h-[300px] border-2 border-dashed border-indigo-500 rounded-2xl flex flex-col items-center justify-center gap-4 bg-indigo-500/5">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-4xl text-white">
                    📄
                  </div>
                  <div className="text-center">
                    <div className="h-4.5 bg-slate-900 rounded w-48 mx-auto mb-2"></div>
                    <div className="h-3.5 bg-slate-400/30 rounded w-36 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Sheet Management */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="md:order-2">
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Smart Organization
              </span>
              <h2 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Organize Everything with Smart Sheets
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Keep your study materials organized in sheets. Each sheet can
                hold multiple paper scripts generated from discussions or
                documents. Track progress and share with peers.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Create unlimited sheets for different subjects",
                  "Store multiple question papers in each sheet",
                  "Version control for all your documents",
                  "Share sheets with study groups or classes",
                  "Track completion and performance metrics",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="w-6 h-6 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Explore Sheets →
              </button>
            </div>

            <div className="relative md:order-1">
              <div className="w-full h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-3 mb-6">
                    <div className="px-4 py-2 bg-indigo-500/10 text-indigo-500 rounded-lg text-sm font-semibold">
                      My Sheets
                    </div>
                    <div className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">
                      Shared
                    </div>
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-5 mb-4 border border-slate-200"
                    >
                      <div className="h-5 bg-slate-900 rounded w-4/5 mb-3"></div>
                      <div className="h-3.5 bg-slate-400/30 rounded w-3/5"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 5: Collaboration */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Collaborative Learning
              </span>
              <h2 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Learn Together, Achieve More
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Join study groups, participate in topic-based discussions, and
                collaborate with students and teachers worldwide. AI facilitates
                productive conversations and knowledge sharing.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Join public or create private discussion groups",
                  "Real-time collaboration on documents and questions",
                  "Peer review and feedback system",
                  "Teacher-moderated study sessions",
                  "Achievement badges and leaderboards",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="w-6 h-6 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Join Community →
              </button>
            </div>

            <div className="relative">
              <div className="w-full h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="p-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-5 mb-4 border border-slate-200"
                    >
                      <div className="h-5 bg-slate-900 rounded w-4/5 mb-3"></div>
                      <div className="h-3.5 bg-slate-400/30 rounded w-3/5"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 6: Analytics */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="md:order-2">
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Performance Analytics
              </span>
              <h2 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Track Progress with Deep Insights
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Understand your learning patterns with comprehensive analytics.
                Track completion rates, identify weak areas, and get
                personalized recommendations for improvement.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Detailed performance dashboards",
                  "Subject-wise strength analysis",
                  "Study time tracking and recommendations",
                  "AI-powered learning path suggestions",
                  "Compare progress with peers (anonymously)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="w-6 h-6 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                View Analytics →
              </button>
            </div>

            <div className="relative md:order-1">
              <div className="w-full h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-b from-white to-slate-50 h-full">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-5 mb-4 border border-slate-200"
                    >
                      <div className="h-4.5 bg-indigo-500 rounded w-1/3 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3.5 bg-slate-400/20 rounded"></div>
                        <div className="h-3.5 bg-slate-400/20 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold mb-4">
              Loved by Students and Teachers Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands who've transformed their learning experience with
              EduTalks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Medical Student, Harvard",
                text: "EduTalks has completely revolutionized how I prepare for exams. The AI-generated questions are incredibly relevant and the discussion feature helps me understand complex topics through peer learning.",
                avatar: "SM",
              },
              {
                name: "James Chen",
                role: "Physics Teacher, Stanford High",
                text: "As a teacher, EduTalks saves me hours every week. I can create diverse question papers from class discussions in minutes, and my students are more engaged than ever before.",
                avatar: "JC",
              },
              {
                name: "Aisha Patel",
                role: "Engineering Student, MIT",
                text: "The document upload feature is a game-changer. I upload my lecture notes and instantly get practice questions. It's like having a personal tutor available 24/7!",
                avatar: "AP",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all"
              >
                <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start free and scale as you grow. No credit card required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-10 transition-all hover:shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-slate-600 mb-6">
                Perfect for trying out EduTalks
              </p>
              <div className="text-6xl font-extrabold text-slate-900 mb-6">
                $0
                <span className="text-xl font-medium text-slate-600">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "5 document uploads per month",
                  "10 AI question generations",
                  "Join unlimited discussions",
                  "3 sheets maximum",
                  "Basic analytics",
                  "Community support",
                  "1GB cloud storage",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-3 border-b border-slate-100 text-slate-600"
                  >
                    <span className="w-5 h-5 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 border-2 border-slate-200 text-slate-600 rounded-lg font-semibold hover:border-indigo-500 hover:text-indigo-500 transition-all">
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border-2 border-indigo-500 rounded-3xl p-10 relative transform md:scale-105 shadow-xl shadow-indigo-500/15">
              <div className="absolute -top-3 right-10 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-semibold uppercase">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-slate-600 mb-6">
                For serious learners and educators
              </p>
              <div className="text-6xl font-extrabold text-slate-900 mb-6">
                $9
                <span className="text-xl font-medium text-slate-600">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited document uploads",
                  "Unlimited AI generations",
                  "Priority discussion access",
                  "Unlimited sheets",
                  "Advanced analytics & insights",
                  "Priority support",
                  "10GB cloud storage",
                  "Export to all formats",
                  "Collaboration tools",
                  "Custom branding",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-3 border-b border-slate-100 text-slate-600"
                  >
                    <span className="w-5 h-5 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                Start Free Trial →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join 50,000+ students and teachers who are already using EduTalks to
            achieve their academic goals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-base hover:bg-slate-100 transition-all">
              Start Free Trial →
            </button>
            <button className="px-8 py-4 bg-transparent text-white border border-white/30 rounded-xl font-semibold text-base hover:border-white transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-800 text-white/70 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🎓
                </div>
                <span className="text-2xl font-extrabold text-white">
                  EduTalks
                </span>
              </div>
              <p className="mb-6 leading-relaxed">
                Empowering learners worldwide through AI-driven discussions and
                collaborative study tools.
              </p>
              <div className="flex gap-3">
                {["in", "𝕏", "▶", "f"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-all"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-5">Product</h4>
              <ul className="space-y-3">
                {[
                  "Features",
                  "Pricing",
                  "Dashboard",
                  "API",
                  "Integrations",
                ].map((item, i) => (
                  <li key={i}>
                    <button className="hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Blog", "Careers", "Press", "Partners"].map(
                  (item, i) => (
                    <li key={i}>
                      <button className="hover:text-white transition-colors">
                        {item}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-5">Resources</h4>
              <ul className="space-y-3">
                {[
                  "Documentation",
                  "Help Center",
                  "Community",
                  "Webinars",
                  "Status",
                ].map((item, i) => (
                  <li key={i}>
                    <button className="hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/10 text-center text-sm">
            <p>
              © 2025 EduTalks. All rights reserved. Built with ❤️ for learners
              worldwide.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
       
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
       
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease;
        }
       
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease 0.1s backwards;
        }
       
        .animate-fade-in-up-delay {
          animation: fade-in-up 0.6s ease 0.2s backwards;
        }
       
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.6s ease 0.3s backwards;
        }
       
        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 0.8s ease 0.4s backwards;
        }
       
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
