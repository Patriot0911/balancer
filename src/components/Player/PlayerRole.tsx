import { IPlayerRoleProps } from "@/types";
import RoleImage from "../ui/RoleImage";

const PlayerRole = (props: IPlayerRoleProps) => {
  return (
    <span
      className={'rank-box'}
    >
      <RoleImage
        rolename={props.index}
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