import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "../../../../components/layout/SiteShell";
import { ProjectDetail } from "../../../../components/work/ProjectDetail";
import { getAdjacentProject, getProject, projects } from "../../../../content/projects";
import { buildMetadata } from "../../../../lib/page-metadata";
import { createProjectPath } from "../../../../lib/routes";

interface PageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

/**
 * The four concepts are the whole set and they are known at build time, so an
 * unknown slug is not a route that needs rendering on demand -- it is simply
 * not a route. Without this, Next rendered `/work/anything` on request, hit
 * notFound(), and served a 404 whose body was empty until client JS hydrated
 * it. On a site that promises finished HTML, the 404 has to be finished HTML
 * too.
 */
export const dynamicParams = false;

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

  return buildMetadata({
    locale: "de",
    route: createProjectPath(project.slug),
    // From the project's own dictionary rather than a name template: the
    // tagline made a 45-character description and the title carried no term
    // anyone searches for.
    title: project.copy.de.seoTitle,
    description: project.copy.de.seoDescription,
  });
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
