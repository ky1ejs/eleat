"use client";

import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import Button from "@/components/Button";
import { validateLogIn } from "@/lib/auth";
import { useRouter } from "next/navigation";


export default function Verify() {
  const router = useRouter();
  const params = useSearchParams();
  const urlCode = params.get("code");
  const [code, setCode] = useState(urlCode ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("auth-verify-token");

  if (!token) {
    router.push("/authenticate");
    return null;
  }

  const submit = (token: string, code: string) => {
    setIsLoading(true);
    validateLogIn(token, code).then(() => {
      Cookies.set("auth-verify-code", code);
      router.push("/authenticate/complete");
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      alert(error.message);
    });
  }

  const keydown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    if (e.key === "Backspace" && index >= 0) {
      setCode((prev) => {
        const p = prev ?? ""
        return p.substring(0, index) + p.substring(index + 1)
      }
      );
      if (index > 0) {
        const input = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
        input.focus();
      }
    } else if (e.key.match(/[0-9]/) && index < 4) {
      setCode((prev) => {
        const p = prev ?? ""
        return p.substring(0, index) + e.key + p.substring(index + 1)
      });
      if (index < 3) {
        const input = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
        input.focus();
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 max-w-80 mx-auto mt-4">
        <div className="flex gap-2 mx-auto">
          {[...Array(4).keys()].map((i) => (
            <OtpInput
              key={i}
              id={`otp-${i}`}
              onKeydown={(e) => keydown(e, i)}
              value={code?.charAt(i)}
            />
          ))}
        </div>
        <Button text="Verify" className="w-full" onClick={() => submit(token, code)} isLoading={isLoading} />
      </div>
    </div>
  );
}

const OtpInput = ({ onKeydown, id, value }:
  {
    onKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    id: string,
    value?: string
  }) => (
  <div>
    <input
      id={id}
      className="bg-gray-200 w-10 h-12 text-4xl text-center text-black rounded-lg"
      onKeyDown={onKeydown}
      value={value}
    />
  </div>
);