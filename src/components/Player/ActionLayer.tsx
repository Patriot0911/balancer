interface IActionLayerProps {
    editingCallback: () => void;
    deleteCallback: () => void;
};

const ActionLayer = ({ editingCallback, deleteCallback }: IActionLayerProps) => {
    return (
        <div
            className={'action-layer'}
        >
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default ActionLayer;
