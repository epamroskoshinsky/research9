import { ResizerProps } from '@app/modules/resizer/resizer.types';
import { ResizerWrapper } from '@app/modules/resizer/resizer.styles';
import { useProfiler } from "@utils/useProfiler";
import React, { memo, SyntheticEvent, useState, useRef, useCallback } from "react";

export const Resizer = memo( function Resizer ({
    max,
    min,
    onDragEnd,
}: ResizerProps ) {

    const [pageX, setPageX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const resizerRef = useRef<HTMLDivElement>();

    const setResizerRef = useCallback( ( node ) => {
        if ( resizerRef.current || !node) {
            return;
        }
        resizerRef.current = node;
    }, [] );

    const handleMouseDown = (event: SyntheticEvent) => {
        event.preventDefault();
        const offsetX = resizerRef.current ? resizerRef.current.getBoundingClientRect().x : 0;

        const handleMouseMove = (event: MouseEvent) => {
            let newX = event.pageX - offsetX;
            if ( max !== undefined && event.pageX > max ) {
                newX = max - offsetX;
            }
            if ( min !== undefined && event.pageX < min ) {
                newX = min - offsetX;
            }
            setPageX(newX);
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            if (resizerRef.current) {
                const x = resizerRef.current.getBoundingClientRect().x;
                onDragEnd( x );
                setPageX(0);
            }
            setIsDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        setIsDragging(true);
    };

    useProfiler("Resizer");

    return (
        <ResizerWrapper
            ref={ setResizerRef }
            isDragging={ isDragging }
            style={ { right: -pageX } }
            onMouseDown={ handleMouseDown }
        />
    );

} );