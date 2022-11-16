import { useMemo, useState } from 'react'

type DateInput = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  value: string
}

export default function DateInput({ onChange, value, placeholder }: DateInput) {
  const [type, setType] = useState('text')

  function handleFocus() {
    setType('date')
  }

  function handleBlur() {
    setType('text')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e)
  }

  const dateFormatted = useMemo(() => {
    if (!value) return ''
    const valueObject = new Date(`${value} `)
    return new Intl.DateTimeFormat('pt-BR').format(valueObject)
  }, [value])

  return (
    <>
      {type === 'date' ? (
        <input
          className='input-date'
          type="date"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          className='input-date'
          type="text"
          onChange={handleChange}
          value={dateFormatted}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </>
  )
}