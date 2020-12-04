import {
    NAVIGATION_HEADER_HEIGHT,
    NAVIGATION_HEADER_HEIGHT_HIGHEST,
    NAVIGATION_SIDEBAR_WIDTH,
    NAVIGATION_STRUCTURE_ANIMATION_DURATION,
    NAVIGATION_STRUCTURE_WIDTH,
} from '@app/modules/layout/layout.constants';
import styled from 'styled-components';

export const LayoutWrapperNavigationSidebar = styled.div`
    box-sizing: border-box;    
    height: 100%;
    left: 0;
    margin: 0;
    position: fixed;
    top: 0;
    width: ${NAVIGATION_SIDEBAR_WIDTH}px;
    z-index: 1;
`;

export const LayoutWrapperNavigationStructure = styled.div<{ widthStructure?: number }>`
    box-sizing: border-box;
    height: 100%;
    left: ${NAVIGATION_SIDEBAR_WIDTH}px;
    margin: 0;
    position: fixed;
    top: 0;
    width: ${ ( { widthStructure } ) => widthStructure === undefined ? NAVIGATION_STRUCTURE_WIDTH : widthStructure }px;
    z-index: 1;
`;

export const LayoutWrapperMain = styled.div`
    box-sizing: border-box;        
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex: 1 1 auto;
    width: 100%;
`;

export const LayoutWrapperNavigationHeader = styled.div< {
    highest?: boolean;
    structure?: boolean;
    widthStructure?: number;
} >`
    box-sizing: border-box;
    flex: 0 0 ${ ( { highest } ) => highest ? NAVIGATION_HEADER_HEIGHT_HIGHEST : NAVIGATION_HEADER_HEIGHT}px;
    left: 0;
    margin: 0;
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0 0 0
        ${ ( { structure, widthStructure } ) =>
            structure ?
                NAVIGATION_SIDEBAR_WIDTH +
                (
                    widthStructure === undefined ?
                    NAVIGATION_STRUCTURE_WIDTH :
                    widthStructure
                ) :
                NAVIGATION_SIDEBAR_WIDTH }px;
    height: ${ ( { highest } ) => highest ? NAVIGATION_HEADER_HEIGHT_HIGHEST : NAVIGATION_HEADER_HEIGHT}px;
`;

export const LayoutWrapperContent = styled.div< {
    header?: boolean;
    highest?: boolean;
    structure?: boolean;
    widthStructure?: number;
} >`
    box-sizing: border-box;
    margin: 0;
    padding: ${ ( { header, highest } ) => ( header ? ( highest ? NAVIGATION_HEADER_HEIGHT_HIGHEST : NAVIGATION_HEADER_HEIGHT ) : 0 ) }px 0 0
    ${ ( { structure, widthStructure } ) =>
    structure ?
        NAVIGATION_SIDEBAR_WIDTH +
        (
            widthStructure === undefined ?
            NAVIGATION_STRUCTURE_WIDTH :
            widthStructure
        ) :
        NAVIGATION_SIDEBAR_WIDTH }px;
`;

export const LayoutWrapper = styled.div<{ widthStructure?: number }>`
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;

    &.structure-in-appear {
        ${LayoutWrapperNavigationStructure} {
            width: 0;
        }
        ${LayoutWrapperNavigationHeader} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
        }
        ${LayoutWrapperContent} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;            
        }
    }

    &.structure-in-appear-active {
        ${LayoutWrapperNavigationStructure} {
            width: ${ ( { widthStructure } ) => widthStructure === undefined ? NAVIGATION_STRUCTURE_WIDTH : widthStructure }px;
            transition: width ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${LayoutWrapperNavigationHeader} {
            padding-left: ${ ( { widthStructure } ) => widthStructure === undefined ? NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH : NAVIGATION_SIDEBAR_WIDTH + widthStructure }px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${LayoutWrapperContent} {
            padding-left: ${ ( { widthStructure } ) => widthStructure === undefined ? NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH : NAVIGATION_SIDEBAR_WIDTH + widthStructure }px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;            
        }
    }

    &.structure-out-appear {
        ${LayoutWrapperNavigationStructure} {
            width: ${ ( { widthStructure } ) => widthStructure === undefined ? NAVIGATION_STRUCTURE_WIDTH : widthStructure }px;
        }
        ${LayoutWrapperNavigationHeader} {
            padding-left: ${ ( { widthStructure } ) => widthStructure === undefined ? NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH : NAVIGATION_SIDEBAR_WIDTH + widthStructure }px;
        }
        ${LayoutWrapperContent} {
            padding-left: ${ ( { widthStructure } ) => widthStructure === undefined ? NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH : NAVIGATION_SIDEBAR_WIDTH + widthStructure }px;
        }
    }

    &.structure-out-appear-active {
        ${LayoutWrapperNavigationStructure} {
            width: 0px;
            transition: width ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${LayoutWrapperNavigationHeader} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${LayoutWrapperContent} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
    }
`;
