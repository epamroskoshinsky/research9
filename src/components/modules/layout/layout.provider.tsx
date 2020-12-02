import { LayoutContextInterface, LayoutModes } from '@app/modules/layout/layout.types';
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

export const LayoutContext = createContext<LayoutContextInterface>({
    layoutMode: undefined,
    setLayoutMode: (_: LayoutModes) => undefined,
    toggleStructure: () => undefined,
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: PropsWithChildren<{}>) => {
    const [layoutMode, setLayoutModeState] = useState<LayoutModes | undefined>(undefined);
    const [layoutModePrev, setLayoutModePrev] = useState<LayoutModes | undefined>(undefined);

    const setLayoutMode = useCallback(
        layoutModeNew => {
            if (layoutModeNew !== layoutMode) {
                setLayoutModePrev(layoutMode);
                setLayoutModeState(layoutModeNew);
            }
        },
        [layoutMode],
    );

    const toggleStructure = useCallback(() => {
        console.log("LayoutProvider", "toggleStructure");
        if (layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT) {
            setLayoutMode(LayoutModes.SIDEBAR_STRUCTURE_OUT_HEADER_CONTENT);
        } else if (layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT) {
            setLayoutMode(LayoutModes.SIDEBAR_STRUCTURE_IN_HEADER_CONTENT);
        }
    }, [layoutMode, setLayoutMode]);

    return (
        <LayoutContext.Provider
            value={{
                layoutModePrev,
                layoutMode,
                setLayoutMode,
                toggleStructure,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};