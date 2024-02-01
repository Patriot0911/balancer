import './RoleImage.css';
import { IRoleImageProps } from '@/types';
import roleImages from '@/scripts/roleImages';


const RoleImage = (props: IRoleImageProps) => <img
    className={'role-image'}
    src={roleImages[props.rolename]}
    {...props}
/>

export default RoleImage;