import { IPlayerRoles } from "@/types";
import PlayerRole from "./PlayerRole";

interface IPlayerRolesContainerProps {
    roles: IPlayerRoles;
    isInEdit: boolean;
};

const PlayerRolesContainer = ({ isInEdit, roles }: IPlayerRolesContainerProps) => {
    return (
        <section
            className={'player-roles-container'}
        >
            {
                Object.values(roles).map((item, index) =>
                    !isInEdit ?
                    <PlayerRole
                        {...item}
                        index={index}
                        key={index}
                    /> :
                    <input></input> // add 3 inputs with refs
                )
            }
        </section>
    );
};

export default PlayerRolesContainer;