import type { InputNumberDesignTokens, InputNumberTokenSections } from '@primeuix/themes/types/inputnumber';

export const root: InputNumberTokenSections.Root = {
    transitionDuration: '{transition.duration}'
};

export const button: InputNumberTokenSections.Button = {
    width: '2.5rem',
    borderRadius: '{form.field.border.radius}',
    verticalPadding: '{form.field.padding.y}'
};

export const colorScheme: InputNumberTokenSections.ColorScheme = {
    light: {
        button: {
            background: '{surface.100}',
            hoverBackground: '{surface.200}',
            activeBackground: '{surface.300}',
            borderColor: '{form.field.border.color}',
            hoverBorderColor: '{form.field.border.color}',
            activeBorderColor: '{form.field.border.color}',
            color: '{surface.600}',
            hoverColor: '{surface.700}',
            activeColor: '{surface.800}'
        }
    },
    dark: {
        button: {
            background: '{surface.800}',
            hoverBackground: '{surface.700}',
            activeBackground: '{surface.500}',
            borderColor: '{form.field.border.color}',
            hoverBorderColor: '{form.field.border.color}',
            activeBorderColor: '{form.field.border.color}',
            color: '{surface.300}',
            hoverColor: '{surface.200}',
            activeColor: '{surface.100}'
        }
    }
};

export default {
    root,
    button,
    colorScheme
} satisfies InputNumberDesignTokens;
