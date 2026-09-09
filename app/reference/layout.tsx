import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference",
};

export default function Layout({ children }: LayoutProps<"/reference">) {
  return children;
}
