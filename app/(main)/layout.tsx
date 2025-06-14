'use client';

import React, { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-dark-gradient">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}