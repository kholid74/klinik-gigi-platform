'use client'

interface Tab<T extends string> {
  value: T
  label: string
}

interface TabBarProps<T extends string> {
  tabs: Tab<T>[]
  active: T
  onChange: (value: T) => void
}

export function TabBar<T extends string>({ tabs, active, onChange }: TabBarProps<T>) {
  return (
    <div className="flex gap-0 border-b-2 border-[var(--color-border)] overflow-x-auto scrollbar-none">
      {tabs.map((tab) => {
        const isActive = tab.value === active
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`shrink-0 px-4 py-3 text-sm font-semibold border-b-2 -mb-0.5 transition-colors whitespace-nowrap ${
              isActive
                ? 'border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-brand-primary)]'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
