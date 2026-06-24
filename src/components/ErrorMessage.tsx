interface Props {
  message: string
  onRetry?: () => void
  className?: string
}

export default function ErrorMessage({ message, onRetry, className = '' }: Props) {
  return (
    <div
      role="alert"
      className={`p-4 rounded-lg border border-red-900 bg-red-950 bg-opacity-30 ${className}`}
    >
      <div className="flex items-start gap-3">
        <svg
          className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-red-300 leading-relaxed">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-xs font-sans text-red-400 hover:text-red-300 underline transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
