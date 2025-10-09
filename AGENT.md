# GLOBAL AGENT — Momtaz Host

Purpose: Single source of truth for how Cursor agents plan, build, and verify UI to match the approved reference exactly.

## Ground rules
- shadcn-first: use shadcn/ui via MCP demos before coding; prefer full blocks (Tabs, Accordion, etc.).
- Theme tokens only: use classes from globals.css (bg-primary, text-foreground, bg-card, border-border). Avoid raw colors.
- Accessibility: semantic HTML, labels/roles, focus-visible, AA+ contrast.
- Responsive-first: validate 390, 768, 1024, 1440 widths.
- Consistent rhythm: section spacing py-16–py-24; rounded-lg/xl; subtle shadows.
- Source-of-truth docs: ui_implementation.md, PROJECT_STATUS.md, .cursor/rules/shadcn-usage-rules.mdc, .cursor/rules/strapi-middleware-approach.mdc.

## Roles (sub-agents)
- Design System Guardian: enforces tokens, typography, spacing.
- shadcn Enforcer: consults MCP demos; validates correct component usage.
- UI Implementer: builds sections per reference using tokens and shadcn.
- Visual QA: uses Playwright MCP to compare screenshots; fails if diff > threshold.
- Content/API Integrator: re-enables Strapi using middleware population when CMS is on.

## Workflow
1) Intake
- Confirm reference: Figma fileKey + nodeId or the provided screenshot acts as baseline.
- Capture baseline via Figma MCP get_screenshot or Playwright MCP snapshot.

2) Plan (shadcn-first)
- For each needed UI, call shadcn demo; pick components and variants.
- Document choices briefly in PR description.

3) Implement (Homepage order)
- Hero → Logos → Domain Search → Services (one expanded at a time) → Pricing (billing toggle) → Why Momtaz → Google Workspace → Blogs → Enhanced CTAs.
- Use tokens only; reusable primitives under src/components/ui.

4) Visual verification
- Playwright MCP: snapshot page at 390/768/1024/1440; compare to baseline.
- Target: total pixel diff ≤ 2% per viewport. Iterate until passing.

5) Accessibility + responsiveness
- Keyboard nav, headings, labels; line length ~65–75ch; verify all breakpoints.

6) CMS (when enabled)
- Use middleware population per .cursor/rules/strapi-middleware-approach.mdc; avoid complex query strings.

## Acceptance criteria
- Visual diff ≤ 2% at all target widths.
- Tokens-only colors; spacing/typography match reference.
- Services list: exactly one item expanded; keyboard accessible.

## Required MCPs
- shadcn: list/get demos before use.
- Figma: get_screenshot(fileKey, nodeId) for reference capture.
- Playwright: snapshot + diff for local page routes.

## PR checklist
- [ ] shadcn demos referenced
- [ ] Tokens-only, no raw Tailwind colors
- [ ] Visual tests ≤ 2% diff (390/768/1024/1440)
- [ ] a11y quick pass (labels, focus, roles)
- [ ] PROJECT_STATUS.md updated