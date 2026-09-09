import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Action Cards",
};

export default function Layout({ children }: LayoutProps<"/action-cards">) {
  return children;
}
