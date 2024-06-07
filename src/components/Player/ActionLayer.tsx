interface IActionLayerProps {
    isInEdit: boolean;
    saveCallback: () => void;
    deleteCallback: () => void;
    editingCallback: () => void;
};

const ActionLayer = ({
    editingCallback, deleteCallback, saveCallback,
    isInEdit,
}: IActionLayerProps) => {
    return (
        <div
            className={'action-layer'}
        >
            <div>
                <button
                    onClick={
                        !isInEdit ? editingCallback : saveCallback
                    }
                >
                    {
                        !isInEdit ? 'Edit' : 'Save'
                    }
                </button>
                {
                    isInEdit &&
                    <button
                        onClick={editingCallback}
                    >
                        Cancel
                    </button>
                }
                <button
                    onClick={deleteCallback}
                >Delete</button>
            </div>
        </div>
    );
};

export default ActionLayer;
