interface Props {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ label = 'Loading...', size = 'md' }: Props) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-2',
  }

  return (
    <div className="flex items-center gap-3" role="status" aria-label={label}>
      <div
        className={`${sizeMap[size]} border-border-mid border-t-gold rounded-full animate-spin flex-shrink-0`}
        aria-hidden="true"
      />
      <span className="text-sm text-muted">{label}</span>
    </div>
  )
}
