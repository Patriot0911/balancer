import { IPlayer } from "@/types";
import PlayerRole from "./PlayerRole";

const PlayerRolesContainer = (props: IPlayer) => {
    return (
        <section
            className={'player-roles-container'}
        >
            {
                Object.values(props.roles).map((item, index) =>
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