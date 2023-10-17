import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';

import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewTransactionModalController } from './useNewTransactionModalController';

const transactionType = {
  EXPENSE: "Nova Despesa",
  INCOME: "Nova Receita"
}

const incomeValueOrExpense = {
  EXPENSE: "da despesa",
  INCOME: "da receita"
}

const inputPlaceholder = {
  EXPENSE: "Nome da despesa",
  INCOME: "Nome da receita"
}

const selectPlaceholder = {
  EXPENSE: "Pagar com",
  INCOME: "Receber com"
}

export function NewTransactiontModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType
  } = useNewTransactionModalController()

  return (
    <Modal
      title={transactionType[newTransactionType!]}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div >
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {incomeValueOrExpense[newTransactionType!]}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">

          <Input
            type="text"
            name="initialBalance"
            placeholder={inputPlaceholder[newTransactionType!]}
          />

          <Select
            placeholder="Categoria"
            options={[
              {
                value: 'CHECKING',
                label: 'Conta Corrente',
              },
              {
                value: 'INVESTMENT',
                label: 'Investimentos',
              },
              {
                value: 'CASH',
                label: 'Dinheiro Físico',
              }
            ]}
          />

          <Select
            placeholder={selectPlaceholder[newTransactionType!]}
            options={[
              {
                value: 'CHECKING',
                label: 'Conta Corrente',
              },
              {
                value: 'INVESTMENT',
                label: 'Investimentos',
              },
              {
                value: 'CASH',
                label: 'Dinheiro Físico',
              }
            ]}
          />
          <DatePickerInput />
        </div>

        <Button type="submit" className="w-full mt-6" >
          Criar
        </Button>
      </form>
    </Modal>
  )
}
