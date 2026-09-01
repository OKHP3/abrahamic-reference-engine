import type { PewCitation } from '../types'

interface Props {
  citation: PewCitation
  relatedCitations?: PewCitation[]
  rollupNote?: string
  compact?: boolean
  className?: string
}

function CitationDetails({ citation }: { citation: PewCitation }) {
  return (
    <div className="space-y-1.5">
      <p><strong className="text-parchment">Category:</strong> {citation.sourceCategory}</p>
      <p><strong className="text-parchment">Report:</strong> {citation.reportTitle}</p>
      <p><strong className="text-parchment">Table:</strong> {citation.table}</p>
      <p><strong className="text-parchment">Denominator:</strong> {citation.denominator}</p>
      <p><strong className="text-parchment">Fieldwork:</strong> {citation.fieldworkDate}</p>
      <p><strong className="text-parchment">Published:</strong> {citation.publicationDate}</p>
      <p><strong className="text-parchment">Retrieved:</strong> {citation.retrievedDate}</p>
      <p><strong className="text-parchment">Extraction:</strong> {citation.extractionNote}</p>
      <p><strong className="text-parchment">Compatibility:</strong> {citation.compatibilityNote}</p>
      <p><strong className="text-parchment">Evidence:</strong> {citation.status}</p>
    </div>
  )
}

export default function PewProvenance({
  citation,
  relatedCitations = [],
  rollupNote,
  compact = false,
  className = '',
}: Props) {
  return (
    <details className={`pew-provenance ${compact ? 'text-2xs' : 'text-xs'} ${className}`}>
      <summary className="cursor-pointer text-gold hover:text-gold-light">
        {compact ? 'Source & method' : 'Population source & method'}
      </summary>
      <div className="mt-2 space-y-3 text-muted leading-relaxed">
        <CitationDetails citation={citation} />
        {rollupNote && (
          <p><strong className="text-parchment">Rollup:</strong> {rollupNote}</p>
        )}
        {relatedCitations.length > 0 && (
          <div>
            <p className="text-parchment font-medium mb-1">Displayed lens extractions:</p>
            <ul className="list-disc list-inside space-y-1">
              {relatedCitations.map(related => (
                <li key={related.sourceCategory}>
                  {related.sourceCategory}: {related.extractionNote}
                </li>
              ))}
            </ul>
          </div>
        )}
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-gold hover:text-gold-light no-underline"
        >
          Open Pew source &rarr;
        </a>
      </div>
    </details>
  )
}