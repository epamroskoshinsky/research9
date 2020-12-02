import React, { memo, ReactElement } from "react";
import { NavigationSidebar } from "@app/modules/layout/mock/NavigationSidebar";
import { NavigationStructure } from "@app/modules/layout/mock/NavigationStructure";
import { NavigationStructureWithToggle } from "@app/modules/layout/mock/NavigationStructureWithToggle";
import { NavigationHeader } from "@app/modules/layout/mock/NavigationHeader";
import { Layout, LayoutModes } from "@app/modules/layout";
import { useProfiler } from "@utils/useProfiler";

export const LayoutUnit = memo( function LayoutUnit ({
    children
}: { children: ReactElement }) {

    useProfiler("LayoutUnit");

    return (
        <Layout
            content={ children }
            layoutMode={ LayoutModes.SIDEBAR_HEADER_CONTENT }
            navigationHeader={ <NavigationHeader /> }
            navigationSidebar={ <NavigationSidebar /> }
            navigationStructure={ <NavigationStructureWithToggle /> }
            // navigationStructure={ <NavigationStructure /> }
        />
    );

} );