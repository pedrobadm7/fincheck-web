import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';

import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditTransactionModalController } from './useEditTransactionModalController';
import { Transaction } from '../../../../../app/entities/transaction';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { TrashIcon } from '../../../../components/icons/Trash';

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose(): void;
}

const transactionTypeTitle = {
  EXPENSE: "Editar despesa",
  INCOME: "Editar Receita"
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

const typeDelete = {
  EXPENSE: "Tem certeza que deseja excluir essa despesa?",
  INCOME: "Tem certeza que deseja excluir essa entrada?"
}

export function EditTransactionModal({ transaction, open, onClose }: EditTransactionModalProps) {
  const {
    handleSubmit,
    register,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    control,
    errors,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete
  } = useEditTransactionModalController(transaction, onClose);

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        isLoading={isLoadingDelete}
        title={typeDelete[transaction?.type ?? 'EXPENSE']}

      />
    )
  }

  return (
    <Modal
      title={transactionTypeTitle[transaction?.type ?? 'EXPENSE']}
      open={open}
      onClose={onClose}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div >
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {incomeValueOrExpense[transaction?.type ?? 'EXPENSE']}
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
            placeholder={inputPlaceholder[transaction?.type ?? 'EXPENSE']}
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
                placeholder={selectPlaceholder[transaction?.type ?? 'EXPENSE']}
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
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
