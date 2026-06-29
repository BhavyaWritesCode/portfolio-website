import type { Metadata } from "next";
import { OPEN_SOURCE_CONTRIBUTIONS, OWN_OPEN_SOURCE, PERSONAL } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import SkillBadge from "@/components/ui/SkillBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { GitMerge, GitPullRequest, Star, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Bhavya Saini's open source contributions — merged PRs, active projects, and GitHub activity.",
};

const STATUS_COLORS = {
  Merged: { color: "#00FFB2", bg: "rgba(0,255,178,0.1)", border: "rgba(0,255,178,0.25)" },
  Open: { color: "#F5A623", bg: "rgba(168, 200, 255,0.1)", border: "rgba(168, 200, 255,0.25)" },
  "Under Review": { color: "#9D00FF", bg: "rgba(157,0,255,0.1)", border: "rgba(157,0,255,0.25)" },
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Feature: <GitPullRequest size={12} />,
  "Bug Fix": <GitMerge size={12} />,
  Docs: <ExternalLink size={12} />,
  Performance: <ExternalLink size={12} />,
};

export default async function OpenSourcePage() {
  // Fetch GitHub stats
  let githubData = {
    username: PERSONAL.githubUsername,
    avatar: null as string | null,
    bio: "Backend Developer & AI Systems Engineer",
    followers: 0,
    publicRepos: 0,
    totalStars: 0,
    profileUrl: PERSONAL.githubUrl,
  };

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/github`, { next: { revalidate: 3600 } });
    if (res.ok) githubData = await res.json();
  } catch {
    // Use fallback data
  }

  return (
    <div
      style={{
        padding: "100px 5% 80px",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
      }}
      data-page="open-source"
    >
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(2, 2, 10, 0.4) 100%)"
      }} />
            <SectionHeader
        label="// open_source.contributions"
        title="Open Source"
        subtitle="Contributing to the ecosystem — bug fixes, features, docs, and my own projects."
      />

      {/* GitHub Identity Card */}
      <GlassCard style={{ padding: "32px", marginBottom: "48px" }}>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="github-identity">
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                border: "2px solid var(--starlight)",
                animation: "spinRing 8s linear infinite",
              }}
            />
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(168, 200, 255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                color: "var(--starlight)",
                overflow: "hidden",
              }}
            >
              {githubData.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={githubData.avatar} alt="GitHub avatar" width={80} height={80} style={{ objectFit: "cover" }} />
              ) : (
                "BS"
              )}
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
              @{githubData.username}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
              {githubData.bio}
            </div>
            <PrimaryButton href={githubData.profileUrl} id="view-github-profile">
              View GitHub Profile →
            </PrimaryButton>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "Stars", value: githubData.totalStars },
              { label: "Repos", value: githubData.publicRepos },
              { label: "Followers", value: githubData.followers },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "var(--starlight)", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Contributions */}
      <SectionHeader label="// pull_requests" title="Contributions" />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "64px" }}>
        {OPEN_SOURCE_CONTRIBUTIONS.map((contrib) => {
          const sc = STATUS_COLORS[contrib.status];
          return (
            <GlassCard
              key={contrib.id}
              spotlight
              style={{
                padding: "24px",
                transition: "transform 0.2s ease, border-color 0.2s",
              }}
              className="contrib-card"
            >
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                    {/* Status badge */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontFamily: "var(--font-code)",
                        fontSize: "11px",
                        color: sc.color,
                        background: sc.bg,
                        border: `1px solid ${sc.border}`,
                      }}
                    >
                      {contrib.status === "Merged" ? <GitMerge size={11} /> : <GitPullRequest size={11} />}
                      {contrib.status}
                    </span>
                    {/* Type badge */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontFamily: "var(--font-code)",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {TYPE_ICONS[contrib.type] ?? <ExternalLink size={11} />}
                      {contrib.type}
                    </span>
                  </div>

                  <a
                    href={contrib.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "14px",
                      color: "var(--starlight)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    {contrib.repo}
                  </a>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "12px" }}>
                    {contrib.description}
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {contrib.tech.map((t) => <SkillBadge key={t} label={t} />)}
                  </div>
                </div>
                <a
                  href={contrib.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View PR for ${contrib.repo}`}
                  className="pr-link"
                  style={{
                    flexShrink: 0,
                    padding: "8px 16px",
                    border: "1px solid rgba(168, 200, 255,0.25)",
                    borderRadius: "6px",
                    fontFamily: "var(--font-code)",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  PR Link →
                </a>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Own Open Source */}
      <SectionHeader label="// own_projects" title="My Projects" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="oss-grid">
        {OWN_OPEN_SOURCE.map((proj) => (
          <GlassCard
            key={proj.id}
            spotlight
            style={{ padding: "24px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <FiGithub size={20} style={{ color: "var(--starlight)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-code)", fontSize: "12px", color: "var(--text-muted)" }}>
                <Star size={12} /> {proj.stars}
              </div>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
              {proj.name}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
              {proj.description}
            </p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "100px",
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  color: "var(--starlight)",
                  background: "rgba(168, 200, 255,0.1)",
                  border: "1px solid rgba(168, 200, 255,0.2)",
                }}
              >
                {proj.language}
              </span>
              <a
                href={proj.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Star ${proj.name} on GitHub`}
                className="github-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
              >
                <Star size={12} /> Star on GitHub
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      <style>{`
        .contrib-card:hover {
          transform: translateX(6px) !important;
          border-color: rgba(168, 200, 255,0.35) !important;
        }
        .pr-link:hover {
          color: var(--starlight) !important;
          border-color: var(--starlight) !important;
        }
        .github-link:hover {
          color: var(--starlight) !important;
        }
        @media (max-width: 1024px) { .oss-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .oss-grid, .github-identity { flex-direction: column !important; grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
