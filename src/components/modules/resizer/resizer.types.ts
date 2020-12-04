export interface ResizerProps {
    horizontal?:boolean;
    id?:string;
    max?:number;
    memorize?:boolean;
    min?:number;
    onDragEnd(offset: number): void;
    vertical?:boolean;
}