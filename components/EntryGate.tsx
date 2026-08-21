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

export type Guest = {
  id?: string;
  first_name: string;
  last_name: string;
  rsvp_status: string | null;
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
    <main className="relative min-h-[100svh] overflow-hidden bg-[#182015] text-[#fffaf0]">
      <Image
        src="/hero-couple.JPG"
        alt="Sofia and Joshua"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[#182015]/65" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,32,21,0.2),rgba(24,32,21,0.88))]" />

      <div className="absolute inset-x-5 bottom-5 top-5 border border-[#fffaf0]/20 md:inset-x-10 md:bottom-8 md:top-8" />

      <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">

        <motion.p
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-5 font-sans text-[10px] uppercase tracking-[0.42em] text-[#f2dfbd]"
        >
          Private Invitation
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="font-script text-[5.8rem] leading-[0.7] text-[#fffaf0] sm:text-[8rem] md:text-[11rem]"
        >
          Sofia

          <span className="-mt-5 block sm:-mt-8">
            Joshua
          </span>
        </motion.h1>

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.25,
          }}
          className="my-7 h-px w-24 bg-[#f2dfbd]/70"
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
          className="w-full max-w-sm"
        >
          <label
            htmlFor="guest-code"
            className="mb-4 block font-serif text-lg text-[#fffaf0]/90"
          >
            Enter your invitation code
          </label>

          <input
            id="guest-code"
            name="guest-code"
            type="text"
            value={code}
            onChange={(event) => {
              console.log(event.target.value.toLowerCase());
              setCode(event.target.value.toLowerCase());
              setError("");
            }}
            placeholder="Enter your code"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="h-12 w-full border border-[#fffaf0]/35 bg-[#fffaf0]/10 px-4 text-center font-sans text-sm uppercase tracking-[0.22em] text-[#fffaf0] outline-none backdrop-blur-md placeholder:text-[#fffaf0]/35 focus:border-[#f2dfbd]"
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: -4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                }}
                className="mt-3 text-xs text-[#f2dfbd]"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex min-h-11 items-center justify-center border border-[#f2dfbd]/70 px-8 font-sans text-[10px] uppercase tracking-[0.3em] text-[#fffaf0] transition hover:bg-[#f2dfbd] hover:text-[#182015] disabled:opacity-50"
          >
            {isLoading
              ? "Checking..."
              : "Enter"}
          </button>
        </motion.form>

        <p className="mt-8 max-w-xs font-serif text-sm leading-6 text-[#fffaf0]/62">
          A small word from a shared memory
          will open the invitation.
        </p>

      </section>
    </main>
  );
}