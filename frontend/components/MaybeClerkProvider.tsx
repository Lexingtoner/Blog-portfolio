"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { combine } from "zustand/middleware";

export default function MaybeClerkProvider({ children }: { children: React.ReactNode}) {
    const envKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    // build a safe fallback publishable key whose third segment base64-decodes to a string
    // that ends with '$' so Clerk's internal parsing won't throw during atob.
    const safeThirdSegment = (() => {
        const payload = 'http://localhost:3000$';
        try {
            if (typeof btoa === 'function') return btoa(payload);
        } catch (e) {
            // ignore
        }
        try {
            const buf = (global as any).Buffer;
            if (buf && typeof buf.from === 'function') return buf.from(payload).toString('base64');
        } catch (e) {
            // ignore
        }
        // worst-case: hardcoded base64 for 'http://localhost:3000$'
        return 'aHR0cDovL2xvY2FsaG9zdDozMDAwJA==';
    })();

    const safeFallback = `pk_test_${safeThirdSegment}`;

    // simple validator for publishable keys
    const isLikelyValidKey = (key?: string) => {
        if (!key) return false;
        if (!key.startsWith('pk_')) return false;
        const parts = key.split('_');
        if (parts.length < 3) return false;
        const candidate = parts[2];
        try {
            if (typeof atob === 'function') {
                atob(candidate);
            } else if ((global as any).Buffer) {
                (global as any).Buffer.from(candidate, 'base64').toString();
            }
            return true;
        } catch (e) {
            return false;
        }
    };

    // If a valid publishable key is provided in env, initialize ClerkProvider.
    // Otherwise, avoid initializing Clerk to prevent runtime errors and invalid-key errors.
    // choose key: prefer valid envKey, otherwise use safe fallback so ClerkProvider is mounted
    const keyToUse = envKey && isLikelyValidKey(envKey) ? envKey : safeFallback;
    if (!envKey) {
        console.log(isLikelyValidKey(envKey));
        // eslint-disable-next-line no-console
        console.warn('Clerk publishable key not set. Using safe local fallback for development.');
    } else if (envKey && !isLikelyValidKey(envKey)) {
        // eslint-disable-next-line no-console
        console.warn('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set but does not look valid — using safe local fallback instead.');
    }

    return <ClerkProvider publishableKey={keyToUse}>{children}</ClerkProvider>;
}
