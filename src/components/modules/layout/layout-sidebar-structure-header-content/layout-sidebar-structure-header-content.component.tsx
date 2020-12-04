import React, { memo, ReactElement } from "react";
import { NavigationSidebar } from "@app/modules/layout/mock/NavigationSidebar";
import { NavigationStructureWithToggle } from "@app/modules/layout/mock/NavigationStructureWithToggle";
import { NavigationHeader } from "@app/modules/layout/mock/NavigationHeader";
import { Layout, LayoutModes } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";

export const LayoutSidebarStructureHeaderContent = memo( function LayoutUnit ({
    children
}: { children: ReactElement }) {

    useProfiler("LayoutSidebarStructureHeaderContent");

    return (
        <Layout
            content={ children }
            layoutMode={ LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT }
            navigationHeader={ <NavigationHeader /> }
            navigationSidebar={ <NavigationSidebar /> }
            navigationStructure={ <NavigationStructureWithToggle /> }
        />
    );

} );