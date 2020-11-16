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
import { LayoutInstance, LayoutModes, LayoutProps } from "./LayoutTypes";
import { useProfiler } from "../../utils/useProfiler";

export function Layout ( {
    navigationSidebar,
    navigationHeader,
    navigationStructure,
    content,
}:LayoutProps ) {

    const [ , _render ] = useState( 0 );
    const { layoutMode } = useLayout();
    const instance = useRef<LayoutInstance>( {
        classNames: ""
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
                        render();
                    } else if (
                        instance.layoutModeRequest === LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT &&
                        instance.layoutModeCurrent === LayoutModes.SIDEBAR_HEADER_CONTENT
                    ) {
                        instance.layoutModeCurrent = layoutModeNew;
                        setTimeout( () => {
                            instance.classNames = "";
                            render();
                        }, NAVIGATION_STRUCTURE_ANIMATION_DURATION );
                        instance.classNames = "animation_structure_in";
                        render();
                    } else {
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
        if ( instance.changeLayoutMode ) {
            instance.changeLayoutMode( layoutMode );
        }
    }, [ layoutMode, instance ] );

    useProfiler( "Layout" );

    return (
        <GridWrapper ref={ setRef } className={ instance.classNames } direction="row" container>
            { 
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
            }
        </GridWrapper>
    );

}
