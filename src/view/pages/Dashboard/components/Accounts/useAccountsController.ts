import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { areValuesVisible, toggleValueVisibility, openNewAccountModal } = useDashboard()

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    setSliderState,
    toggleValueVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal
  }
}
