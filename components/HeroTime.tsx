"use client";

import { useEffect, useState } from "react";

export default function HeroTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Singapore",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setTime(fmt.format(new Date()) + " SGT");
      } catch {
        setTime("");
      }
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}
