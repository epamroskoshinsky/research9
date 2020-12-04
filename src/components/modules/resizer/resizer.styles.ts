import styled from 'styled-components';

export const ResizerWrapper = styled.div<{ isDragging: boolean }>`
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 0px;

    &:after {
        background-color: ${ ( { isDragging } ) => isDragging && "gray" };
        content: "";
        height: 100%;
        left: -2px;
        position: absolute;
        width: 4px;
    }

    &:before {
        content: "";
        cursor: col-resize;
        height: 100%;
        left: -5px;
        position: absolute;
        width: 10px;
        z-index: 1;
    }

`;