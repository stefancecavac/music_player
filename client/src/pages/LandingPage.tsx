import type React from "react";
import { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";

export const LandingPage = () => {
  const { sendMagicLink, sendingMagicLinkSuccess, pendingMagicLink } = UseAuthContext();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sendMagicLink(email);
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl bg-black/20 backdrop-blur-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(124,58,237,0.3)] border border-white/10 overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-secondary w-fit mx-auto p-2.5 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8 text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-white"> PlayTube</h1>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center mt-10 text-center">
          <h2 className="text-white text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text  bg-gradient-to-r from-white to-purple-200">
            Discover Your Sound.
          </h2>
          <p className="text-purple-100/90 break-words w-full max-w-sm text-center leading-relaxed">
            PlayTube brings you a new way to discover, stream, and share music. Join Us!
          </p>
        </div>

        {!sendingMagicLinkSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-full mt-10">
            <h3 className="text-xl font-semibold text-white text-center">Get started now!</h3>
            <div className="flex flex-col gap-3">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  required
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/40 to-secondary/40 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10"></div>
              </div>
              <button
                type="submit"
                disabled={pendingMagicLink || !email}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary group-hover:scale-110 transition-transform duration-500"></span>
                <span className="relative">{pendingMagicLink ? "Processing..." : "Join Us"}</span>
              </button>
            </div>
            <p className="text-xs text-purple-200/70 text-center mt-3">We'll never share your email.</p>
          </form>
        ) : (
          <div className="mt-10 p-6 rounded-lg bg-white/10 border border-white/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Magic link sent!</h3>
            <p className="text-purple-100">Check your email for further instructions.</p>
          </div>
        )}

        <div className="flex justify-center gap-1 mt-10">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="w-1.5 h-8 bg-gradient-to-t from-primary to-secondary rounded-full"
              style={{
                animation: `soundBars 1.2s ease-in-out infinite ${i * 0.1}s`,
                transformOrigin: "bottom",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
