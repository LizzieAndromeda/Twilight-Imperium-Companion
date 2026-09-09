import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Factions",
};

export default function Layout({ children }: LayoutProps<"/factions">) {
  return children;
}
