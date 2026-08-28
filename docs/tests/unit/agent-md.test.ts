import { describe, expect, it } from 'vitest';
import { buildSkillsSection, uniqueSkillsFromDomains, type DomainMapping, type SkillCatalogItem } from '../../src/lib/agentMd';

const domainMap: DomainMapping[] = [
  { id: 'infra', skills: ['iac-infrastructure-as-code'] },
  { id: 'terraform', skills: ['terraform-style-guide', 'iac-infrastructure-as-code'] }
];

const skillCatalog: SkillCatalogItem[] = [
  {
    name: 'iac-infrastructure-as-code',
    docUrl: '/skills/skills/iac-infrastructure-as-code/',
    installCommand: 'npx skills add kieksmeRepo/tp-skills@1.2.0 --skill iac-infrastructure-as-code'
  },
  {
    name: 'terraform-style-guide',
    docUrl: '/skills/skills/terraform-style-guide/',
    installCommand: 'npx skills add kieksmeRepo/tp-skills@1.2.0 --skill terraform-style-guide'
  }
];

describe('uniqueSkillsFromDomains', () => {
  it('returns unique skills across multiple domains', () => {
    const result = uniqueSkillsFromDomains(['infra', 'terraform'], domainMap, skillCatalog);
    expect(result).toHaveLength(2);
    expect(result.map((item) => item.name)).toEqual([
      'iac-infrastructure-as-code',
      'terraform-style-guide'
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
    expect(markdown).toContain('`npx skills add kieksmeRepo/tp-skills@1.2.0 --skill iac-infrastructure-as-code`');
  });
});
