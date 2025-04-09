import type { ToastDesignTokens, ToastTokenSections } from '@primeuix/themes/types/toast';

export const root: ToastTokenSections.Root = {
    width: '25rem',
    borderRadius: '{content.border.radius}',
    borderWidth: '0 0 0 6px',
    transitionDuration: '{transition.duration}'
};

export const icon: ToastTokenSections.Icon = {
    size: '1.25rem'
};

export const content: ToastTokenSections.Content = {
    padding: '{overlay.popover.padding}',
    gap: '0.5rem'
};

export const text: ToastTokenSections.Text = {
    gap: '0.5rem'
};

export const summary: ToastTokenSections.Summary = {
    fontWeight: '500',
    fontSize: '1rem'
};

export const detail: ToastTokenSections.Detail = {
    fontWeight: '500',
    fontSize: '0.875rem'
};

export const closeButton: ToastTokenSections.CloseButton = {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        offset: '{focus.ring.offset}'
    }
};

export const closeIcon: ToastTokenSections.CloseIcon = {
    size: '1rem'
};

export const colorScheme: ToastTokenSections.ColorScheme = {
    light: {
        root: {
            blur: '1.5px'
        },
        info: {
            background: 'color-mix(in srgb, {blue.50}, transparent 5%)',
            borderColor: '{blue.500}',
            color: '{blue.600}',
            detailColor: '{surface.700}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{blue.100}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem {blue.200}'
                }
            }
        },
        success: {
            background: 'color-mix(in srgb, {green.50}, transparent 5%)',
            borderColor: '{green.500}',
            color: '{green.600}',
            detailColor: '{surface.700}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{green.100}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem {green.200}'
                }
            }
        },
        warn: {
            background: 'color-mix(in srgb,{yellow.50}, transparent 5%)',
            borderColor: '{yellow.500}',
            color: '{yellow.600}',
            detailColor: '{surface.700}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{yellow.100}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem {yellow.200}'
                }
            }
        },
        error: {
            background: 'color-mix(in srgb, {red.50}, transparent 5%)',
            borderColor: '{red.500}',
            color: '{red.600}',
            detailColor: '{surface.700}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{red.100}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem {red.200}'
                }
            }
        },
        secondary: {
            background: '{surface.100}',
            borderColor: '{surface.500}',
            color: '{surface.600}',
            detailColor: '{surface.700}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{surface.200}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem {surface.200}'
                }
            }
        },
        contrast: {
            background: '{surface.900}',
            borderColor: '{primary.color}',
            color: '{surface.50}',
            detailColor: '{surface.0}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{surface.800}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem {surface.400}'
                }
            }
        }
    },
    dark: {
        root: {
            blur: '10px'
        },
        info: {
            background: 'color-mix(in srgb, {blue.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {blue.700}, transparent 64%)',
            color: '{blue.500}',
            detailColor: '{surface.0}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem color-mix(in srgb, {blue.500}, transparent 80%)'
                }
            }
        },
        success: {
            background: 'color-mix(in srgb, {green.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {green.700}, transparent 64%)',
            color: '{green.500}',
            detailColor: '{surface.0}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem color-mix(in srgb, {green.500}, transparent 80%)'
                }
            }
        },
        warn: {
            background: 'color-mix(in srgb, {yellow.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {yellow.700}, transparent 64%)',
            color: '{yellow.500}',
            detailColor: '{surface.0}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem color-mix(in srgb, {yellow.500}, transparent 80%)'
                }
            }
        },
        error: {
            background: 'color-mix(in srgb, {red.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {red.700}, transparent 64%)',
            color: '{red.500}',
            detailColor: '{surface.0}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem color-mix(in srgb, {red.500}, transparent 80%)'
                }
            }
        },
        secondary: {
            background: '{surface.800}',
            borderColor: '{surface.700}',
            color: '{surface.300}',
            detailColor: '{surface.0}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{surface.700}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem color-mix(in srgb, {surface.300}, transparent 80%)'
                }
            }
        },
        contrast: {
            background: '{surface.0}',
            borderColor: '{surface.100}',
            color: '{surface.950}',
            detailColor: '{surface.950}',
            shadow: '{overlay.popover.shadow}',
            closeButton: {
                hoverBackground: '{surface.100}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: '0 0 0 0.2rem color-mix(in srgb, {surface.950}, transparent 80%)'
                }
            }
        }
    }
};

export default {
    root,
    icon,
    content,
    text,
    summary,
    detail,
    closeButton,
    closeIcon,
    colorScheme
} satisfies ToastDesignTokens;
