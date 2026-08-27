import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "../../../../components/layout/SiteShell";
import { ProjectDetail } from "../../../../components/work/ProjectDetail";
import { getAdjacentProject, getProject, projects } from "../../../../content/projects";

interface PageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} — SILVAN Digital Studio`,
    description: project.copy.de.tagline,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const next = getAdjacentProject(slug);

  if (!project || !next) {
    notFound();
  }

  return (
    <SiteShell currentPath={`/work/${project.slug}`} locale="de">
      <ProjectDetail locale="de" next={next} project={project} />
    </SiteShell>
  );
}
