import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    PropsWithChildren,
} from "react";
import {
    LayoutContextInterface,
    LayoutModes,
} from "./LayoutTypes";
import { useProfiler } from "../../utils/useProfiler";

export const LayoutContext = createContext<LayoutContextInterface>( {
    layoutMode: undefined,
    setLayoutMode: (_:LayoutModes) => {},
    toggleStructure: () => {},
} );

export const useLayout = () => useContext( LayoutContext );

export function LayoutProvider ( { children }:PropsWithChildren<{}> ) {

    const [ layoutMode, _setLayoutMode ] = useState<LayoutModes|undefined>( undefined );

    const setLayoutMode = useCallback( ( layoutModeNew ) => {
        if ( layoutModeNew !== layoutMode ) {
            _setLayoutMode( layoutModeNew );
        }
    }, [ layoutMode ] );

    const toggleStructure = useCallback( () => {
        if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ) {
            setLayoutMode( LayoutModes.SIDEBAR_HEADER_CONTENT );
        } else if ( layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT ) {
            setLayoutMode( LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT );
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
