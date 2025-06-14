import React, { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-dark-gradient">
            {children}
        </div>
    );
} 