"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel = "Working...", ...props }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} {...props}>
      {pending ? pendingLabel : children}
    </button>
  );
}
