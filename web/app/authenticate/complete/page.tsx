"use client"

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import InputField from "@/components/InputField";
import { useState } from "react";
import Button from "@/components/Button";
import { completeAccountCreate } from "@/lib/auth";

export default function CompleteAccountPage() {
  const router = useRouter();
  const token = Cookies.get("auth-verify-token");
  const code = Cookies.get("auth-verify-code");
  const [username, setUsername] = useState("");

  if (!token || !code) {
    router.push("/authenticate");
    return null;
  }

  const submit = async () => {
    await completeAccountCreate(token, code, username, "Unknown")
      .then((session) => {
        Cookies.set("session", session, { expires: 1 });
      })
  }

  return (
    <div className="max-w-80 mx-auto">
      <InputField onChange={(e) => setUsername(e.target.value)} label="Username" />
      <Button text="Complete" onClick={() => submit()} />
    </div>
  )
}
