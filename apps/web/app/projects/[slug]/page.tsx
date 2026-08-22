import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/api";
import { ProjectDetailsView } from "./project-details-view";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  const image = project.media.find(
    (item) => item.type === "cover" || item.type === "thumbnail",
  )?.media.publicUrl;
  return {
    title: project.seoTitleEn ?? project.seoTitle ?? project.titleEn ?? project.title,
    description:
      project.seoDescriptionEn ??
      project.seoDescription ??
      project.shortSummaryEn ??
      project.shortSummary ??
      undefined,
    openGraph: {
      title: project.seoTitleEn ?? project.seoTitle ?? project.titleEn ?? project.title,
      description:
        project.seoDescriptionEn ??
        project.seoDescription ??
        project.shortSummaryEn ??
        project.shortSummary ??
        undefined,
      images: image ? [image] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  return <ProjectDetailsView project={project} />;
}
