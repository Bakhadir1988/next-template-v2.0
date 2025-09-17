import Link from 'next/link';

interface Section {
  item_id: string;
  title: string;
  url: string;
  sections?: Section[];
}

interface CatalogSectionsProps {
  sections: Section[];
}

export const CatalogSections = ({ sections }: CatalogSectionsProps) => {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <ul>
      {sections.map((section) => (
        <li key={section.item_id}>
          <Link href={section.url}>{section.title}</Link>
          {/* Recursive call for nested sections */}
          {section.sections && <CatalogSections sections={section.sections} />}
        </li>
      ))}
    </ul>
  );
};
