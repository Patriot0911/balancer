import './SettingsContent.css';
import RolesContent from './RolesContent';
import MixModeContent from './MixModeContent';

const SettingsContent = () => {
    return (
        <div
            className={'settings-content'}
        >
            <RolesContent />
            <MixModeContent />
        </div>
    );
};

export default SettingsContent;
