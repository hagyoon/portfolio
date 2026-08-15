"use client";

/*
 * PasswordInput — a password field with a show/hide toggle.
 *
 * The toggle is a real button (keyboard reachable, announced via
 * aria-pressed) sitting inside the field's right edge. Revealing switches
 * the input to type="text" so browsers stop masking it; autoComplete is
 * passed through so password managers still recognise the field.
 */

import { useId, useState } from "react";

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete = "current-password",
  required,
  minLength,
  placeholder,
  hint,
  className = "",
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  hint?: string;
  className?: string;
}) {
  const [shown, setShown] = useState(false);
  const auto = useId();
  const inputId = id ?? auto;

  return (
    <div className={className}>
      <label className="admin-label" htmlFor={inputId}>
        {label}
        {hint && <span className="normal-case tracking-normal text-stone-400"> — {hint}</span>}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={shown ? "text" : "password"}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input !pr-20"
          // Keep the revealed value out of spellcheck/autocorrect noise
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button
          type="button"
          onClick={() => setShown((s) => !s)}
          aria-pressed={shown}
          aria-controls={inputId}
          title={shown ? "Hide password" : "Show password"}
          className="absolute right-0 top-0 h-full px-3 font-sans text-[10.5px] uppercase tracking-[0.14em] text-stone-400 hover:text-ink transition-colors cursor-pointer"
        >
          {shown ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
