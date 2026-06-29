"use client";

import dynamic from "next/dynamic";



export const CustomCursor = dynamic(
  () => import("@/components/cursor/CustomCursor"),
  { ssr: false }
);

export const Preloader = dynamic(
  () => import("@/components/preloader/Preloader"),
  { ssr: false }
);

export const Navbar = dynamic(
  () => import("@/components/layout/Navbar"),
  { ssr: false }
);

export const Footer = dynamic(
  () => import("@/components/layout/Footer"),
  { ssr: false }
);

export const ChatbotWidget = dynamic(
  () => import("@/components/chatbot/ChatbotWidget"),
  { ssr: false }
);



export const EasterEggs = dynamic(
  () => import("@/components/easter-eggs/EasterEggs"),
  { ssr: false }
);

export const DistantPlanet = dynamic(
  () => import("@/components/three/DistantPlanet"),
  { ssr: false }
);







