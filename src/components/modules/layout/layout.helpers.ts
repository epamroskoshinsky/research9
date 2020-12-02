import { LAYOUT_MODE_LOCALSTORAGE_KEY } from '@app/modules/layout/layout.constants';
import { isLayoutMode, LayoutModes } from '@app/modules/layout/layout.types';

export const layoutModeLocalStorage = (layoutMode?: LayoutModes)=> {
    const layoutModeLocalStorageItem = window.localStorage.getItem(LAYOUT_MODE_LOCALSTORAGE_KEY);
    if (
        layoutMode &&
        isLayoutMode( layoutMode )
    ) {
        window.localStorage.setItem(LAYOUT_MODE_LOCALSTORAGE_KEY, layoutMode);
        return layoutMode;
    }
    return layoutModeLocalStorageItem;
};
