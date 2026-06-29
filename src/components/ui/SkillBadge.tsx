"use client";

export default function SkillBadge({ label }: { label: string }) {
  return (
    <span
      className="skill-badge"
      role="listitem"
      aria-label={label}
    >
      {label}
    </span>
  );
}
