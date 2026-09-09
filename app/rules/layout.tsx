import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules",
};

export default function Layout({ children }: LayoutProps<"/rules">) {
  return children;
}
