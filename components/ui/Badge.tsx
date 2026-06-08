import { type HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'cta' | 'muted' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default:    'bg-[var(--color-brand-light)] text-[var(--color-brand-primary)]',
  primary:    'bg-[var(--color-brand-primary)] text-white',
  secondary:  'bg-[var(--color-brand-secondary)] text-white',
  cta:        'bg-[var(--color-brand-cta)] text-white',
  muted:      'bg-[#f1f5f9] text-[var(--color-muted)]',
  outline:    'border border-[var(--color-border)] text-[var(--color-muted)] bg-transparent',
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
