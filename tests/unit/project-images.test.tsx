import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {HomePage} from '../../src/features/pages/HomePage';
import {WebsitesPage} from '../../src/features/pages/WebsitesPage';
import {WorkPage} from '../../src/features/pages/WorkPage';
import {ProjectDetail} from '../../src/components/work/ProjectDetail';
import {projects} from '../../src/content/projects';

describe('localized project screenshots',()=>{
  for(const locale of ['de','en'] as const){
    it(`uses only ${locale} screenshots on all project surfaces`,()=>{
      const surfaces=[<HomePage key="home" locale={locale}/>,<WebsitesPage key="websites" locale={locale}/>,<WorkPage key="work" locale={locale}/>,...projects.map(project=><ProjectDetail key={project.slug} project={project} next={projects[0]} locale={locale}/>)];
      for(const surface of surfaces){
        const markup=decodeURIComponent(renderToStaticMarkup(surface));
        const images=markup.match(/\/images\/projects\/[a-z-]+\.webp/g)??[];
        expect(images.length).toBeGreaterThan(0);
        for(const image of images)expect(image.endsWith('-en.webp')).toBe(locale==='en');
      }
    });
  }
});
