import type { InputOtpDesignTokens, InputOtpTokenSections } from '@primeuix/themes/types/inputotp';

export const root: InputOtpTokenSections.Root = {
    gap: '0.5rem'
};

export const input: InputOtpTokenSections.Input = {
    width: '3rem',
    sm: {
        width: '2.5rem'
    },
    lg: {
        width: '3.5rem'
    }
};

export default {
    root,
    input
} satisfies InputOtpDesignTokens;
