
"use client"

import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { logIn } from "@/lib/auth";
import InputField from "@/components/InputField";

export default function Authenticate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onClick = () => {
    if (email === "") {
      alert("Email is required");
      return;
    }
    setIsLoading(true);
    logIn(email).then((token) => {
      setIsLoading(false);
      Cookies.set("auth-verify-token", token, { expires: 1 });
      router.push("/authenticate/verify");
    }).catch((e) => {
      setIsLoading(false);
      alert(e.message);
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-4 max-w-80 mx-auto mt-4">
        <InputField onChange={(e => setEmail(e.target.value))} label="Email" type="email"></InputField>
        <Button isLoading={isLoading} onClick={onClick} className="w-full" text="Authenticate" />
      </div>
    </div>
  );
}
