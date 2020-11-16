import React, { PropsWithChildren, useEffect } from "react";
import { useProfiler } from "../../utils/useProfiler";
import { useLayout } from "./LayoutProvider";
import { LayoutSetProps } from "./LayoutTypes";

export function LayoutModeSet( {
    layoutMode,
    layoutCompatibility,
    children,
}:PropsWithChildren<LayoutSetProps> ) {
    const { setLayoutMode } = useLayout();

    useEffect( () => {
        setLayoutMode( layoutMode, layoutCompatibility );
    }, [ layoutMode ] );

    useProfiler( "LayoutModeSet" );
    
    return (<>{ children }</>);
}