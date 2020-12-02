import React, { memo, ReactElement } from "react";
import { NavigationSidebar } from "@app/modules/layout/mock/NavigationSidebar";
import { Layout, LayoutModes } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";

export const LayoutError = memo( function LayoutError ({
    children
}: { children: ReactElement }) {

    useProfiler("LayoutError");

    return (
        <Layout
            content={ children }
            layoutMode={ LayoutModes.SIDEBAR_CONTENT }
            navigationSidebar={ <NavigationSidebar /> }
        />
    );

} );