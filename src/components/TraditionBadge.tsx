import type { TraditionFamily } from '../types'

const CONFIG: Record<TraditionFamily, { label: string; colors: string }> = {
  judaism: {
    label: 'Judaism',
    colors: 'text-blue-400 border-blue-800 bg-blue-950',
  },
  christianity: {
    label: 'Christianity',
    colors: 'text-violet-400 border-violet-800 bg-violet-950',
  },
  islam: {
    label: 'Islam',
    colors: 'text-emerald-400 border-emerald-800 bg-emerald-950',
  },
}

interface Props {
  family: TraditionFamily
  size?: 'sm' | 'md'
  className?: string
}

export default function TraditionBadge({ family, size = 'sm', className = '' }: Props) {
  const { label, colors } = CONFIG[family]
  const sizeClass = size === 'md'
    ? 'text-xs px-2.5 py-1'
    : 'text-2xs px-2 py-0.5'

  return (
    <span
      className={`inline-flex items-center font-sans font-semibold tracking-wide rounded border ${colors} ${sizeClass} ${className}`}
      aria-label={`Tradition: ${label}`}
    >
      {label}
    </span>
  )
}

export function TraditionDot({ family, className = '' }: { family: TraditionFamily; className?: string }) {
  const dotColors: Record<TraditionFamily, string> = {
    judaism: 'bg-blue-400',
    christianity: 'bg-violet-400',
    islam: 'bg-emerald-400',
  }
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${dotColors[family]} ${className}`}
      aria-hidden="true"
    />
  )
}

export function getTraditionTextColor(family: TraditionFamily): string {
  const map: Record<TraditionFamily, string> = {
    judaism: 'text-blue-400',
    christianity: 'text-violet-400',
    islam: 'text-emerald-400',
  }
  return map[family]
}

export function getTraditionBorderColor(family: TraditionFamily): string {
  const map: Record<TraditionFamily, string> = {
    judaism: 'border-blue-800',
    christianity: 'border-violet-800',
    islam: 'border-emerald-800',
  }
  return map[family]
}

export function getTraditionBgColor(family: TraditionFamily): string {
  const map: Record<TraditionFamily, string> = {
    judaism: 'bg-blue-950',
    christianity: 'bg-violet-950',
    islam: 'bg-emerald-950',
  }
  return map[family]
}
