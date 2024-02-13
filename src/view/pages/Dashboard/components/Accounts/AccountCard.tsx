import { BankAccount } from '../../../../../app/entities/bankAccount';
import { useDarkMode } from '../../../../../app/hooks/useDarkMode';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { useDashboard } from '../DashboardContext/useDashboard';


interface AccountCardProps {
  data: BankAccount
}

export function AccountCard({ data }: AccountCardProps) {
  const { color, name, currentBalance, type } = data;
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  const { isDarkMode } = useDarkMode()

  return (
    <div
      className={cn("p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950", isDarkMode && 'bg-gray-700')}
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span
          className={cn("text-gray-800 font-medium tracking-[-0.5px] mt-4 block", isDarkMode && 'text-white')}
        >
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] block",
            !areValuesVisible && "blur-sm",
            isDarkMode && "text-white"
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className={cn("text-gray-600 text-sm", isDarkMode && "text-gray-100")}>
          Saldo atual
        </small>
      </div>
    </div>
  )
}
