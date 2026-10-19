import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {HomePage} from '../../src/features/pages/HomePage';
import {WebsitesPage} from '../../src/features/pages/WebsitesPage';
import {WorkPage} from '../../src/features/pages/WorkPage';
import {ProjectDetail} from '../../src/components/work/ProjectDetail';
import {projects} from '../../src/content/projects';

describe('localized project screenshots',()=>{
  for(const locale of ['de','en'] as const){
    it(`uses the declared ${locale} screenshot or the honest German-only Spurwerk image`,()=>{
      const surfaces=[<HomePage key="home" locale={locale}/>,<WebsitesPage key="websites" locale={locale}/>,<WorkPage key="work" locale={locale}/>,...projects.map(project=><ProjectDetail key={project.slug} project={project} next={projects[0]} locale={locale}/>)];
      for(const surface of surfaces){
        const markup=decodeURIComponent(renderToStaticMarkup(surface));
        // The garden photograph is language-neutral; actual page screenshots are localized.
        const images=markup.match(/\/images\/projects\/[a-z-]+-retina(?:-en)?\.webp/g)??[];
        expect(images.length).toBeGreaterThan(0);
        const allowed=new Set(projects.map(project=>project.image[locale].split('?')[0]));
        for(const image of images)expect(allowed.has(image), image).toBe(true);
      }
    });
  }
});

