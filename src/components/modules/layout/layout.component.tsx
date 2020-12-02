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
    isLayoutMode,
} from '@app/modules/layout/layout.types';
import { layoutModeLocalStorage } from '@app/modules/layout/layout.helpers';
import React, {
    useCallback,
    useEffect,
    useState
} from 'react';
import { useProfiler } from "@utils/useProfiler";
import { CSSTransition } from "react-transition-group";

export function Layout ( {
    content,
    layoutMode: layoutModeProp,
    navigationHeader,
    navigationSidebar,
    navigationStructure,
}:LayoutProps ) {

    const [ blockChange, setBlockChange ] = useState<boolean>(false);
    const [ layoutModeApplied, setLayoutModeApplied ] = useState<LayoutModes>();
    const [ layoutModePropBefore, setLayoutModePropBefore ] = useState<LayoutModes>();
    const [ layoutTransition, setLayoutTransition ] = useState<boolean>();
    const { layoutMode, layoutModePrev, setLayoutMode } = useLayout();

    useEffect( () => {
        if ( blockChange ) {
            return;
        }
        if ( layoutMode && layoutMode !== layoutModeApplied ) {
            if ( layoutMode !== LayoutModes.SIDEBAR_CONTENT ) {
                layoutModeLocalStorage( layoutMode );
            }
            setLayoutModeApplied( layoutMode );
            if (
                layoutModePrev === LayoutModes.SIDEBAR_HEADER_CONTENT &&
                layoutMode === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
            ) {
                setLayoutTransition(true);
            }
            if (
                layoutModePrev === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT &&
                layoutMode === LayoutModes.SIDEBAR_HEADER_CONTENT
            ) {
                setLayoutTransition(false);
            }
            return;
        }
        if (
            layoutModeProp !== layoutModeApplied &&
            layoutModeProp !== layoutModePropBefore
        ) {
            if (
                layoutModeProp !== LayoutModes.SIDEBAR_CONTENT &&
                (
                    !layoutModePropBefore ||
                    [
                        LayoutModes.SIDEBAR_HEADER_CONTENT,
                        LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT,
                    ].includes( layoutModePropBefore ) === false    
                )
            ) {
                const layoutModeLocalStorageFrom = layoutModeLocalStorage();
                if ( isLayoutMode( layoutModeLocalStorageFrom ) ) {
                    setLayoutModePropBefore( layoutModeProp );
                    setLayoutMode( layoutModeLocalStorageFrom );
                    return;
                }
            }
            setLayoutMode( layoutModeProp );
            setLayoutModePropBefore( layoutModeProp );
        }
    }, [
        blockChange,
        layoutMode,
        layoutModeApplied,
        layoutModeProp,
        layoutModePropBefore,
        layoutTransition,
    ] );

    useEffect( () => {
        window.scroll( 0, 0 );
    }, [ content ] );

    const getView = useCallback( () => {
        if ( !layoutModeApplied ) {
            return null;
        }
        
        if ( layoutModeApplied === LayoutModes.SIDEBAR_CONTENT ) {
            return (
                <GridWrapper direction="row" container>
                    <GridWrapperNavigationSidebar item>{ navigationSidebar }</GridWrapperNavigationSidebar>
                    <GridWrapperMain direction="column" container>
                        <GridWrapperContent item>{ content }</GridWrapperContent>
                    </GridWrapperMain>
                </GridWrapper>
            );
        } else if (
            layoutTransition === undefined &&
            layoutModeApplied === LayoutModes.SIDEBAR_HEADER_CONTENT
        ) {
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
            layoutTransition !== undefined ||
            layoutModeApplied === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
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
            if ( layoutTransition === undefined ) {
                return view;
            } else {
                if ( layoutTransition ) {
                    return (
                        <CSSTransition
                            in={ true }
                            appear={ true }
                            timeout={ NAVIGATION_STRUCTURE_ANIMATION_DURATION }
                            onEnter={ () => setBlockChange(true) }
                            onEntered={ () => {
                                setBlockChange(false);
                                setLayoutTransition(undefined);
                            } }
                            classNames="structure-in"
                        >
                            { view }
                        </CSSTransition>
                    );
                } else {
                    return (
                        <CSSTransition
                            in={ true }
                            appear={ true }
                            timeout={ NAVIGATION_STRUCTURE_ANIMATION_DURATION }
                            onEnter={ () => setBlockChange(true) }
                            onEntered={ () => {
                                setBlockChange(false);
                                setLayoutTransition(undefined);
                            } }
                            classNames="structure-out"
                        >
                            { view }
                        </CSSTransition>
                    );
                }
            }
        }

        return null;

    }, [
        content,
        layoutModeApplied,
        layoutTransition,
        navigationHeader,
        navigationSidebar,
        navigationStructure,
    ] );

    useProfiler( "Layout" );

    return getView();

}
