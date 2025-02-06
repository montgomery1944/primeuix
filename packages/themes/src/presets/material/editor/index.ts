import type { EditorDesignTokens, EditorTokenSections } from '@primeuix/themes/types/editor';

export const toolbar: EditorTokenSections.Toolbar = {
    background: '{content.background}',
    borderColor: '{content.border.color}',
    borderRadius: '{content.border.radius}'
};

export const toolbarItem: EditorTokenSections.ToolbarItem = {
    color: '{text.muted.color}',
    hoverColor: '{text.color}',
    activeColor: '{primary.color}'
};

export const overlay: EditorTokenSections.Overlay = {
    background: '{overlay.select.background}',
    borderColor: '{overlay.select.border.color}',
    borderRadius: '{overlay.select.border.radius}',
    color: '{overlay.select.color}',
    shadow: '{overlay.select.shadow}',
    padding: '{list.padding}'
};

export const overlayOption: EditorTokenSections.OverlayOption = {
    focusBackground: '{list.option.focus.background}',
    color: '{list.option.color}',
    focusColor: '{list.option.focus.color}',
    padding: '{list.option.padding}',
    borderRadius: '{list.option.border.radius}'
};

export const content: EditorTokenSections.Content = {
    background: '{content.background}',
    borderColor: '{content.border.color}',
    color: '{content.color}',
    borderRadius: '{content.border.radius}'
};

// @section:css-start
export const css: EditorTokenSections.CSS = `
.p-editor .p-editor-toolbar {
    padding: 0.75rem
}
`;
// @section:css-end

export default {
    toolbar,
    toolbarItem,
    overlay,
    overlayOption,
    content,
    css
} satisfies EditorDesignTokens;
