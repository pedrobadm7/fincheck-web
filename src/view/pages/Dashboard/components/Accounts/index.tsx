
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { useAccountsController } from './useAccountsController';
import { SliderNavigation } from './SliderNavigation';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';


export function Accounts() {
  const {
    setSliderState,
    sliderState: {
      isBeginning,
      isEnd
    },
    windowWidth,
    areValuesVisible,
    toggleValueVisibility
  } = useAccountsController()

  return (
    <div className="bg-teal-900 rounded-2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
      <div >
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong
            className={
              cn(
                "text-2xl tracking-[-1px] text-white",
                !areValuesVisible && 'blur-md'
              )}
          >
            {formatCurrency(1000)}
          </strong>

          <button
            className="flex items-center justify-center"
            onClick={toggleValueVisibility}
          >
            <EyeIcon open={!areValuesVisible} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">

        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth >= 500 ? 2.1 : 1}
            onSlideChange={swiper => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd
              })
            }}
          >
            <div className="flex items-center justify-between mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-large font-bold">
                Minhas contas
              </strong>

              <SliderNavigation
                isBeginning={isBeginning}
                isEnd={isEnd}
              />
            </div>


            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="Nubank"
                balance={1000.50}
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="Nubank"
                balance={1000.50}
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="Nubank"
                balance={1000.50}
                type="CASH"
              />
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </div>
  )
}
