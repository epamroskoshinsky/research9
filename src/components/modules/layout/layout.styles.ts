import {
    NAVIGATION_HEADER_HEIGHT,
    NAVIGATION_SIDEBAR_WIDTH,
    NAVIGATION_STRUCTURE_ANIMATION_DURATION,
    NAVIGATION_STRUCTURE_WIDTH,
} from '@app/modules/layout/layout.constants';
// import { Grid } from '@perf/ui-components';
import Grid from "@material-ui/core/Grid";
import styled, { keyframes } from 'styled-components';

const keyframesStructureIn = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: ${NAVIGATION_STRUCTURE_WIDTH}px;
    }
`;

const keyframesStructureInHeaderContent = keyframes`
    0% {
        padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
    }
    100% {
        padding-left: ${NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH}px;
    }
`;

const keyframesStructureOut = keyframes`
    0% {
        width: ${NAVIGATION_STRUCTURE_WIDTH}px;
    }
    100% {
        width: 0;
    }
`;

const keyframesStructureOutHeaderContnent = keyframes`
    0% {
        padding-left: ${NAVIGATION_SIDEBAR_WIDTH + NAVIGATION_STRUCTURE_WIDTH}px;
    }
    100% {
        padding-left: ${NAVIGATION_SIDEBAR_WIDTH}px;
    }
`;

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

    &.animation_structure_in {
        ${GridWrapperNavigationStructure} {
            animation-name: ${keyframesStructureIn};
            animation-duration: ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperNavigationHeader} {
            animation-name: ${keyframesStructureInHeaderContent};
            animation-duration: ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperContent} {
            animation-name: ${keyframesStructureInHeaderContent};
            animation-duration: ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
    }

    &.animation_structure_out {
        ${GridWrapperNavigationStructure} {
            animation-name: ${keyframesStructureOut};
            animation-duration: ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperNavigationHeader} {
            animation-name: ${keyframesStructureOutHeaderContnent};
            animation-duration: ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
        ${GridWrapperContent} {
            animation-name: ${keyframesStructureOutHeaderContnent};
            animation-duration: ${NAVIGATION_STRUCTURE_ANIMATION_DURATION}ms;
        }
    }
`;
