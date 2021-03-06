import { ReactElement } from 'react';

export interface AnimationInterface {
    duration?: number;
    onEnd?(_?:any): void;
}

export interface LayoutProps extends AnimationInterface {
    layoutMode: LayoutModes;
    navigationSidebar?: ReactElement;
    navigationStructure?: ReactElement;
    navigationHeader?: ReactElement;
    navigationHeader2?: ReactElement;
    content?: ReactElement;
}

export enum LayoutModes {
    SIDEBAR_CONTENT = 'SIDEBAR_CONTENT',
    SIDEBAR_HEADER_CONTENT = 'SIDEBAR_HEADER_CONTENT',
    SIDEBAR_HEADER_HIGHEST_CONTENT = 'SIDEBAR_HEADER_HIGHEST_CONTENT',
    SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT = 'SIDEBAR_STRUCTURE_COLLAPSED_HEADER_CONTENT',
    SIDEBAR_STRUCTURE_HEADER_CONTENT = 'SIDEBAR_STRUCTURE_HEADER_CONTENT',
    SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT = 'SIDEBAR_STRUCTURE_TRANSITION_IN_HEADER_CONTENT',
    SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT = 'SIDEBAR_STRUCTURE_TRANSITION_OUT_HEADER_CONTENT',
}

export const isLayoutMode = (value: unknown): value is LayoutModes => {
    // https://www.typescriptlang.org/play?ts=4.0.5#code/KYOwrgtgBAMghgTwPZgC4FkkBNgGcoDeAUFKVAMoCSAIgKIBCAggEoD6AErY3WwMIDyAOQAqtEVAC8UAOS4AljgBGcAE6sAFsDg41AYyQhUoVNIA0JMlTpM25YcwCqvYQ+a0OXHqwEixwyTLySqqsuKgqYLqoYCrAGlo6rPqGxmYWpFYMLN5CouJSsgrAynoGRoZpAL5ERMlhUHK48MhomDgBABQAbnAANmDAAFxQYCAA1iBIAO4gAJTDPf3ADfjNKBjYeJIAfITpULHRKiBQqAgADsBIAGZQiwOSEgVhKnIgAObSUABk31Ad-EUACtgFEoHB8HAQAhZgA6e54DprVqbXBwt66fo4XDdPoDWYAbiIlSJtQMuCQvWAsN6SHeHRWyI2OA6ACIjGFWbMoISySAKVSaXSGY0mW1gEjEOtxbhYZkbDlfCJuYSgA
    // typeof value === 'string' && (Object as any).values(LayoutModes).includes(value);
    // generate error
    // + tslint:disable-next-line:no-any
    // + BLOCKER SonarQube violation:
    //   type declaration of 'any' loses type-safety. Consider replacing it with a more precise type.
    // const values = Object.keys(LayoutModes).map(key => LayoutModes[key]);
    // return typeof value === 'string' && values.includes(value);
    return typeof value === 'string' && (Object as any).values(LayoutModes).includes(value);
};

export interface LayoutContextInterface {
    layoutModePrev?: LayoutModes;
    layoutMode?: LayoutModes;
    setLayoutMode(mode: LayoutModes): void;
    toggleStructure(): void;
}
