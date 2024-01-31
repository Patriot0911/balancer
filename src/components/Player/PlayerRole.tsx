import { IPlayerRoleProps } from "@/types";

const roleImages = [
    'https://i.postimg.cc/nXkD3QtY/tank.png',
    'https://i.postimg.cc/qtDCTVqN/damage.png',
    'https://i.postimg.cc/PL589rXG/support.png'
];

const PlayerRole = (props: IPlayerRoleProps) => {
    return (
        <span
            className={'rank-box'}
        >
            <img
                src={roleImages[props.index]}
            />
            {
                (props?.rankName || props?.rankValue) ?
                <>{props.rankName} [{props.rankValue}]</>
                :
                <>Not Given</>
            }
        </span>
    );
};

export default PlayerRole;