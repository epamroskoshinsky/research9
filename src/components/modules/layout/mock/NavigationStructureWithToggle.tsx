import React, { memo } from "react";
import { useProfiler } from "@utils/useProfiler";
import { useLayout } from "@app/modules/layout";

export const NavigationStructureWithToggle = memo( function NavigationStructureWithToggle () {
    const { toggleStructure } = useLayout();
    useProfiler( "NavigationStructureWithToggle" );
    return <div className="navigationStructure" onClick={ toggleStructure } ></div>;
} );