import React, { memo, ReactElement } from "react";
import { NavigationSidebar } from "@app/modules/layout/mock/NavigationSidebar";
import { NavigationHeaderWithoutToggle } from "@app/modules/layout/mock/NavigationHeaderWithoutToggle";
import { Layout, LayoutModes } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";

export const LayoutSidebarHeaderHighestContent = memo( function LayoutLanding ({
    children
}: { children:ReactElement | [ReactElement, ReactElement, ReactElement] }) {

    useProfiler("LayoutSidebarHeaderHighestContent");

    if ( Array.isArray( children ) ) {
        return (
            <Layout
                content={ children[ 2 ] }
                layoutMode={ LayoutModes.SIDEBAR_HEADER_HIGHEST_CONTENT }
                navigationHeader={ children[ 1 ] }
                navigationSidebar={ children[ 0 ] }
            />
        );                
    }

    return (
        <Layout
            content={ children }
            layoutMode={ LayoutModes.SIDEBAR_HEADER_HIGHEST_CONTENT }
            navigationHeader={ <NavigationHeaderWithoutToggle /> }
            navigationSidebar={ <NavigationSidebar /> }
        />
    );

} );