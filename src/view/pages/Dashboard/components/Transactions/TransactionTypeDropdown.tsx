import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';
import { useDarkMode } from '../../../../../app/hooks/useDarkMode';
import { cn } from '../../../../../app/utils/cn';

interface TransactionTypeDropdownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {

  const { isDarkMode } = useDarkMode()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">

          {selectedType === 'EXPENSE' && <ExpensesIcon stroke={isDarkMode ? 'white' : undefined} />}
          {selectedType === 'INCOME' && <IncomeIcon stroke={isDarkMode ? 'white' : undefined} />}
          {selectedType === undefined && <TransactionsIcon stroke={isDarkMode ? 'white' : undefined} />}

          <span className={cn("text-sm text-gray-800  tracking-[-0.5px] font-medium", isDarkMode && 'text-gray-200')}>
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === undefined && 'Transações'}
          </span>

          <ChevronDownIcon className={cn("text-gray-900", isDarkMode && 'text-gray-200')} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item className="gap-1" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-1" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-1" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
