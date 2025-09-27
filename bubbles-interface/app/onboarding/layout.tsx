import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started - Bubbles",
  description: "Welcome to Bubbles! Set up your account to start sending meaningful compliments.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}