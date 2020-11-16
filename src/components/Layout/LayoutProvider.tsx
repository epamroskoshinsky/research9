import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    PropsWithChildren,
    ReactElement,
} from "react";
import {
    LayoutContextInterface,
    LayoutModes,
    isLayoutMode,
} from "./LayoutTypes";
import { LAYOUT_MODE_LOCALSTORAGE_KEY } from "./LayoutConstants";
import { useProfiler } from "../../utils/useProfiler";

const layoutModeLocalStorage = window.localStorage.getItem( LAYOUT_MODE_LOCALSTORAGE_KEY );

export const LayoutContext = createContext<LayoutContextInterface>( {
    layoutMode: LayoutModes.SIDEBAR_HEADER_CONTENT,
    setLayoutMode: (_:LayoutModes) => {},
    toggleStructure: () => {},
} );

export const useLayout = () => useContext( LayoutContext );

export function LayoutProvider ( { children }:PropsWithChildren<{}> ) {

    const [ layoutMode, _setLayoutMode ] = useState<LayoutModes>( () =>
        isLayoutMode( layoutModeLocalStorage ) && layoutModeLocalStorage ||
        LayoutModes.SIDEBAR_HEADER_CONTENT
    );

    const setLayoutMode = useCallback( ( layoutModeNew, compatibility ) => {
        if (
            compatibility &&
            (
                (
                    layoutModeNew === LayoutModes.SIDEBAR_HEADER_CONTENT &&
                    layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
                ) ||
                (
                    layoutModeNew === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT &&
                    layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT
                )    
            )
        ) {
            return;
        }
        if ( layoutModeNew !== layoutMode ) {
            window.localStorage.setItem( "layoutMode", layoutModeNew );
            _setLayoutMode( layoutModeNew );
        }
    }, [ layoutMode ] );

    const toggleStructure = useCallback( () => {
        if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ) {
            setLayoutMode( LayoutModes.SIDEBAR_HEADER_CONTENT, false );
        } else if ( layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT ) {
            setLayoutMode( LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT, false );
        }
    }, [ layoutMode ] );

    useProfiler( "LayoutProvider" );

    return (
        <LayoutContext.Provider
            value={ {
                layoutMode,
                setLayoutMode,
                toggleStructure
            } }
        >
            { children }
        </LayoutContext.Provider>
    );

}
