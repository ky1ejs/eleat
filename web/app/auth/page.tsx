"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const Login = () => {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailPassword = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      window.location.replace("/items");
    }
  };

  const handleLogin = async () => {
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        skipBrowserRedirect: true,
      },
    });
    window.location.replace(result.data.url!);
  };
  return (
    <div>
      <h1>Log In</h1>
      <p>
        To start making nutrition plans you need to log in or create an account.
      </p>
      <div className="mx-auto flex max-w-[400px] flex-col">
        Email
        <input
          type="email"
          className="rounded bg-gray-100 px-2 py-1"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        Password
        <input
          type="email"
          className="rounded bg-gray-100 px-2 py-1"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="rounded border-2 border-gray-500 px-3 py-1"
          onClick={handleEmailPassword}
        >
          Log In
        </button>
        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <button
          className="rounded border-2 border-gray-500 px-3 py-1"
          onClick={handleLogin}
        >
          Google
        </button>
      </div>
    </div>
  );
};

export default Login;
