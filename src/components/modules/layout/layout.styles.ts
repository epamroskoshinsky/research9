import {
    NAVIGATION_HEADER_HEIGHT,
    NAVIGATION_SIDEBAR_WIDTH,
    NAVIGATION_STRUCTURE_ANIMATION_DURATION,
    NAVIGATION_STRUCTURE_WIDTH,
} from '@app/modules/layout/layout.constants';
import Grid from "@material-ui/core/Grid";
import styled from 'styled-components';

export const GridWrapperNavigationSidebar = styled(Grid)`
    width: ${NAVIGATION_SIDEBAR_WIDTH}px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`;

export const GridWrapperNavigationStructure = styled(Grid)`
    height: 100%;
    position: fixed;
    top: 0;
    left: ${NAVIGATION_SIDEBAR_WIDTH}px;
    width: ${NAVIGATION_STRUCTURE_WIDTH}px;
    z-index: 1;
`;

export const GridWrapperMain = styled(Grid)`
    flex: 1 1 auto;
    flex-wrap: nowrap;
`;

export const GridWrapperNavigationHeader = styled(Grid)<{ structure?: boolean }>`
    flex: 0 0 ${NAVIGATION_HEADER_HEIGHT}px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 0 0
        ${({ structure }) =>
            structure ? NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH : NAVIGATION_SIDEBAR_WIDTH}px;
    height: ${NAVIGATION_HEADER_HEIGHT}px;
`;

export const GridWrapperContent = styled(Grid)<{ structure?: boolean; header?: boolean }>`
    padding: ${({ header }) => (header ? NAVIGATION_HEADER_HEIGHT : 0)}px 0 0
        ${({ structure }) =>
            structure ? NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH : NAVIGATION_SIDEBAR_WIDTH}px;
`;

export const GridWrapper = styled(Grid)`
    width: 100%;
    height: 100%;
    flex-wrap: nowrap;

    &.structure-in-appear {
        ${GridWrapperNavigationStructure} {
            width: 0;
        }
        ${GridWrapperNavigationHeader} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
        }
        ${GridWrapperContent} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;            
        }
    }

    &.structure-in-appear-active {
        ${GridWrapperNavigationStructure} {
            width: ${NAVIGATION_STRUCTURE_WIDTH}px;
            transition: width ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperNavigationHeader} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH}px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperContent} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH}px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;            
        }
    }

    &.structure-out-appear {
        ${GridWrapperNavigationStructure} {
            width: ${NAVIGATION_STRUCTURE_WIDTH}px;
        }
        ${GridWrapperNavigationHeader} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH}px;
        }
        ${GridWrapperContent} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH}px;
        }
    }

    &.structure-out-appear-active {
        ${GridWrapperNavigationStructure} {
            width: 0px;
            transition: width ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperNavigationHeader} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperContent} {
            padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
            transition: padding-left ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
    }
`;
