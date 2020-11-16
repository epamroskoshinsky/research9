import { ReactElement } from 'react';

export interface LayoutInstance {
    element?: HTMLElement;
    classNames: string;
    layoutModeCurrent?: LayoutModes;
    layoutModeDeferred?: LayoutModes;
    layoutModeRequest?: LayoutModes;
    changeLayoutMode?: (_:LayoutModes)=>void;
}

export interface LayoutProps {
    layoutMode?: LayoutModes;
    navigationSidebar?: ReactElement;
    navigationStructure?: ReactElement;
    navigationHeader?: ReactElement;
    navigationHeader2?: ReactElement;
    content?: ReactElement;
}

export enum LayoutModes {
    SIDEBAR_HEADER_CONTENT = 'sidebar_header_content',
    SIDEBAR_STRUCTURE_HEADER_CONTENT = 'sidebar_structure_header_content',
    SIDEBAR_CONTENT = 'sidebar_content',
}

export const isLayoutMode = (value: unknown): value is LayoutModes => {
    return typeof value === "string" &&
    (<any>Object).values( LayoutModes ).includes( value );
}

export interface LayoutContextInterface {
    layoutMode: LayoutModes|undefined;
    setLayoutMode( mode:LayoutModes ):void;
    toggleStructure(): void;
}
