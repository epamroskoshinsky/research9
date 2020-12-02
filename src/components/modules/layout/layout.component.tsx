import { useLayout } from '@app/modules/layout';
import {
    NAVIGATION_STRUCTURE_ANIMATION_DURATION,
} from '@app/modules/layout/layout.constants';
import {
    GridWrapper,
    GridWrapperContent,
    GridWrapperMain,
    GridWrapperNavigationHeader,
    GridWrapperNavigationSidebar,
    GridWrapperNavigationStructure,
} from '@app/modules/layout/layout.styles';
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

export const Layout = ( {
    content,
    layoutMode: layoutModeProp,
    navigationHeader,
    navigationSidebar,
    navigationStructure,
}:LayoutProps ) => {

    const [ applied, setApplied ] = useState( false );
    const { layoutMode, setLayoutMode } = useLayout();

    useEffect( () => {
        if ( !layoutMode && layoutModeProp ) {
            setLayoutMode( layoutModeProp );
            setApplied( true );
        }
        if ( !applied && layoutModeProp ) {
            setLayoutMode( layoutModeProp );
            setApplied( true );
        }
    }, [
        applied,
        layoutMode,
        layoutModeProp,
    ] );

    useEffect( () => {
        window.scroll( 0, 0 );
    }, [ content ] );

    const getView = useCallback( () => {
        if ( !layoutMode ) {
            return null;
        }        
        if ( layoutMode === LayoutModes.SIDEBAR_CONTENT ) {
            return (
                <GridWrapper direction="row" container>
                    <GridWrapperNavigationSidebar item>{ navigationSidebar }</GridWrapperNavigationSidebar>
                    <GridWrapperMain direction="column" container>
                        <GridWrapperContent item>{ content }</GridWrapperContent>
                    </GridWrapperMain>
                </GridWrapper>
            );
        } else if ( layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT ) {
            return (
                <GridWrapper direction="row" container>
                    <GridWrapperNavigationSidebar item>{ navigationSidebar }</GridWrapperNavigationSidebar>
                    <GridWrapperMain direction="column" container>
                        <GridWrapperNavigationHeader item>{ navigationHeader }</GridWrapperNavigationHeader>
                        <GridWrapperContent header item>{ content }</GridWrapperContent>
                    </GridWrapperMain>
                </GridWrapper>
            );
        } else if (
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_IN_HEADER_CONTENT ||
            layoutMode === LayoutModes.SIDEBAR_STRUCTURE_OUT_HEADER_CONTENT
        ) {
            const view = (
                <GridWrapper direction="row" container>
                    <GridWrapperNavigationSidebar item>{navigationSidebar}</GridWrapperNavigationSidebar>
                    <GridWrapperNavigationStructure item>{navigationStructure}</GridWrapperNavigationStructure>
                    <GridWrapperMain container direction="column">
                        <GridWrapperNavigationHeader structure item>{navigationHeader}</GridWrapperNavigationHeader>
                        <GridWrapperContent structure header item>{content}</GridWrapperContent>
                    </GridWrapperMain>
                </GridWrapper>
            );
            if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ) {
                return view;
            } else if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_IN_HEADER_CONTENT ) {
                return (
                    <CSSTransition
                        in={ true }
                        appear={ true }
                        timeout={ NAVIGATION_STRUCTURE_ANIMATION_DURATION }
                        onEntered={ () => setLayoutMode(LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT) }
                        classNames="structure-in"
                    >
                        { view }
                    </CSSTransition>
                );
            } else if ( layoutMode === LayoutModes.SIDEBAR_STRUCTURE_OUT_HEADER_CONTENT ) {
                return (
                    <CSSTransition
                        in={ true }
                        appear={ true }
                        timeout={ NAVIGATION_STRUCTURE_ANIMATION_DURATION }
                        onEntered={ () => setLayoutMode(LayoutModes.SIDEBAR_HEADER_CONTENT) }
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
        layoutMode,
        navigationHeader,
        navigationSidebar,
        navigationStructure,
    ] );

    useProfiler( "Layout" );

    return getView();

}
