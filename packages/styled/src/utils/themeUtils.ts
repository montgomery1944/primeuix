import { isEmpty, isNotEmpty, isObject, matchRegex, minifyCSS, resolve, toTokenKey } from '@primeuix/utils/object';
import { toVariables } from '../helpers/index';
import { getRule } from './sharedUtils';

export default {
    regex: {
        rules: {
            class: {
                pattern: /^\.([a-zA-Z][\w-]*)$/,
                resolve(value: string) {
                    return { type: 'class', selector: value, matched: this.pattern.test(value.trim()) };
                }
            },
            attr: {
                pattern: /^\[(.*)\]$/,
                resolve(value: string) {
                    return { type: 'attr', selector: `:root${value}`, matched: this.pattern.test(value.trim()) };
                }
            },
            media: {
                pattern: /^@media (.*)$/,
                resolve(value: string) {
                    return { type: 'media', selector: `${value}{:root{[CSS]}}`, matched: this.pattern.test(value.trim()) };
                }
            },
            system: {
                pattern: /^system$/,
                resolve(value: string) {
                    return { type: 'system', selector: '@media (prefers-color-scheme: dark){:root{[CSS]}}', matched: this.pattern.test(value.trim()) };
                }
            },
            custom: {
                resolve(value: string) {
                    return { type: 'custom', selector: value, matched: true };
                }
            }
        },
        resolve(value: any) {
            const rules = Object.keys(this.rules)
                .filter((k) => k !== 'custom')
                .map((r) => (this.rules as any)[r]);

            return [value].flat().map((v) => rules.map((r) => r.resolve(v)).find((rr) => rr.matched) ?? this.rules.custom.resolve(v));
        }
    },
    _toVariables(theme: any, options: any) {
        return toVariables(theme, { prefix: options?.prefix });
    },
    getCommon({ name = '', theme = {}, params, set, defaults }: any) {
        const { preset, options } = theme;
        let primitive_css, primitive_tokens, semantic_css, semantic_tokens;

        if (isNotEmpty(preset)) {
            const { primitive, semantic } = preset;
            const { colorScheme, ...sRest } = semantic || {};
            const { dark, ...csRest } = colorScheme || {};
            const prim_var: any = isNotEmpty(primitive) ? this._toVariables({ primitive }, options) : {};
            const sRest_var: any = isNotEmpty(sRest) ? this._toVariables({ semantic: sRest }, options) : {};
            const csRest_var: any = isNotEmpty(csRest) ? this._toVariables({ light: csRest }, options) : {};
            const dark_var: any = isNotEmpty(dark) ? this._toVariables({ dark }, options) : {};

            const [prim_css, prim_tokens] = [prim_var.declarations ?? '', prim_var.tokens];
            const [sRest_css, sRest_tokens] = [sRest_var.declarations ?? '', sRest_var.tokens || []];
            const [csRest_css, csRest_tokens] = [csRest_var.declarations ?? '', csRest_var.tokens || []];
            const [dark_css, dark_tokens] = [dark_var.declarations ?? '', dark_var.tokens || []];

            primitive_css = this.transformCSS(name, prim_css, 'light', 'variable', options, set, defaults);
            primitive_tokens = prim_tokens;

            const semantic_light_css = this.transformCSS(name, `${sRest_css}${csRest_css}color-scheme:light`, 'light', 'variable', options, set, defaults);
            const semantic_dark_css = this.transformCSS(name, `${dark_css}color-scheme:dark`, 'dark', 'variable', options, set, defaults);

            semantic_css = `${semantic_light_css}${semantic_dark_css}`;
            semantic_tokens = [...new Set([...sRest_tokens, ...csRest_tokens, ...dark_tokens])];
        }

        return {
            primitive: {
                css: primitive_css,
                tokens: primitive_tokens
            },
            semantic: {
                css: semantic_css,
                tokens: semantic_tokens
            }
        };
    },
    getPreset({ name = '', preset = {}, options, params, set, defaults, selector }: any) {
        const _name = name.replace('-directive', '');
        const { colorScheme, ...vRest } = preset;
        const { dark, ...csRest } = colorScheme || {};
        const vRest_var: any = isNotEmpty(vRest) ? this._toVariables({ [_name]: vRest }, options) : {};
        const csRest_var: any = isNotEmpty(csRest) ? this._toVariables({ [_name]: csRest }, options) : {};
        const dark_var: any = isNotEmpty(dark) ? this._toVariables({ [_name]: dark }, options) : {};

        const [vRest_css, vRest_tokens] = [vRest_var.declarations ?? '', vRest_var.tokens || []];
        const [csRest_css, csRest_tokens] = [csRest_var.declarations ?? '', csRest_var.tokens || []];
        const [dark_css, dark_tokens] = [dark_var.declarations ?? '', dark_var.tokens || []];
        const tokens = [...new Set([...vRest_tokens, ...csRest_tokens, ...dark_tokens])];

        const light_variable_css = this.transformCSS(_name, `${vRest_css}${csRest_css}`, 'light', 'variable', options, set, defaults, selector);
        const dark_variable_css = this.transformCSS(_name, dark_css, 'dark', 'variable', options, set, defaults, selector);

        return {
            css: `${light_variable_css}${dark_variable_css}`,
            tokens
        };
    },
    getPresetC({ name = '', theme = {}, params, set, defaults }: any) {
        const { preset, options } = theme;
        const cPreset = preset?.components?.[name];

        return this.getPreset({ name, preset: cPreset, options, params, set, defaults });
    },
    getPresetD({ name = '', theme = {}, params, set, defaults }: any) {
        const dName = name.replace('-directive', '');
        const { preset, options } = theme;
        const dPreset = preset?.directives?.[dName];

        return this.getPreset({ name: dName, preset: dPreset, options, params, set, defaults });
    },
    getColorSchemeOption(options: any, defaults: any) {
        return this.regex.resolve(options.darkModeSelector ?? defaults.options.darkModeSelector);
    },
    getLayerOrder(name: string, options: any = {}, params: any, defaults: any) {
        const { cssLayer } = options;

        if (cssLayer) {
            const order = resolve(cssLayer.order || 'primeui', params);

            return `@layer ${order}`;
        }

        return '';
    },
    getCommonStyleSheet({ name = '', theme = {}, params, props = {}, set, defaults }: any) {
        const common = this.getCommon({ name, theme, params, set, defaults });
        const _props = Object.entries(props)
            .reduce((acc: any, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
            .join(' ');

        return Object.entries(common || {})
            .reduce((acc: any, [key, value]) => {
                if (value?.css) {
                    const _css = minifyCSS(value?.css);
                    const id = `${key}-variables`;

                    acc.push(`<style type="text/css" data-primevue-style-id="${id}" ${_props}>${_css}</style>`); // @todo data-primevue -> data-primeui check in primevue usestyle
                }

                return acc;
            }, [])
            .join('');
    },
    getStyleSheet({ name = '', theme = {}, params, props = {}, set, defaults }: any) {
        const options = { name, theme, params, set, defaults };
        const preset_css = (name.includes('-directive') ? this.getPresetD(options) : this.getPresetC(options))?.css;
        const _props = Object.entries(props)
            .reduce((acc: any, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
            .join(' ');

        return preset_css ? `<style type="text/css" data-primevue-style-id="${name}-variables" ${_props}>${minifyCSS(preset_css)}</style>` : ''; // @todo check
    },
    createTokens(obj: any = {}, defaults: any, parentKey: string = '', parentPath: string = '', tokens: any = {}) {
        Object.entries(obj).forEach(([key, value]) => {
            const currentKey = matchRegex(key, defaults.variable.excludedKeyRegex) ? parentKey : parentKey ? `${parentKey}.${toTokenKey(key)}` : toTokenKey(key);
            const currentPath = parentPath ? `${parentPath}.${key}` : key;

            if (isObject(value)) {
                this.createTokens(value, defaults, currentKey, currentPath, tokens);
            } else {
                tokens[currentKey] ||= {
                    paths: [],
                    computed(colorScheme: string, tokenPathMap: any = {}) {
                        if (colorScheme) {
                            const path = this.paths.find((p: any) => p.scheme === colorScheme) || this.paths.find((p: any) => p.scheme === 'none');

                            return path?.computed(colorScheme, tokenPathMap['binding']);
                        }

                        return this.paths.map((p: any) => p.computed(p.scheme, tokenPathMap[p.scheme]));
                    }
                };
                tokens[currentKey].paths.push({
                    path: currentPath,
                    value,
                    scheme: currentPath.includes('colorScheme.light') ? 'light' : currentPath.includes('colorScheme.dark') ? 'dark' : 'none',
                    computed(colorScheme: string, tokenPathMap: any = {}) {
                        const regex = /{([^}]*)}/g;
                        let computedValue: any = value;

                        tokenPathMap['name'] = this.path;
                        tokenPathMap['binding'] ||= {};

                        if (matchRegex(value as string, regex)) {
                            const val = (value as string).trim();
                            const _val = val.replaceAll(regex, (v) => {
                                const path = v.replace(/{|}/g, '');

                                return tokens[path]?.computed(colorScheme, tokenPathMap)?.value;
                            });

                            const calculationRegex = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g;
                            const cleanedVarRegex = /var\([^)]+\)/g;

                            computedValue = matchRegex(_val.replace(cleanedVarRegex, '0'), calculationRegex) ? `calc(${_val})` : _val;
                        }

                        isEmpty(tokenPathMap['binding']) && delete tokenPathMap['binding'];

                        return {
                            colorScheme,
                            path: this.path,
                            paths: tokenPathMap,
                            value: computedValue.includes('undefined') ? undefined : computedValue
                        };
                    }
                });
            }
        });

        return tokens;
    },
    getTokenValue(tokens: any, path: string, defaults: any) {
        const normalizePath = (str: string) => {
            const strArr = str.split('.');

            return strArr.filter((s) => !matchRegex(s.toLowerCase(), defaults.variable.excludedKeyRegex)).join('.');
        };

        const token = normalizePath(path);
        const colorScheme = path.includes('colorScheme.light') ? 'light' : path.includes('colorScheme.dark') ? 'dark' : undefined;
        const computedValues = [tokens[token as any]?.computed(colorScheme)].flat().filter((computed) => computed);

        return computedValues.length === 1
            ? computedValues[0].value
            : computedValues.reduce((acc = {}, computed) => {
                  const { colorScheme: cs, ...rest } = computed;

                  acc[cs] = rest;

                  return acc;
              }, undefined);
    },
    transformCSS(name: string, css: string, mode?: string, type?: string, options: any = {}, set?: any, defaults?: any, selector?: string) {
        if (isNotEmpty(css)) {
            const { cssLayer } = options;

            if (type !== 'style') {
                const colorSchemeOption = this.getColorSchemeOption(options, defaults);
                const _css = selector ? getRule(selector, css) : css;

                css =
                    mode === 'dark'
                        ? colorSchemeOption.reduce((acc, { selector: _selector }) => {
                              if (isNotEmpty(_selector)) {
                                  acc += _selector.includes('[CSS]') ? _selector.replace('[CSS]', _css) : getRule(_selector, _css);
                              }

                              return acc;
                          }, '')
                        : getRule(selector ?? ':root', css);
            }

            if (cssLayer) {
                const layerOptions = {
                    name: 'primeui',
                    order: 'primeui'
                };

                isObject(cssLayer) && (layerOptions.name = resolve(cssLayer.name, { name, type }));

                if (isNotEmpty(layerOptions.name)) {
                    css = getRule(`@layer ${layerOptions.name}`, css);
                    set?.layerNames(layerOptions.name);
                }
            }

            return css;
        }

        return '';
    }
};
