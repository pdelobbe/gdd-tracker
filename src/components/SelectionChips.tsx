interface ChipOption<T extends string> {
  value: T
  label: string
  description?: string
}

interface SelectionChipsProps<T extends string> {
  options: ChipOption<T>[]
  selected: T | null
  onSelect: (value: T) => void
  columns?: 2 | 3
}

export function SelectionChips<T extends string>({
  options,
  selected,
  onSelect,
  columns = 2,
}: SelectionChipsProps<T>) {
  const gridClass = columns === 3 ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <div className={`grid ${gridClass} gap-2`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`py-3 px-3 rounded-xl text-center transition-colors ${
            selected === opt.value
              ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-1'
              : 'bg-white/80 text-gray-700 border border-gray-200 active:bg-gray-50'
          }`}
        >
          <p className="font-semibold text-sm">{opt.label}</p>
          {opt.description && (
            <p className={`text-xs mt-0.5 ${selected === opt.value ? 'text-green-100' : 'text-gray-400'}`}>
              {opt.description}
            </p>
          )}
        </button>
      ))}
    </div>
  )
}
