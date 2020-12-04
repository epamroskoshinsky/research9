import {
    LAYOUT_MODE_LOCALSTORAGE_KEY,
    LAYOUT_MODE_LOCALSTORAGE_KEY_SIZE
} from '@app/modules/layout/layout.constants';
import { isLayoutMode, LayoutModes } from '@app/modules/layout/layout.types';

export const layoutModeLocalStorage = (layoutMode?: LayoutModes) => {
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

export const layoutStructureSizeLocalStorage = ( size?: number ) => {
    if (
        size &&
        typeof size === "number"
    ) {
        window.localStorage.setItem( LAYOUT_MODE_LOCALSTORAGE_KEY_SIZE, String( size ) );
        return size;
    }
    const sizeLocalStorage = window.localStorage.getItem( LAYOUT_MODE_LOCALSTORAGE_KEY_SIZE );
    return sizeLocalStorage && parseInt( sizeLocalStorage, 10 ) || undefined;
};
