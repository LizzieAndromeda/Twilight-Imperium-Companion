import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracker",
};

export default function Layout({ children }: LayoutProps<"/tracker">) {
  return children;
}
