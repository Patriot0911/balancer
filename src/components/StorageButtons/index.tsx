"use client";

import './StorageButtons.css';
import LoadButton from "./LoadButton";
import SaveButton from "./SaveButton";

const StorageButtons = () => {
    return (
        <div
            className={'storage-buttons-container'}
        >
            <SaveButton />
            <LoadButton />
        </div>
    );
};

export default StorageButtons;
