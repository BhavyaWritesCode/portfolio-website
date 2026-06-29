"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import CountUp from "@/components/ui/CountUp";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { PERSONAL, STATS, CURRENTLY, INTERESTS } from "@/lib/constants";
import { Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function AboutClient() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(168, 200, 255,0.04)",
    border: "1px solid rgba(168, 200, 255,0.2)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <>
            {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "48px",
          marginBottom: "80px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* LEFT — Identity Panel */}
        <GlassCard style={{ padding: "32px", textAlign: "center" }}>
          {/* Profile photo */}
          <div style={{ position: "relative", marginBottom: "24px", display: "inline-block" }}>
            {/* Rotating amber ring */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-6px",
                borderRadius: "50%",
                border: "2px solid var(--starlight)",
                animation: "spinRing 8s linear infinite",
                boxShadow: "0 0 16px rgba(168, 200, 255,0.3)",
              }}
            />
            {/* Violet glow behind */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(157,0,255,0.2) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                animation: "irisReveal 0.8s var(--ease-out) 0.3s both",
              }}
            >
              <Image
                src="/avatar.jpg"
                alt={`${PERSONAL.name} profile photo`}
                width={160}
                height={160}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority
                onError={(e) => {
                  // Fallback to initials if image missing
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<div style="width:160px;height:160px;border-radius:50%;background:rgba(168, 200, 255,0.1);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:48px;color:var(--starlight);">BS</div>`;
                  }
                }}
              />
            </div>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            {PERSONAL.name}
          </h2>
          <p style={{ color: "var(--starlight)", fontSize: "14px", marginBottom: "16px", fontFamily: "var(--font-code)" }}>
            {PERSONAL.role}
          </p>

          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              background: "rgba(0,255,100,0.08)",
              border: "1px solid rgba(0,255,100,0.25)",
              borderRadius: "100px",
              marginBottom: "28px",
              fontSize: "12px",
              fontFamily: "var(--font-code)",
              color: "#00FF64",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00FF64",
                animation: "pulse-dot 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            Open to Internships
          </div>

          {/* Stats 2×2 grid */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}
            role="list"
            aria-label="Quick stats"
          >
            {[
            { label: "Projects", value: STATS.projects, suffix: "+" },
              { label: "Commits", value: 1000, suffix: "+" },
              { label: "Problems", value: STATS.leetcodeProblems, suffix: "+" },
              { label: "Repos", value: 20, suffix: "+" },
            ].map((stat) => (
              <GlassCard
                key={stat.label}
                role="listitem"
                style={{ padding: "14px 10px", textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "28px",
                    color: "var(--starlight)",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Social vertical */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Email", href: `mailto:${PERSONAL.email}`, icon: <Mail size={16} /> },
              { label: "LinkedIn", href: PERSONAL.linkedinUrl, icon: <FiLinkedin size={16} /> },
              { label: "GitHub", href: PERSONAL.githubUrl, icon: <FiGithub size={16} /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-code)",
                  fontSize: "13px",
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--starlight)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </GlassCard>

        {/* RIGHT — Content */}
        <div>
          <SectionHeader label="// about_me.java" title="About Me" />

          {/* Bio */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            <p style={{ marginBottom: "16px" }}>
              Hey — I&apos;m <strong style={{ color: "var(--text-primary)" }}>Bhavya</strong>.
            </p>
            <p style={{ marginBottom: "16px" }}>
              A fourth-year CS student,
              passionate about building AI-powered systems that are not just functional — but{" "}
              <em style={{ color: "var(--starlight)" }}>trustworthy</em>.
            </p>
            <p style={{ marginBottom: "16px" }}>
              I build things with <span style={{ color: "var(--starlight)" }}>Java, LangChain4j, and Python</span>
              {" "}— from AST-based code analysis engines to MCP servers that let Claude and ChatGPT interact with live data.
              Every project is a chance to go deeper, ship something real, and validate it works.
            </p>
            <p>
              This combination —{" "}
              <span style={{ color: "var(--starlight)" }}>backend depth + AI curiosity</span>
              {" "}— is what makes the work interesting, and what I bring to every problem.
            </p>
          </div>

          {/* Currently */}
          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "13px",
                color: "var(--starlight)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Currently
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {CURRENTLY.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 16px",
                    borderLeft: "2px solid var(--starlight)",
                    background: "rgba(168, 200, 255,0.03)",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <GlassCard variant="violet" style={{ padding: "20px 24px", marginBottom: "28px" }}>
            <h3
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "12px",
                color: "var(--violet)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Looking For
            </h3>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}
              className="looking-grid"
            >
              {[
                ["Role", PERSONAL.lookingFor],
                ["Stack", "Java · Spring Boot · LLMs · Docker · Cloud"],
                ["Location", `${PERSONAL.location} (Remote or On-site, open globally)`],
                ["Available", PERSONAL.availableFrom],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      marginBottom: "2px",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Interests */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "12px",
                color: "var(--text-muted)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Interests
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  style={{
                    padding: "6px 14px",
                    background: "rgba(168, 200, 255,0.06)",
                    border: "1px solid rgba(168, 200, 255,0.2)",
                    borderRadius: "100px",
                    fontFamily: "var(--font-code)",
                    fontSize: "12px",
                    color: "var(--text-code)",
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <SectionHeader label="// contact.form" title="Get In Touch" centered />
        <GlassCard style={{ padding: "40px" }}>
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}
              className="form-row"
            >
              <div>
                <label
                  htmlFor="name"
                  style={{ display: "block", fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--starlight)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(168, 200, 255,0.2)"; }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  style={{ display: "block", fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--starlight)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(168, 200, 255,0.2)"; }}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="subject"
                style={{ display: "block", fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                style={inputStyle}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--starlight)"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(168, 200, 255,0.2)"; }}
                placeholder="What's on your mind?"
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="message"
                style={{ display: "block", fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--starlight)"; }}
                onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(168, 200, 255,0.2)"; }}
                placeholder="Tell me about your project, opportunity, or just say hello..."
              />
            </div>

            <PrimaryButton
              type="submit"
              disabled={status === "sending"}
              id="contact-submit"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {status === "sending" ? "Sending..." : status === "success" ? "✓ Message Delivered!" : "Send Message →"}
            </PrimaryButton>

            {status === "error" && (
              <p style={{ marginTop: "12px", color: "var(--lava)", fontFamily: "var(--font-code)", fontSize: "13px", textAlign: "center" }}>
                Something went wrong. Please try again or email directly.
              </p>
            )}
          </form>
        </GlassCard>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .looking-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
