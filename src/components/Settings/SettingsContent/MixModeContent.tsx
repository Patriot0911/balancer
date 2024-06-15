import { SwitchButton } from "@/components/ui";
import { changeBalanceType } from "@/redux/features/balance-options";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

const MixModeContent = () => {
    const balanceState = useAppSelector(
        selector => selector.balanceOptionsReducer.balanceType
    );
    const dispatch = useDispatch();
    const isBalanceForMix =  balanceState === 'Mixed';
    const switchHandle = () => {
        dispatch(
            changeBalanceType(isBalanceForMix ? 'Classic' : 'Mixed')
        );
    }
    return (
        <section>
            <h2>Mix mode</h2>
            <div
                className={'mix-container'}
            >
                <label>Players shuffle: </label>
                <SwitchButton
                    callback={switchHandle}
                    state={isBalanceForMix}
                />
            </div>
        </section>
    );
};

export default MixModeContent;
