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
    isLayoutMode,
    LayoutModes,
    LayoutProps,
    LayoutInstance,
} from '@app/modules/layout/layout.types';
import { layoutModeLocalStorage } from '@app/modules/layout/layout.helpers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useProfiler } from "@utils/useProfiler";

const initialLayoutInstance:LayoutInstance = {
    classNames: "",
};

export function Layout ( {
    layoutMode: layoutModeProp,
    navigationSidebar,
    navigationHeader,
    navigationStructure,
    content,
}:LayoutProps ) {

    const [ , _render ] = useState( 0 );
    const { layoutMode, setLayoutMode } = useLayout();
    const instance = useRef<LayoutInstance>( initialLayoutInstance ).current;
    const render = useCallback( () => _render( _ => ++_ ), []);

    const setRef = useCallback( ( element ) => {

        if ( instance.element  ) {
            return;
        }

        instance.element = element;

        instance.changeLayoutMode = ( layoutModeNew:LayoutModes ) => {
            if ( layoutModeNew !== instance.layoutModeRequest ) {
                if ( instance.classNames.includes( "animation" ) === false ) {
                    instance.layoutModeRequest = layoutModeNew;
                    if ( 
                        instance.layoutModeRequest === LayoutModes.SIDEBAR_HEADER_CONTENT &&
                        instance.layoutModeCurrent === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT 
                    ) {
                        setTimeout( () => {
                            if ( instance.layoutModeCurrent ) {
                                instance.layoutModeCurrent = layoutModeNew;
                                instance.classNames = "";
                                render();
                            }
                        }, NAVIGATION_STRUCTURE_ANIMATION_DURATION );
                        instance.classNames = "animation_structure_out";
                        layoutModeLocalStorage( layoutModeNew );
                        render();
                    } else if (
                        instance.layoutModeRequest === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT &&
                        instance.layoutModeCurrent === LayoutModes.SIDEBAR_HEADER_CONTENT
                    ) {
                        instance.layoutModeCurrent = layoutModeNew;
                        layoutModeLocalStorage( layoutModeNew );
                        setTimeout( () => {
                            instance.classNames = "";
                            render();
                        }, NAVIGATION_STRUCTURE_ANIMATION_DURATION );
                        instance.classNames = "animation_structure_in";
                        render();
                    } else {
                        layoutModeLocalStorage( layoutModeNew );
                        instance.layoutModeCurrent = layoutModeNew;
                        render();
                    }
                } else {
                    instance.layoutModeDeferred = layoutModeNew;
                }
            }
        };

    }, [] );

    useEffect ( () => {
        if (
            instance.layoutModeDeferred &&
            instance.changeLayoutMode &&
            instance.classNames.includes( "animation" ) === false
        ) {
            instance.changeLayoutMode( instance.layoutModeDeferred );
            delete instance.layoutModeDeferred;
        }
    } );

    useEffect( () => {
        instance.changeLayoutMode &&
            isLayoutMode( layoutMode ) &&
            instance.changeLayoutMode( layoutMode );
    }, [
        instance,
        layoutMode,
    ] );

    useEffect ( () => {
        let layoutModeCalculated;
        const layoutModeLocalStorageFrom = layoutModeLocalStorage();
        if (
            [
                LayoutModes.SIDEBAR_HEADER_CONTENT,
                LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
            ].includes(layoutModeProp)    
        ) {
            layoutModeCalculated = layoutModeLocalStorageFrom ||
                layoutModeProp ||
                LayoutModes.SIDEBAR_HEADER_CONTENT; 
        } else {
            layoutModeCalculated = layoutModeProp ||
                layoutModeLocalStorageFrom ||
                LayoutModes.SIDEBAR_HEADER_CONTENT; 
        }
        if ( !layoutMode || layoutMode !== layoutModeProp ) {
            isLayoutMode( layoutModeCalculated ) && setLayoutMode( layoutModeCalculated );
        }
    } );

    useEffect( () => {
        window.scroll( 0, 0 );
    }, [ content ] );

    const getLayoutModeView = useCallback( () => {
        if ( !instance.layoutModeCurrent ) {
            return null;
        }
        return  ( 
            instance.layoutModeCurrent === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT ? (
                <>
                    <GridWrapperNavigationSidebar item>{navigationSidebar}</GridWrapperNavigationSidebar>
                    <GridWrapperNavigationStructure item>{navigationStructure}</GridWrapperNavigationStructure>
                    <GridWrapperMain container direction="column">
                        <GridWrapperNavigationHeader structure item>{navigationHeader}</GridWrapperNavigationHeader>
                        <GridWrapperContent structure header item>{content}</GridWrapperContent>
                    </GridWrapperMain>
                </>
            ) :
            instance.layoutModeCurrent === LayoutModes.SIDEBAR_CONTENT ? (
                <>
                    <GridWrapperNavigationSidebar item>{ navigationSidebar }</GridWrapperNavigationSidebar>
                    <GridWrapperMain direction="column" container>
                        <GridWrapperContent item>{ content }</GridWrapperContent>
                    </GridWrapperMain>
                </>
            ) : ( 
                <>
                    <GridWrapperNavigationSidebar item>{ navigationSidebar }</GridWrapperNavigationSidebar>
                    <GridWrapperMain direction="column" container>
                        <GridWrapperNavigationHeader item>{ navigationHeader }</GridWrapperNavigationHeader>
                        <GridWrapperContent header item>{ content }</GridWrapperContent>
                    </GridWrapperMain>
                </>
            )
        );
    }, [
        content,
        instance,
        navigationHeader,
        navigationSidebar,
        navigationStructure,
    ] );

    useProfiler( "Layout" );

    return (
        <GridWrapper ref={ setRef } className={ instance.classNames } direction="row" container>
            { getLayoutModeView() }
        </GridWrapper>
    );

}
