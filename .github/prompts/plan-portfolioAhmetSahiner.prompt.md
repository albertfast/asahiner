## Plan: Implement Ahmet Sahiner Portfolio TUR 1-8 Features

Complete the portfolio website rebuild and enhancements across 8 development turns (TUR), adding 20+ new components, updating existing ones, fixing bugs, and integrating advanced UI features like glass-card design, animations, and interactive elements.

**Steps**
1. Update data.ts: Add "Activity" to navLinks array between Projects and Research.
2. Create core UI components (TUR 1-3): PageLoader, BackToTop, ProjectModal, SkillsChart, GitHubStats, SectionDots, SectionDivider.
3. Create performance and utility components (TUR 4-5): ParticleField (replace Scene3D), CommandPalette, SectionReveal, Activity, ReadingList, ThemeCustomizer.
4. Create advanced interactive components (TUR 6-7): ScrollSpyProgress, InteractiveCodeBlock, MotivationalTicker, Testimonials, TimezoneClock.
5. Update Hero component: Integrate ParticleField background, enhance with social links, floating shapes, "Available for Opportunities" badge.
6. Update About component: Add SectionReveal wrapper, location/availability badge, floating status badge, GitHubGraph, blob-morph background.
7. Update Education component: Add icon-based cert cards, enhanced Dean list, section number 02.
8. Update Skills component: Integrate SkillsChart radar chart in 3-column layout.
9. Update Experience component: Rewrite with gradient timeline, expand/collapse, tech tags, "Present" badge.
10. Update Projects component: Add clickable cards with ProjectModal and GitHubStats integration.
11. Update Research component: Add tag pill glow, dot pattern banner, neon title underline.
12. Update Awards component: Add rotating icons, sparkle particles, pulsing rings, diagonal shine sweep.
13. Update Contact component: Rewrite with social cards, input icons, character count, success state, copy-to-clipboard for email, TimezoneClock in sidebar.
14. Update Footer component: Rewrite with gradient cycling words, tech stack row, social cards.
15. Update Navbar component: Add smooth theme transition, search trigger button (⌘K hint), enhanced mobile menu.
16. Update SectionHeading component: Add optional number prop, decorative side lines.
17. Remove Scene3D component (replaced by ParticleField in TUR 4).
18. Update page.tsx: Reorder components as per final structure, add SectionDividers between sections, integrate fixed widgets (ScrollProgress, BackToTop, SectionDots, CommandPalette, ThemeCustomizer, ScrollSpyProgress).
19. Update globals.css: Add all new CSS classes (blob-morph, gradient-border-subtle, ink-spread, neon-underline, glow-beneath, etc.), refine light mode styles.
20. Fix bugs: Education timeline dot positioning, Projects event propagation, Contact form absolute divider, mailto link target, MusicWidget keyframes, duplicate CSS classes.

**Relevant files**
- [src/lib/data.ts](src/lib/data.ts) — Update navLinks, confirm paragraphs match TUR 8.
- [src/app/page.tsx](src/app/page.tsx) — Restructure to include all components and SectionDividers.
- [src/components/portfolio/](src/components/portfolio/) — Create 20+ new components, update existing 10+.
- [src/app/globals.css](src/app/globals.css) — Add 30+ new CSS utility classes.

**Verification**
1. Run build and check for lint errors in all new/updated components.
2. Test page load: Verify PageLoader displays, then transitions to main content.
3. Test interactivity: CommandPalette (Cmd+K), ThemeCustomizer, ProjectModal on project click, SectionDots navigation.
4. Test animations: SectionReveal on scroll, MotivationalTicker, SkillsChart radar, ParticleField particles.
5. Test responsiveness: Mobile menu, SectionDots hidden on small screens, ScrollSpyProgress on md+.
6. Validate data: Check navLinks includes Activity, about paragraphs updated.

**Decisions**
- Retain current aboutContent.paragraphs as they match the provided TUR 8 text.
- Use glass-card theme consistently across components.
- Implement ParticleField as pure CSS for performance (TUR 4).
- Add SectionDividers between all sections as per final structure.

**Further Considerations**
1. Confirm if any components from TURs are intentionally omitted or if all should be implemented.
2. Verify GitHub API integration for GitHubStats component requires API key setup.
3. Ensure all Lucide icons used in components are imported correctly.