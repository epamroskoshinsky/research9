import React, { memo, ReactElement } from "react";
import { NavigationSidebar } from "@app/modules/layout/mock/NavigationSidebar";
import { Layout, LayoutModes } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";

export const LayoutSidebarContent = memo( function LayoutError ({
    children
}: { children:ReactElement | [ReactElement, ReactElement] } ) {

    useProfiler("LayoutSidebarContent");

    if ( Array.isArray( children ) ) {
        return (
            <Layout
                content={ children[ 1 ] }
                layoutMode={ LayoutModes.SIDEBAR_CONTENT }
                navigationSidebar={ children[ 0 ] }
            />
        );                
    } 

    return (
        <Layout
            content={ children }
            layoutMode={ LayoutModes.SIDEBAR_CONTENT }
            navigationSidebar={ <NavigationSidebar /> }
        />
    );    

} );