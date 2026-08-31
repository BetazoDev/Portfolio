import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/api";
import { ProjectDetailsView } from "./project-details-view";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;
export const dynamicParams = true;

/** Prerenders the known case studies; new slugs are rendered on first request. */
export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((project) => ({ slug: project.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  const title =
    project.seoTitleEn ?? project.seoTitle ?? project.titleEn ?? project.title;
  const description =
    project.seoDescriptionEn ??
    project.seoDescription ??
    project.shortSummaryEn ??
    project.shortSummary ??
    undefined;
  const image = project.media.find(
    (item) => item.type === "cover" || item.type === "thumbnail",
  )?.media.publicUrl;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  return <ProjectDetailsView project={project} />;
}
