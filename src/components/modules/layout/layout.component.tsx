import { useLayout } from '@app/modules/layout';
import {
    NAVIGATION_SIDEBAR_WIDTH,
    NAVIGATION_STRUCTURE_ANIMATION_DURATION,
    NAVIGATION_STRUCTURE_WIDTH,
    NAVIGATION_STRUCTURE_WIDTH_MAX,
} from '@app/modules/layout/layout.constants';
import {
    LayoutWrapper,
    LayoutWrapperContent,
    LayoutWrapperMain,
    LayoutWrapperNavigationHeader,
    LayoutWrapperNavigationSidebar,
    LayoutWrapperNavigationStructure,
} from '@app/modules/layout/layout.styles';
import {
    layoutModeLocalStorage,
    layoutStructureSizeLocalStorage,
} from '@app/modules/layout/layout.helpers';
import {
    LayoutModes,
    LayoutProps,
} from '@app/modules/layout/layout.types';
import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { useProfiler } from "@utils/useProfiler";
import { CSSTransition } from "react-transition-group";
import { Resizer } from "@app/modules/resizer";

export const Layout = ( {
    content,
    layoutMode: layoutModeProp,
    navigationHeader,
    navigationSidebar,
    navigationStructure,
}:LayoutProps ) => {

    const [ applied, setApplied ] = useState( false );
    const { layoutMode, setLayoutMode } = useLayout();
    const gridWrapperNavigationStructureRef = useRef<HTMLDivElement>( null );
    const [ gridWrapperNavigationStructureWidth, setGridWrapperNavigationStructureWidth ] = useState(
        layoutStructureSizeLocalStorage() ||
        NAVIGATION_STRUCTURE_WIDTH
    );

    useEffect( () => {
        if (
            layoutModeProp &&
            (
                !layoutMode ||
                !applied
            )
        ) {
            const layoutModeFromLocalStorage = layoutModeLocalStorage();
            if (
                (
                    layoutModeProp === LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT ||
                    layoutModeProp === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
                ) &&
                (
                    layoutModeFromLocalStorage === LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT ||
                    layoutModeFromLocalStorage === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
                )
            ) {
                setLayoutMode( layoutModeFromLocalStorage );
            } else {
                setLayoutMode( layoutModeProp );
            }
            setApplied( true );
        }
        if (
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
        ) {
            layoutModeLocalStorage( layoutMode );
        }
    }, [
        applied,
        layoutMode,
        layoutModeProp,
    ] );

    useEffect( () => {
        window.scroll( 0, 0 );
    }, [ content ] );

    const handlerDragEnd = ( x:number ) => {
        if ( gridWrapperNavigationStructureRef.current ) {
            const gridWrapperNavigationStructureBCR = gridWrapperNavigationStructureRef.current.getBoundingClientRect();
            const newWidth = x - gridWrapperNavigationStructureBCR.x;
            setGridWrapperNavigationStructureWidth( newWidth );
            layoutStructureSizeLocalStorage( newWidth );
        }
    };

    const getView = useCallback( () => {
        if ( !layoutMode ) {
            return null;
        }

        let widthStructureCondition;
        let navigationStructreShow;
        let navigationHeaderShow;

        if (
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT                
        ) {
            widthStructureCondition = gridWrapperNavigationStructureWidth;
            navigationStructreShow = true;
            navigationHeaderShow = true;
        }

        if (
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_HEADER_HIGHEST_CONTENT
        ) {
            navigationHeaderShow = true;
        }

        return (
            <CSSTransition
                in={
                    layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT ||
                    layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT
                }
                exit = { false }
                timeout={ NAVIGATION_STRUCTURE_ANIMATION_DURATION }
                onEntered={ () => {
                    if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT ) {
                        setLayoutMode( LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT );
                    } else if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT ) {
                        setLayoutMode( LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT );
                    }
                } }
                classNames={
                    layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT ? "structure-in" :
                        layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT ? "structure-out" :
                            undefined
                }
            >
                <LayoutWrapper widthStructure={ widthStructureCondition } >
                    <LayoutWrapperNavigationSidebar>
                        {navigationSidebar}
                    </LayoutWrapperNavigationSidebar>
                    {
                        navigationStructreShow ? (
                            <LayoutWrapperNavigationStructure
                                ref={ gridWrapperNavigationStructureRef }
                                widthStructure={ gridWrapperNavigationStructureWidth }
                            >
                                {navigationStructure}
                                <Resizer
                                    max={ NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH_MAX }
                                    min={ NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH }
                                    onDragEnd={ handlerDragEnd }
                                />
                            </LayoutWrapperNavigationStructure>
                        ) : null
                    }
                    <LayoutWrapperMain>
                        {
                            navigationHeaderShow ? (
                                <LayoutWrapperNavigationHeader
                                    structure={ navigationStructreShow }
                                    widthStructure={ widthStructureCondition }
                                    highest={ layoutMode === LayoutModes.SIDEBAR_HEADER_HIGHEST_CONTENT }
                                >
                                    {navigationHeader}
                                </LayoutWrapperNavigationHeader>
                            ) : null
                        }
                        <LayoutWrapperContent
                            structure={ navigationStructreShow }
                            header={ navigationHeaderShow }
                            widthStructure={ widthStructureCondition }
                        >
                            {content}
                        </LayoutWrapperContent>
                    </LayoutWrapperMain>
                </LayoutWrapper>
            </CSSTransition>
        );
    }, [
        applied,
        content,
        gridWrapperNavigationStructureWidth,
        layoutMode,
        navigationHeader,
        navigationSidebar,
        navigationStructure,
    ] );

    useProfiler( "Layout" );

    return getView();

}
