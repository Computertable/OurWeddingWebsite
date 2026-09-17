"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Button, Divider, ENTRANCE, Eyebrow, Monogram } from "./ds";

export type Guest = {
  id?: string;
  first_name: string;
  last_name: string;
  rsvp_status: string | null;
  song_request?: string | null;
};

type GuestContextType = {
  guests: Guest[];
};

const GuestContext =
  createContext<GuestContextType | null>(null);

export function useGuests() {
  const context = useContext(GuestContext);

  if (!context) {
    throw new Error(
      "useGuests must be used inside EntryGate"
    );
  }

  return context;
}

export default function EntryGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [checkingStorage, setCheckingStorage] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedGuests =
      window.localStorage.getItem(
        "wedding_guest_data"
      );

    if (savedGuests) {
      try {
        const parsedGuests = JSON.parse(
          savedGuests
        );

        if (
          Array.isArray(parsedGuests) &&
          parsedGuests.length > 0
        ) {
          setGuests(parsedGuests);
        }
      } catch {
        window.localStorage.removeItem(
          "wedding_guest_data"
        );
      }
    }

    setCheckingStorage(false);
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedCode = code.trim().toLowerCase();

    if (!normalizedCode) {
      setError(
        "Please enter your invitation code."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/guests",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            unique_code:
              normalizedCode,
          }),
        }
      );

      // Read the response safely
      const contentType =
        response.headers.get(
          "content-type"
        );

      if (
        !contentType?.includes(
          "application/json"
        )
      ) {
        const text =
          await response.text();

        console.error(
          "Expected JSON but received:",
          text
        );

        throw new Error(
          `API returned non-JSON response (${response.status})`
        );
      }

      const result =
        await response.json();

      if (!response.ok) {
        setError(
          result.message ||
          "Unable to verify your invitation."
        );
        return;
      }

      if (
        !Array.isArray(result) ||
        result.length === 0
      ) {
        setError(
          "That code does not seem to match an invitation."
        );
        return;
      }

      setGuests(result);

      window.localStorage.setItem(
        "wedding_guest_data",
        JSON.stringify(result)
      );

      window.localStorage.setItem(
        "wedding_guest_code",
        normalizedCode
      );
    } catch (error) {
      console.error(
        "Invitation verification error:",
        error
      );

      setError(
        "Something went wrong while verifying your invitation."
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (checkingStorage) {
    return null;
  }

  if (guests.length > 0) {
    return (
      <GuestContext.Provider
        value={{ guests }}
      >
        {children}
      </GuestContext.Provider>
    );
  }

  return (
    <main className="ds-surface-dark relative min-h-[100svh] overflow-hidden">
      <Image
        src="/hero-couple.JPG"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover object-center"
      />

      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--surface-overlay)" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--scrim-hero)" }} />

      <section
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center text-center"
        style={{ padding: "var(--space-8) var(--section-x)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: ENTRANCE }}
          className="flex flex-col items-center"
        >
          <Monogram
            decorative
            style={{ height: 88, backgroundColor: "var(--text-on-dark)" }}
          />
          <Eyebrow tone="onDark" className="mt-8">
            Private invitation
          </Eyebrow>
          <h1 className="ds-display ds-display--xl ds-display--on-dark ds-script mt-3">
            Sofia &amp; Joshua
          </h1>
        </motion.div>

        <Divider tone="onDark" ornament className="my-8 w-full max-w-[220px]" />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: ENTRANCE }}
          className="w-full max-w-sm"
          noValidate
        >
          <label
            htmlFor="guest-code"
            className="ds-body ds-body--lg ds-body--italic ds-body--on-dark mb-4 block"
          >
            Enter your invitation code
          </label>

          <input
            id="guest-code"
            name="guest-code"
            type="text"
            value={code}
            onChange={(event) => {
              setCode(event.target.value.toLowerCase());
              setError("");
            }}
            placeholder="Your code"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "guest-code-error" : undefined}
            className="ds-gate-input"
          />

          <AnimatePresence>
            {error && (
              <motion.p
                id="guest-code-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="ds-body ds-body--sm mt-3"
                style={{ color: "var(--gold-300)" }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <Button type="submit" tone="onDark" disabled={isLoading} className="mt-8">
            {isLoading ? "Checking…" : "Enter"}
          </Button>
        </motion.form>

        <p className="ds-body ds-body--italic mt-8 max-w-[30ch]" style={{ color: "var(--text-on-dark-muted)" }}>
          A small word from a shared memory will open the invitation.
        </p>
      </section>
    </main>
  );
}
