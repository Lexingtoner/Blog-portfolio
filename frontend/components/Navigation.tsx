'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  links?: { label: string; href: `#${string}`; keywords?: string[] }[];
  name?: string;
  numberOfLinks?: number;
}

type NavLink = Required<Required<NavigationProps>['links']>[number];

export const Navigation: React.FC<NavigationProps> = ({ links, name, numberOfLinks }) => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Хакерские дефолтные ссылки (с ключевыми словами)
  const defaultLinks: NavLink[] = useMemo(
    () => [
      { label: 'Terminal', href: '#Терминал', keywords: ['term', 'console', 'shell', 'cli', 'терминал'] },
      { label: 'Projects', href: '#Мои проекты', keywords: ['proj', 'work', 'repo', 'souls', 'проекты'] },
      { label: 'TechStack', href: '#Стек', keywords: ['stack', 'skills', 'tech', 'crests', 'стек'] },
      { label: 'Contacts', href: '#Контакты', keywords: ['contact', 'email', 'msg', 'messages, контакты'] },
      { label: 'Discord', href: '#Discord', keywords: ['chat', 'discord', 'community', 'covenant', 'сервер'] },
    ],
    []
  );

  // Эффективные ссылки с лимитом
  const effectiveNavLinks: NavLink[] = useMemo(() => {
    const base = links && links.length ? links : defaultLinks;
    const normalized = base.map((l) => ({
      ...l,
      keywords: l.keywords && l.keywords.length ? l.keywords : [l.label.toLowerCase()],
    }));
    const limit = numberOfLinks ? Math.max(1, Math.min(numberOfLinks, 5)) : normalized.length;
    return normalized.slice(0, limit);
  }, [links, defaultLinks, numberOfLinks]);

  const navNames = name || 'root@machine';

  // Переход по ссылке (якорь/роут)
  const navigateToHref = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.pushState(null, '', `#${id}`);
        setActiveHref(`#${id}`);
      }
    } else if (href.startsWith('/')) {
      router.push(href);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    e.preventDefault();
    navigateToHref(href);
  };

  // Отслеживание скролла и активной секции
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current: string | null = null;
      for (const l of effectiveNavLinks) {
        if (l.href.startsWith('#')) {
          const el = document.getElementById(l.href.slice(1));
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = l.href;
              break;
            }
          }
        }
      }
      setActiveHref(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [effectiveNavLinks]);

  // ====== Поиск по ключевым словам ======
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    // матч по label и keywords
    return effectiveNavLinks
      .map((l) => ({
        ...l,
        score:
          (l.label.toLowerCase().includes(q) ? 2 : 0) +
          (l.keywords?.some((k) => k.toLowerCase().includes(q)) ? 1 : 0),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [query, effectiveNavLinks]);

  const submitQuery = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    // Ищем точное совпадение keywords/label, иначе берем лучшую подсказку
    const exact =
      effectiveNavLinks.find(
        (l) =>
          l.label.toLowerCase() === q ||
          (l.keywords || []).some((k) => k.toLowerCase() === q)
      ) || suggestions[0];

    if (exact) {
      setShowSuggestions(false);
      setIsMenuOpen(false);
      navigateToHref(exact.href);
    }
  };

  // ====== UI ======
  return (
    <nav
      aria-label={navNames}
      className={`sticky top-0 z-[100] transition-all duration-700 border-b ${scrolled
        ? 'bg-[#02040A]/90 backdrop-blur-xl border-emerald-500/30 py-2 shadow-[0_4px_30px_rgba(2,255,170,0.15)]'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-sm blur-[6px] opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative w-full h-full border border-emerald-400/40 rounded-sm flex items-center justify-center bg-black">
              <span className="text-emerald-400 font-mono text-lg tracking-widest">{'>'}_</span>
            </div>
          </div>
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="text-base md:text-lg font-mono tracking-[0.15em] text-emerald-300 hover:text-emerald-200 transition-colors uppercase"
          >
            {navNames}
          </a>
        </div>

        {/* Search box (keyword navigation) */}
        <form
          onSubmit={submitQuery}
          className="relative hidden md:flex items-center min-w-[260px] max-w-[360px] w-full mx-6"
          role="search"
          aria-label="Keyword navigation"
        >
          <span className="pointer-events-none absolute left-3 text-emerald-500/70">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="введите ключевое слово"
            className="w-full bg-black/70 border border-emerald-500/30 text-emerald-200 placeholder-emerald-700/70 rounded-sm pl-8 pr-10 py-2 font-mono text-sm outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all"
          />
          <button
            aria-label="Go"
            className="absolute right-2 text-emerald-400 hover:text-emerald-200 transition-colors font-mono text-xs"
            type="submit"
          >
            ENTER
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-[110%] left-0 right-0 bg-[#030a07] border border-emerald-500/30 rounded-sm shadow-lg overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={`sugg-${s.href}`}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQuery('');
                    setShowSuggestions(false);
                    navigateToHref(s.href);
                  }}
                  className="w-full text-left px-3 py-2 text-emerald-200 hover:bg-emerald-900/20 font-mono text-sm flex items-center justify-between"
                >
                  <span>{s.label}</span>
                  <span className="text-emerald-500/70 text-xs">{s.href}</span>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {effectiveNavLinks.map((l) => {
            const isActive = activeHref === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`text-[11px] uppercase tracking-[0.25em] font-mono transition-all relative py-2 ${isActive
                  ? 'text-emerald-300'
                  : 'text-emerald-700 hover:text-emerald-300'
                  }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right: Auth & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-2">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <span className="hidden lg:block text-[10px] text-emerald-700 italic uppercase tracking-widest font-mono">
                  {user.firstName || 'anonymous'}
                </span>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        'w-8 h-8 border border-emerald-600/40 hover:border-emerald-400 transition-all shadow-[inset_0_0_10px_rgba(16,185,129,0.25)] rounded-sm',
                    },
                  }}
                />
              </div> 
            ) : (
              <SignInButton mode="modal">
                <button className="text-[10px] uppercase tracking-[0.25em] text-emerald-200 border border-emerald-700/50 px-4 py-2 hover:bg-emerald-900/20 hover:border-emerald-400 transition-all font-mono rounded-sm">
                  login
                </button>
              </SignInButton>
            )}
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`w-6 h-[1px] bg-emerald-400 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span className={`w-6 h-[1px] bg-emerald-400 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`w-6 h-[1px] bg-emerald-400 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile: search + nav */}
      <div
        className={`fixed inset-x-0 top-[100%] bg-black/95 border-b border-emerald-800/30 backdrop-blur-2xl transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-col p-6 gap-6">
          <form
            onSubmit={(e) => {
              submitQuery(e);
              setIsMenuOpen(false);
            }}
            className="relative flex items-center w-full"
          >
            <span className="pointer-events-none absolute left-3 text-emerald-500/70">/</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="поиск по ключевым словам"
              className="w-full bg-black/70 border border-emerald-700/40 text-emerald-200 placeholder-emerald-700/60 rounded-sm pl-8 pr-3 py-2 font-mono text-sm outline-none focus:border-emerald-400"
            />
          </form>

          <div className="flex flex-col gap-4 items-start">
            {effectiveNavLinks.map((l) => (
              <a
                key={`mob-${l.href}`}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-base font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-200 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};