'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'bn' | 'en';
interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (bn: string, en: string) => string; }

const LanguageContext = createContext<LangCtx>({ lang: 'bn', setLang: () => { }, t: (bn) => bn });

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>('bn');
    const t = (bn: string, en: string) => lang === 'bn' ? bn : en;
    return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
