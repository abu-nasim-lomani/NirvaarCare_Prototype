'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface A11yCtx { fontSize: number; contrast: boolean; incFont: () => void; decFont: () => void; toggleContrast: () => void; }

const A11yContext = createContext<A11yCtx>({ fontSize: 100, contrast: false, incFont: () => { }, decFont: () => { }, toggleContrast: () => { } });

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [fontSize, setFontSize] = useState(100);
    const [contrast, setContrast] = useState(false);

    useEffect(() => {
        document.body.style.fontSize = fontSize + '%';
        document.body.classList.toggle('high-contrast', contrast);
        document.body.classList.toggle('large-font', fontSize > 100);
    }, [fontSize, contrast]);

    return (
        <A11yContext.Provider value={{
            fontSize, contrast,
            incFont: () => setFontSize(f => Math.min(f + 10, 140)),
            decFont: () => setFontSize(f => Math.max(f - 10, 90)),
            toggleContrast: () => setContrast(c => !c),
        }}>
            {children}
        </A11yContext.Provider>
    );
}

export const useA11y = () => useContext(A11yContext);
