import { LAYOUT_MODE_LOCALSTORAGE_KEY } from '@app/modules/layout/layout.constants';
import { LayoutModes } from '@app/modules/layout/layout.types';

export const layoutModeLocalStorage = (layoutMode?: LayoutModes)=> {
    const layoutModeLocalStorageItem = window.localStorage.getItem(LAYOUT_MODE_LOCALSTORAGE_KEY);
    if (
        layoutMode &&
        [
            LayoutModes.SIDEBAR_HEADER_CONTENT,
            LayoutModes.SIDEBAR_STRUCTURE_HEADER_CONTENT
        ].includes(layoutMode)
    ) {
        window.localStorage.setItem(LAYOUT_MODE_LOCALSTORAGE_KEY, layoutMode);
        return layoutMode;
    }
    return layoutModeLocalStorageItem;
};
