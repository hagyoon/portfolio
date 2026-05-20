"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Marquee({
  children,
  duration = 38,
  direction = "left",
}: {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
}) {
  const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-16 will-change-transform"
        animate={{ x }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      >
        <div className="flex gap-16 items-center">{children}</div>
        <div className="flex gap-16 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
