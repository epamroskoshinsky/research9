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
        if ( layoutMode === LayoutModes.SIDEBAR_CONTENT ) {
            return (
                <LayoutWrapper>
                    <LayoutWrapperNavigationSidebar>
                        { navigationSidebar }
                    </LayoutWrapperNavigationSidebar>
                    <LayoutWrapperMain>
                        <LayoutWrapperContent>
                            { content }
                        </LayoutWrapperContent>
                    </LayoutWrapperMain>
                </LayoutWrapper>
            );
        } else if ( 
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_HEADER_HIGHEST_CONTENT
        ) {
            return (
                <LayoutWrapper>
                    <LayoutWrapperNavigationSidebar>
                        { navigationSidebar }
                    </LayoutWrapperNavigationSidebar>
                    <LayoutWrapperMain>
                        <LayoutWrapperNavigationHeader highest={ layoutMode === LayoutModes.SIDEBAR_HEADER_HIGHEST_CONTENT } >
                            { navigationHeader }
                        </LayoutWrapperNavigationHeader>
                        <LayoutWrapperContent header highest={ layoutMode === LayoutModes.SIDEBAR_HEADER_HIGHEST_CONTENT } >
                            { content }
                        </LayoutWrapperContent>
                    </LayoutWrapperMain>
                </LayoutWrapper>
            );
        } else if (
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT
        ) {
            const view = (
                <LayoutWrapper widthStructure={ gridWrapperNavigationStructureWidth } >
                    <LayoutWrapperNavigationSidebar>
                        {navigationSidebar}
                    </LayoutWrapperNavigationSidebar>
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
                    <LayoutWrapperMain>
                        <LayoutWrapperNavigationHeader
                            structure
                            widthStructure={ gridWrapperNavigationStructureWidth }
                        >
                            {navigationHeader}
                        </LayoutWrapperNavigationHeader>
                        <LayoutWrapperContent
                            structure
                            header
                            widthStructure={ gridWrapperNavigationStructureWidth }
                        >
                            {content}
                        </LayoutWrapperContent>
                    </LayoutWrapperMain>
                </LayoutWrapper>
            );
            if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ) {
                return view;
            } else if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT ) {
                return (
                    <CSSTransition
                        in={ true }
                        appear={ true }
                        timeout={ NAVIGATION_STRUCTURE_ANIMATION_DURATION }
                        onEntered={ () => setLayoutMode( LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ) }
                        classNames="structure-in"
                    >
                        { view }
                    </CSSTransition>
                );
            } else if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT ) {
                return (
                    <CSSTransition
                        in={ true }
                        appear={ true }
                        timeout={ NAVIGATION_STRUCTURE_ANIMATION_DURATION }
                        onEntered={ () => setLayoutMode( LayoutModes.SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT ) }
                        classNames="structure-out"
                    >
                        { view }
                    </CSSTransition>
                );
            }
        }
        return null;
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
