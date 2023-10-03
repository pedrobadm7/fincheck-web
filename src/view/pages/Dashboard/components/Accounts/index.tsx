
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { useAccountsController } from './useAccountsController';


export function Accounts() {
  const { setSliderState, sliderState: { isBeginning, isEnd } } = useAccountsController()

  return (
    <div className="bg-teal-900 rounded-2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
      <div >
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">R$ 1000,00</strong>
          <button className="flex items-center justify-center"><EyeIcon open /></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">

        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
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

              <AccountsSliderNavigation
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
