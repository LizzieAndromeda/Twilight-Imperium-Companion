"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./FactionSymbol.module.css";

/**
 * A faction's symbol.
 *
 * The image is hot-linked from the wiki's CDN, so it can be missing, blocked
 * or slow. When it fails — or when a faction has no symbol recorded — this
 * falls back to a monogram in a ring, which keeps the layout stable and still
 * gives each faction a recognisable mark.
 */
export function FactionSymbol({
  src,
  name,
  size = 40,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  // "The Emirates of Hacan" -> "EH"; falls back to the first two letters.
  const initials =
    name
      .replace(/^The\s+/i, "")
      .split(/[\s-]+/)
      .filter((w) => /[a-z0-9]/i.test(w))
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || name.slice(0, 2).toUpperCase();

  if (!src || failed) {
    return (
      <span
        className={styles.fallback}
        style={{ width: size, height: size, fontSize: size * 0.36 }}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  }

  return (
    <span className={styles.frame} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={styles.image}
        onError={() => setFailed(true)}
        unoptimized
      />
    </span>
  );
}
