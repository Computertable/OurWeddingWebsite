// Single source of truth for the site's navigation.
// Items with `page` are separate routes; the rest are sections on the landing page.
export type NavItem = { id: string; label: string; page?: string };

export const NAV_ITEMS: NavItem[] = [
  { id: "top", label: "Home" },
  { id: "story", label: "Our story" },
  { id: "venues", label: "Venues" },
  { id: "schedule", label: "Schedule" },
  { id: "dress-code", label: "Dress code" },
  { id: "faqs", label: "FAQs" },
  { id: "rsvp", label: "RSVP" },
  { id: "entourage", label: "Entourage", page: "/entourage" },
  { id: "gifts", label: "Gifts", page: "/gifts" },
];

export const HEADER_HEIGHT = 64;

export function navHref(item: NavItem) {
  if (item.page) return item.page;
  return item.id === "top" ? "/" : `/#${item.id}`;
}

export function scrollToSection(id: string, reduceMotion: boolean) {
  const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}
