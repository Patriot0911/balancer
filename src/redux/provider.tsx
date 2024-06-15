"use client";

import { store } from './store';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';

const ReduxProvider = ({ children }: PropsWithChildren) => {
    return (
        <Provider
            store={store}
        >
            {children}
        </Provider>
    );
};

export default ReduxProvider;