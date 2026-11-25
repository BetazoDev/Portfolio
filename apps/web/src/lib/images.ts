import type { ImageMetadata } from "astro";
import prospector from "../assets/covers/prospector.jpg";
import agenda from "../assets/covers/agenda.jpg";
import hemenu from "../assets/covers/hemenu.jpg";
import stenia from "../assets/covers/stenia.jpg";
import abAbogados from "../assets/covers/ab-abogados.jpg";
import nebula from "../assets/shots/demo-nebulastudio-d.jpg";
import simulador from "../assets/shots/simulador-d.jpg";
import schedule from "../assets/shots/schedule-d.jpg";
import pedidos from "../assets/shots/phone-pedidos.png";
import mesas from "../assets/shots/lg-rail-light.png";
import steniaShot from "../assets/shots/stenia-m.jpg";
import ab from "../assets/shots/demo-ababogadosmty-d.jpg";

/** Cover image per project slug (compositions of real screenshots). */
export const covers: Record<string, ImageMetadata> = {
  prospector,
  agenda,
  hemenu,
  stenia,
  "ab-abogados": abAbogados,
};

/** Inline images used inside case study sections, keyed by Section.image. */
export const inline: Record<string, { src: ImageMetadata; kind: "desktop" | "phone" }> = {
  nebula: { src: nebula, kind: "desktop" },
  simulador: { src: simulador, kind: "desktop" },
  schedule: { src: schedule, kind: "desktop" },
  pedidos: { src: pedidos, kind: "phone" },
  mesas: { src: mesas, kind: "desktop" },
  stenia: { src: steniaShot, kind: "phone" },
  ab: { src: ab, kind: "desktop" },
};
