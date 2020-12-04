import React, { memo } from "react";
import { useProfiler } from "@utils/useProfiler";

export const NavigationStructure = memo( function NavigationStructure () {
    useProfiler( "NavigationStructure" );
    return <div className="navigationStructure" ></div>;
} );