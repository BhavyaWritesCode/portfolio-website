"use client";

import { useState } from "react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";
import type { PROJECT_CATEGORIES as PC } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import SkillBadge from "@/components/ui/SkillBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { ExternalLink, RotateCcw, Star } from "lucide-react";
import { FiGithub } from "react-icons/fi";

type Category = (typeof PC)[number];

/* ── Single Flip Card ─────────────────────────────────────── */
function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [flipped, setFlipped] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [sheen, setSheen] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    setTiltY((cx / (rect.width / 2)) * 12);
    setTiltX((-cy / (rect.height / 2)) * 12);
    setSheen({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };
  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <div
      className="card"
      data-cursor="card"
      style={{
        width: "100%",
        aspectRatio: "3/4",
        perspective: "1200px",
        cursor: "pointer",
      }}
      onClick={() => setFlipped((f) => !f)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={`${project.name} project card`}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease-in-out",
          transform: flipped
            ? "rotateY(180deg)"
            : `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "12px",
            overflow: "hidden",
            background: "rgba(14,14,26,0.6)",
            border: "1px solid rgba(168, 200, 255,0.18)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          {/* Specular sheen */}
          {!flipped && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `radial-gradient(200px circle at ${sheen.x}% ${sheen.y}%, rgba(168, 200, 255,0.08) 0%, transparent 70%)`,
                borderRadius: "inherit",
                zIndex: 0,
              }}
            />
          )}

          {/* Category badge */}
          <div style={{ position: "relative", zIndex: 1, marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "10px",
                padding: "3px 10px",
                borderRadius: "100px",
                background: "rgba(168, 200, 255,0.1)",
                border: "1px solid rgba(168, 200, 255,0.25)",
                color: "var(--starlight)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "var(--font-code)",
                  fontSize: "10px",
                  color: "var(--starlight)",
                }}
              >
                <Star size={10} fill="currentColor" /> FEATURED
              </span>
            )}
          </div>

          {/* Mini color accent */}
          <div
            aria-hidden="true"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: `radial-gradient(circle at 30% 30%, ${project.miniSceneColor}66 0%, ${project.miniSceneColor}11 100%)`,
              border: `1px solid ${project.miniSceneColor}44`,
              marginBottom: "16px",
              position: "relative",
              zIndex: 1,
            }}
          />

          <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px",
                lineHeight: 1.2,
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              {project.tagline}
            </p>

            {/* Tech badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
              {project.tech.slice(0, 4).map((t) => (
                <SkillBadge key={t} label={t} />
              ))}
              {project.tech.length > 4 && (
                <span className="skill-badge">+{project.tech.length - 4}</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", position: "relative", zIndex: 1 }}>
            {project.github && project.github !== "N/A" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.name} GitHub repository`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  border: "1px solid rgba(168, 200, 255,0.25)",
                  borderRadius: "6px",
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--starlight)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--starlight)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(168, 200, 255,0.25)";
                }}
              >
                <FiGithub size={12} /> GitHub
              </a>
            )}
            {project.live && project.live !== "N/A" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.name} live demo`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  border: "1px solid rgba(168, 200, 255,0.25)",
                  borderRadius: "6px",
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--starlight)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--starlight)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(168, 200, 255,0.25)";
                }}
              >
                <ExternalLink size={12} /> Live
              </a>
            )}
          </div>

          {/* Flip hint */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "12px",
              right: "14px",
              fontFamily: "var(--font-code)",
              fontSize: "9px",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            click to flip →
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "12px",
            background: "rgba(14,14,26,0.85)",
            border: "1px solid rgba(168, 200, 255,0.35)",
            backdropFilter: "blur(24px)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--starlight)",
              marginBottom: "12px",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "16px",
              flex: 1,
            }}
          >
            {project.description}
          </p>

          {/* Full tech stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {project.tech.map((t) => (
              <SkillBadge key={t} label={t} />
            ))}
          </div>

          {/* Timeline + achievement */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div>
              <div style={{ fontFamily: "var(--font-code)", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Built</div>
              <div style={{ fontFamily: "var(--font-code)", fontSize: "12px", color: "var(--text-secondary)" }}>{project.built}</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-code)", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Achievement</div>
              <div style={{ fontFamily: "var(--font-code)", fontSize: "12px", color: "var(--starlight)" }}>{project.achievement}</div>
            </div>
          </div>

          {/* Back buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {project.github && project.github !== "N/A" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", border: "1px solid var(--starlight)", borderRadius: "6px", fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--starlight)", textDecoration: "none" }}
              >
                <FiGithub size={12} /> GitHub →
              </a>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", border: "1px solid rgba(168, 200, 255,0.25)", borderRadius: "6px", fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)", background: "none", cursor: "pointer" }}
            >
              <RotateCcw size={12} /> ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Projects Client ─────────────────────────────────────── */
export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const featured = PROJECTS.find((p) => p.featured);

  return (
    <>
            <SectionHeader
        label="// projects.list"
        title="What I've Built"
        subtitle="From RAG pipelines to REST APIs — every project has a story."
      />

      {/* Featured banner */}
      {featured && (
        <div
          style={{
            marginBottom: "48px",
            padding: "32px",
            background: "rgba(14,14,26,0.6)",
            border: "1px solid rgba(168, 200, 255,0.3)",
            borderRadius: "16px",
            backdropFilter: "blur(20px)",
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
          className="featured-banner"
        >
          <div style={{ flex: 1 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(168, 200, 255,0.12)",
                border: "1px solid rgba(168, 200, 255,0.35)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontFamily: "var(--font-code)",
                fontSize: "11px",
                color: "var(--starlight)",
                marginBottom: "16px",
              }}
            >
              <Star size={11} fill="currentColor" /> FEATURED
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "32px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}
            >
              {featured.name}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-secondary)", marginBottom: "16px", maxWidth: "520px" }}>
              {featured.tagline}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {featured.tech.map((t) => <SkillBadge key={t} label={t} />)}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {featured.github && <PrimaryButton href={featured.github} id="featured-github">View on GitHub →</PrimaryButton>}
              {featured.live && featured.live !== "N/A" && <PrimaryButton href={featured.live} variant="ghost" id="featured-live">Live Demo</PrimaryButton>}
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-code)", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Key Achievement</div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--starlight)" }}>{featured.achievement}</div>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div
        role="tablist"
        aria-label="Project categories"
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "36px",
          flexWrap: "wrap",
        }}
      >
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            id={`filter-${cat.replace(/\s+/g, "-").replace(/\//g, "").toLowerCase()}`}
            style={{
              padding: "8px 20px",
              borderRadius: "100px",
              fontFamily: "var(--font-code)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeCategory === cat ? "var(--starlight)" : "transparent",
              color: activeCategory === cat ? "var(--void)" : "var(--text-muted)",
              borderColor: activeCategory === cat ? "var(--starlight)" : "rgba(168, 200, 255,0.25)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
        className="projects-grid"
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .featured-banner { flex-direction: column !important; }
        }
      `}</style>
    </>
  );
}
