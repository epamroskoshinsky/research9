import React, { memo, ReactElement } from "react";
import { NavigationSidebar } from "@app/modules/layout/mock/NavigationSidebar";
import { Layout, LayoutModes } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";

export const LayoutSidebarContent = memo( function LayoutError ({
    children
}: { children: ReactElement }) {

    useProfiler("LayoutSidebarContent");

    return (
        <Layout
            content={ children }
            layoutMode={ LayoutModes.SIDEBAR_CONTENT }
            navigationSidebar={ <NavigationSidebar /> }
        />
    );

} );