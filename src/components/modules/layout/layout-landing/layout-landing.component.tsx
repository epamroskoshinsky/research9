import React, { memo, ReactElement } from "react";
import { NavigationSidebar } from "@app/modules/layout/mock/NavigationSidebar";
import { NavigationHeaderWithoutToggle } from "@app/modules/layout/mock/NavigationHeaderWithoutToggle";
import { Layout, LayoutModes } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";

export const LayoutLanding = memo( function LayoutLanding ({
    children
}: { children: ReactElement }) {

    useProfiler("LayoutLanding");

    return (
        <Layout
            content={ children }
            layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT }
            navigationHeader={ <NavigationHeaderWithoutToggle /> }
            navigationSidebar={ <NavigationSidebar /> }
        />
    );

} );