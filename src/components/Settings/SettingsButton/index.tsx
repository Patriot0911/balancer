'use client';
import './SettingsButton.css';
import { useState } from 'react';
import { IoSettings } from 'react-icons/io5';
import SettingsContent from '../SettingsContent';
import { AnimatePresence, motion } from 'framer-motion';

const SettingsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const settingsHandle = () => setIsOpen(!isOpen);
    return (
        <>
            <IoSettings
                className={'settings-open-button'}
                onClick={settingsHandle}
            />
            <AnimatePresence
                mode={'popLayout'}
            >
                {
                    isOpen &&
                    <motion.div
                        layout
                        key={'settings-modal'}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className={'settings-modal-container'}
                    >
                        <SettingsContent />
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
};

export default SettingsButton;
