import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technologies",
};

export default function Layout({ children }: LayoutProps<"/technologies">) {
  return children;
}
