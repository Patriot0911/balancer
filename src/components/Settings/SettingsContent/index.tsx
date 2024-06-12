import './SettingsContent.css';
import MixModeContent from './MixModeContent';

const SettingsContent = () => {
    return (
        <div
            className={'settings-content'}
        >
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
                            defaultValue={0}
                        />
                    </div>
                    <div>
                        <label>Support:</label>
                        <input
                            type={'number'}
                            max={10}
                            min={0}
                        />
                    </div>
                    <div>
                        <label>Damage:</label>
                        <input
                            type={'number'}
                            max={10}
                            min={0}
                        />
                    </div>
                </div>
            </section>
            <MixModeContent />
        </div>
    );
};

export default SettingsContent;
