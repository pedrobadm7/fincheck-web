import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalopen } = useNewAccountModalController()

  return (
    <Modal
      title="Nova conta"
      open={isNewAccountModalopen}
      onClose={closeNewAccountModal}
    >
      <InputCurrency />
    </Modal>
  )
}
