import { Controller } from 'react-hook-form';
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
    handleSubmit,
    register,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    accounts,
    categories
  } = useNewTransactionModalController();

  return (
    <Modal
      title={transactionType[newTransactionType!]}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div >
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {incomeValueOrExpense[newTransactionType!]}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name='value'
              defaultValue='0'
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />

          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">

          <Input
            type="text"
            placeholder={inputPlaceholder[newTransactionType!]}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder="Categoria"
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
              />

            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder={selectPlaceholder[newTransactionType!]}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />

            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  )
}
