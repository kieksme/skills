import { describe, expect, it } from 'vitest';
import { buildSkillsSection, uniqueSkillsFromDomains, type DomainMapping, type SkillCatalogItem } from '../../src/lib/agentMd';

const domainMap: DomainMapping[] = [
  { id: 'infra', skills: ['iac-infrastructure-as-code'] },
  { id: 'perf', skills: ['nextjs-app-router-performance', 'iac-infrastructure-as-code'] }
];

const skillCatalog: SkillCatalogItem[] = [
  {
    name: 'iac-infrastructure-as-code',
    docUrl: '/skills/skills/iac-infrastructure-as-code/',
    installCommand: 'npx skills add kieksmeRepo/tp-skills@1.5.0 --skill iac-infrastructure-as-code'
  },
  {
    name: 'nextjs-app-router-performance',
    docUrl: '/skills/skills/nextjs-app-router-performance/',
    installCommand: 'npx skills add kieksmeRepo/tp-skills@1.5.0 --skill nextjs-app-router-performance'
  }
];

describe('uniqueSkillsFromDomains', () => {
  it('returns unique skills across multiple domains', () => {
    const result = uniqueSkillsFromDomains(['infra', 'perf'], domainMap, skillCatalog);
    expect(result).toHaveLength(2);
    expect(result.map((item) => item.name)).toEqual([
      'iac-infrastructure-as-code',
      'nextjs-app-router-performance'
    ]);
  });

  it('ignores unknown domains', () => {
    const result = uniqueSkillsFromDomains(['unknown'], domainMap, skillCatalog);
    expect(result).toEqual([]);
  });
});

describe('buildSkillsSection', () => {
  it('renders fallback section when no skills are selected', () => {
    const markdown = buildSkillsSection([], '/skills/');
    expect(markdown).toContain('Install at least the skills matching your requested task domain.');
    expect(markdown).toContain('[kieks.me GbR Skills](/skills/)');
  });

  it('renders selected skills with docs links and install commands', () => {
    const markdown = buildSkillsSection([skillCatalog[0]], '/skills/');
    expect(markdown).toContain('- iac-infrastructure-as-code: [docs](/skills/skills/iac-infrastructure-as-code/)');
    expect(markdown).toContain('`npx skills add kieksmeRepo/tp-skills@1.5.0 --skill iac-infrastructure-as-code`');
  });
});
