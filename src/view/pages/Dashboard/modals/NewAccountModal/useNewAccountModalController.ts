import { useDashboard } from '../../components/DashboardContext/useDashboard';

export function useNewAccountModalController() {
  const {
    isNewAccountModalopen,
    closeNewAccountModal
  } = useDashboard();

  return {
    isNewAccountModalopen,
    closeNewAccountModal
  }
}
