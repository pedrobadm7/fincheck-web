import { NumericFormat } from 'react-number-format'

export function InputCurrency() {
  return (
    <NumericFormat
      className="w-full text-gray-800 text-3xl font-bold tracking-[-1px] outline-none"
      thousandSeparator="."
      decimalSeparator=","
    />
  )
}
