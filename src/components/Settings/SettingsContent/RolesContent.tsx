import { changeRolesSettings } from "@/redux/features/balance-options";
import { useAppSelector } from "@/redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const RolesContent = () => {
    const { damage, support, tank, } = useAppSelector(
        selector => selector.balanceOptionsReducer.roles
    );
    const dispatch = useDispatch();
    const [newDamage, setNewDamage] = useState<number>(damage);
    const [newSupport, setNewSupport] = useState<number>(support);
    const [newTank, setNewTank] = useState<number>(tank);
    useEffect(
        () => () => {
            if(
                newDamage === damage && newSupport === support && newTank === tank
            )
                return;
            const roles = {
                damage: newDamage ?? damage,
                support: newSupport ?? support,
                tank: newTank ?? tank,
            };
            dispatch(changeRolesSettings({
                ...roles
            }));
        },
    );
    const changeHandle = (handle: (arg: any) => void) =>
        (e: ChangeEvent<HTMLInputElement>) => handle(parseInt(e.currentTarget.value));
    return (
        <section>
            <h2>Role counts</h2>
            <div
                className={'roles-container'}
            >
                <div>
                    <label>Tank:</label>
                    <input
                        type={'number'}
                        max={10}
                        min={0}
                        onChange={
                            changeHandle(setNewTank)
                        }
                        value={newTank}
                    />
                </div>
                <div>
                    <label>Damage:</label>
                    <input
                        type={'number'}
                        max={10}
                        min={0}
                        value={newDamage}
                        onChange={
                            changeHandle(setNewDamage)
                        }
                    />
                </div>
                <div>
                    <label>Support:</label>
                    <input
                        type={'number'}
                        max={10}
                        min={0}
                        value={newSupport}
                        onChange={
                            changeHandle(setNewSupport)
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default RolesContent;
