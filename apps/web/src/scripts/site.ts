// Client behavior for every page. With Astro's ClientRouter the module runs once, so all
// setup happens on `astro:page-load` (first load and every navigation) and is torn down
// on `astro:before-swap`.
import { animate, inView, scroll, stagger } from "motion";

type Cleanup = () => void;
let cleanups: Cleanup[] = [];
const ease = [0.16, 1, 0.3, 1] as const;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const on = <K extends keyof WindowEventMap>(t: Window | Document | HTMLElement, type: K | string, fn: (e: any) => void, opts?: AddEventListenerOptions) => {
  t.addEventListener(type, fn, opts);
  cleanups.push(() => t.removeEventListener(type, fn, opts));
};

function reveals() {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (reduced()) { el.style.opacity = "1"; el.style.transform = "none"; return; }
    const stop = inView(el, () => {
      animate(el, { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] }, { duration: 0.9, delay: Number(el.dataset.revealDelay ?? 0), ease });
    }, { amount: 0.12 });
    cleanups.push(stop);
  });
}

/** First visit: the preloader columns lift in CSS; take the class off once they are gone. */
function preloader(): number {
  const html = document.documentElement;
  if (!html.classList.contains("intro")) return 0;
  window.setTimeout(() => html.classList.remove("intro"), 1500);
  return 0.75;
}

/** Home opening: the headline rises out of its masks, the rest fades in, the portrait and the flame come up. */
function hero(wait: number) {
  const root = document.querySelector<HTMLElement>("[data-hero]");
  if (!root) return;
  const lines = root.querySelectorAll<HTMLElement>("[data-rise]");
  const fades = root.querySelectorAll<HTMLElement>("[data-fade]");
  const portrait = root.querySelector<HTMLElement>("[data-portrait]");
  const glow = root.querySelector<HTMLElement>("[data-glow]");
  if (reduced()) {
    lines.forEach((l) => (l.style.transform = "none"));
    [...fades, portrait, glow].forEach((el) => el && (el.style.opacity = "1"));
    return;
  }
  const d = wait + 0.1;
  if (glow) animate(glow, { opacity: [0, 1] }, { duration: 2.2, delay: d, ease: "easeOut" });
  if (portrait) animate(portrait, { opacity: [0, 1], transform: ["translateY(40px) scale(1.04)", "translateY(0px) scale(1)"] }, { duration: 1.5, delay: d + 0.2, ease });
  animate(fades[0], { opacity: [0, 1], transform: ["translateY(12px)", "translateY(0px)"] }, { duration: 0.8, delay: d, ease });
  animate(lines, { transform: ["translateY(110%)", "translateY(0%)"] }, { duration: 1.1, delay: stagger(0.1, { startDelay: d + 0.08 }), ease });
  animate([...fades].slice(1), { opacity: [0, 1], transform: ["translateY(16px)", "translateY(0px)"] }, { duration: 0.9, delay: stagger(0.09, { startDelay: d + 0.5 }), ease });
}

/** Figures count up from zero the first time they scroll into view. */
function counters() {
  document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
    const to = Number(el.dataset.countTo);
    if (!Number.isFinite(to) || reduced()) return;
    el.textContent = "0";
    const stop = inView(el, () => {
      animate(0, to, { duration: Math.min(2.2, 0.9 + to / 300), ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (el.textContent = String(Math.round(v))) });
    }, { amount: 0.6 });
    cleanups.push(stop);
  });
}

/** Header turns solid once the page scrolls. */
function header() {
  const hdr = document.querySelector<HTMLElement>("[data-hdr]");
  if (!hdr) return;
  const set = () => hdr.toggleAttribute("data-scrolled", window.scrollY > 24);
  set();
  on(window, "scroll", set, { passive: true });
}

/** Project images on the Work page drift a little slower than the page. */
function parallax() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((media) => {
    const pic = media.querySelector<HTMLElement>("picture");
    if (!pic) return;
    const stop = scroll(animate(pic, { transform: ["translateY(-6%)", "translateY(6%)"] }, { ease: "linear" }), { target: media, offset: ["start end", "end start"] });
    cleanups.push(stop);
  });
}

/** A "View case study" pill follows the pointer over each project image on the Work page (mouse only). */
function viewPill() {
  if (reduced() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>("[data-view]").forEach((media) => {
    const pill = media.querySelector<HTMLElement>("[data-pill]");
    if (!pill) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, inside = false;
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      pill.style.left = `${x}px`; pill.style.top = `${y}px`;
      raf = inside || Math.abs(tx - x) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const point = (e: PointerEvent) => { const r = media.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; };
    on(media, "pointerenter", (e: PointerEvent) => {
      point(e); x = tx; y = ty; inside = true; raf = raf || requestAnimationFrame(loop);
      animate(pill, { opacity: 1, transform: ["translate(-50%, -50%) scale(0.6)", "translate(-50%, -50%) scale(1)"] }, { duration: 0.35, ease });
      const img = media.querySelector("img");
      if (img) animate(img, { transform: "scale(1.06)" }, { duration: 1.2, ease });
    });
    on(media, "pointermove", (e: PointerEvent) => { point(e); if (!raf) raf = requestAnimationFrame(loop); });
    on(media, "pointerleave", () => {
      inside = false;
      animate(pill, { opacity: 0, transform: "translate(-50%, -50%) scale(0.6)" }, { duration: 0.25 });
      const img = media.querySelector("img");
      if (img) animate(img, { transform: "scale(1.02)" }, { duration: 1, ease });
    });
    cleanups.push(() => cancelAnimationFrame(raf));
  });
}

/** Home work slider: arrows, swipe and the arrow keys change project; the visible slide carries the
 *  view-transition names so the cover and title morph into the case study. */
function slider() {
  const root = document.querySelector<HTMLElement>("[data-slider]");
  if (!root) return;
  const slides = [...root.querySelectorAll<HTMLAnchorElement>("[data-slide]")];
  const infos = [...root.querySelectorAll<HTMLElement>("[data-info]")];
  const count = root.querySelector<HTMLElement>("[data-count]");
  const link = root.querySelector<HTMLAnchorElement>("[data-view-link]");
  const n = slides.length;
  let cur = 0, busy = false;

  const names = (i: number, onOff: boolean) => {
    const slug = slides[i].dataset.slug;
    slides[i].style.viewTransitionName = onOff ? `cover-${slug}` : "";
    const title = infos[i].querySelector<HTMLElement>(".title");
    if (title) title.style.viewTransitionName = onOff ? `title-${slug}` : "";
  };

  const go = async (next: number, dir: 1 | -1) => {
    if (busy || next === cur) return;
    busy = true;
    const from = cur, to = (next + n) % n;
    cur = to;
    names(from, false);
    const inS = slides[to], outS = slides[from], inI = infos[to], outI = infos[from];
    inS.classList.add("on"); inI.classList.add("on");
    inS.removeAttribute("aria-hidden"); inS.removeAttribute("tabindex");
    outS.setAttribute("aria-hidden", "true"); outS.tabIndex = -1;
    inI.removeAttribute("aria-hidden"); inI.inert = false;
    outI.setAttribute("aria-hidden", "true"); outI.inert = true;
    if (count) count.textContent = String(to + 1).padStart(2, "0");
    if (link) {
      link.href = inS.href;
      const name = inI.querySelector(".title")?.textContent ?? "";
      link.setAttribute("aria-label", `${link.getAttribute("aria-label")?.split(":")[0] ?? ""}: ${name}`);
    }
    inS.style.zIndex = "2"; outS.style.zIndex = "1";
    if (!reduced()) {
      const img = inS.querySelector("img");
      const a = animate(inS, { clipPath: [dir > 0 ? "inset(0 0 0 100% round 22px)" : "inset(0 100% 0 0 round 22px)", "inset(0 0 0 0% round 22px)"] }, { duration: 0.9, ease: [0.76, 0, 0.24, 1] });
      if (img) animate(img, { transform: ["scale(1.12)", "scale(1)"] }, { duration: 1.3, ease });
      animate(outI, { opacity: [1, 0], transform: ["translateY(0px)", "translateY(-14px)"] }, { duration: 0.35 });
      animate(inI.children, { opacity: [0, 1], transform: ["translateY(22px)", "translateY(0px)"] }, { duration: 0.8, delay: stagger(0.06, { startDelay: 0.25 }), ease });
      await a.finished;
    }
    outS.classList.remove("on"); outI.classList.remove("on");
    outI.style.opacity = ""; outI.style.transform = "";
    inS.style.clipPath = ""; inS.style.zIndex = ""; outS.style.zIndex = "";
    names(to, true);
    busy = false;
  };

  const prev = root.querySelector<HTMLButtonElement>("[data-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-next]");
  if (prev) on(prev, "click", () => go(cur - 1, -1));
  if (next) on(next, "click", () => go(cur + 1, 1));
  on(root, "keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1, -1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1, 1); }
  });

  // Swipe on the cover; a real swipe cancels the click that would open the project.
  const stage = root.querySelector<HTMLElement>(".stage");
  if (stage) {
    let x0 = 0, y0 = 0, moved = false;
    on(stage, "pointerdown", (e: PointerEvent) => { x0 = e.clientX; y0 = e.clientY; moved = false; });
    on(stage, "pointerup", (e: PointerEvent) => {
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) { moved = true; go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); }
    });
    on(stage, "click", (e: MouseEvent) => { if (moved) { e.preventDefault(); moved = false; } }, { capture: true });
  }
}

/** The big round button leans toward the pointer. */
function magnetic() {
  if (reduced() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    on(el, "pointermove", (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.22, dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
      animate(el, { transform: `translate(${dx}px, ${dy}px)` }, { duration: 0.5, ease });
    });
    on(el, "pointerleave", () => animate(el, { transform: "translate(0px, 0px)" }, { type: "spring", stiffness: 200, damping: 14 }));
  });
}

/** Pipeline on the Prospector case: the stage markers light up in order when the track comes into view. */
function pipeline() {
  document.querySelectorAll<HTMLElement>("[data-steps]").forEach((track) => {
    const nodes = track.querySelectorAll<HTMLElement>("[data-node]");
    if (reduced()) { nodes.forEach((n) => n.classList.add("lit")); return; }
    const stop = inView(track, () => {
      nodes.forEach((n, i) => window.setTimeout(() => n.classList.add("lit"), 180 + i * 140));
      const fill = track.querySelector<HTMLElement>("[data-rail]");
      if (fill) animate(fill, { transform: ["scaleX(0)", "scaleX(1)"] }, { duration: 0.18 * nodes.length + 0.2, ease: "linear" });
    }, { amount: 0.4 });
    cleanups.push(stop);
  });
}

/** Mobile menu: a full-height sheet under the header. */
function menu() {
  const root = document.querySelector<HTMLElement>("[data-menu-root]");
  const btn = root?.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const sheet = root?.querySelector<HTMLElement>("[data-menu-sheet]");
  if (!root || !btn || !sheet) return;
  const set = (open: boolean) => {
    btn.setAttribute("aria-expanded", String(open));
    root.toggleAttribute("data-open", open);
    sheet.hidden = !open;
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open && !reduced()) animate(sheet.querySelectorAll("a"), { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0px)"] }, { duration: 0.5, delay: stagger(0.045), ease });
  };
  on(btn, "click", () => set(btn.getAttribute("aria-expanded") !== "true"));
  on(document, "keydown", (e: KeyboardEvent) => { if (e.key === "Escape") set(false); });
  cleanups.push(() => (document.documentElement.style.overflow = ""));
}

function init() {
  // Run once per rendered page: the router gives each page a fresh <body>.
  if (document.body.dataset.inited) return;
  document.body.dataset.inited = "1";
  cleanups.forEach((f) => f());
  cleanups = [];
  const wait = preloader();
  header();
  reveals();
  hero(wait);
  counters();
  parallax();
  viewPill();
  slider();
  magnetic();
  pipeline();
  menu();
}

export function boot() {
  (window as unknown as { __site: boolean }).__site = true;
  document.addEventListener("astro:page-load", init);
  document.addEventListener("astro:before-swap", () => { cleanups.forEach((f) => f()); cleanups = []; });
  // The router replaces <html> attributes on each swap; keep the flag that hides content until it reveals.
  document.addEventListener("astro:after-swap", () => document.documentElement.classList.add("js"));
}
