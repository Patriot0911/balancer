import { IPlayerRoles } from "@/types";
import PlayerRole from "./PlayerRole";

interface IPlayerRolesContainerProps {
    roles: IPlayerRoles;
};

const PlayerRolesContainer = ({ roles }: IPlayerRolesContainerProps) => {
    return (
        <section
            className={'player-roles-container'}
        >
            {
                Object.values(roles).map((item, index) =>
                    <PlayerRole
                        {...item}
                        index={index}
                        key={index}
                    />
                )
            }
        </section>
    );
};

export default PlayerRolesContainer;