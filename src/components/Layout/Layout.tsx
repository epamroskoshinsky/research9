import React, { 
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import { useLayout } from "./LayoutProvider";
import { 
    GridWrapper,
    GridWrapperContent,
    GridWrapperMain,
    GridWrapperNavigationSidebar,
    GridWrapperNavigationStructure,
    GridWrapperNavigationHeader
} from "./LayoutStyled";
import {
    NAVIGATION_STRUCTURE_ANIMATION_DURATION
} from "./LayoutConstants";
import { isLayoutMode, LayoutInstance, LayoutModes, LayoutProps } from "./LayoutTypes";
import { useProfiler } from "../../utils/useProfiler";
import { LAYOUT_MODE_LOCALSTORAGE_KEY } from "./LayoutConstants";

const layoutModeLocalStorage = function ( layoutMode?:LayoutModes ) {
    const layoutModeLocalStorage_ = window.localStorage.getItem( LAYOUT_MODE_LOCALSTORAGE_KEY );
    if ( 
        layoutMode &&
        [
            LayoutModes.SIDEBAR_HEADER_CONTENT,
            LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
        ].includes( layoutMode )
    ) {
        window.localStorage.setItem( LAYOUT_MODE_LOCALSTORAGE_KEY, layoutMode );
        return layoutMode;
    }
    return layoutModeLocalStorage_;
}


export function Layout ( {
    layoutMode: layoutMode_,
    navigationSidebar,
    navigationHeader,
    navigationStructure,
    content,
}:LayoutProps ) {

    const [ , _render ] = useState( 0 );
    const { layoutMode, setLayoutMode } = useLayout();
    const instance = useRef<LayoutInstance>( {
        classNames: "",
    } ).current;
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
                    if ( instance.layoutModeRequest !== layoutModeNew ) {
                        instance.layoutModeDeferred = layoutModeNew;
                    }
                }
            }
        };

    }, [] );

    useEffect ( () => {
        if ( instance.layoutModeDeferred && instance.changeLayoutMode ) {
            instance.changeLayoutMode( instance.layoutModeDeferred );
            delete instance.layoutModeDeferred;
        }
    } );

    useEffect( () => {
        instance.changeLayoutMode &&
            isLayoutMode( layoutMode ) &&
            instance.changeLayoutMode( layoutMode );
    }, [ layoutMode, instance ] );

    useEffect ( () => {
        let layoutMode__;
        if ( !layoutMode ) {
            layoutMode__ = layoutMode_ ||
                layoutModeLocalStorage() ||
                LayoutModes.SIDEBAR_HEADER_CONTENT; 
        } else if ( !layoutMode_ ) {
            layoutMode__ = layoutModeLocalStorage() ||
                LayoutModes.SIDEBAR_HEADER_CONTENT; 
        }
        isLayoutMode( layoutMode__ ) && setLayoutMode( layoutMode__ );
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
    }, [ instance, navigationSidebar, navigationHeader, navigationStructure, content ] );

    useProfiler( "Layout" );

    return (
        <GridWrapper ref={ setRef } className={ instance.classNames } direction="row" container>
            { getLayoutModeView() }
        </GridWrapper>
    );

}
