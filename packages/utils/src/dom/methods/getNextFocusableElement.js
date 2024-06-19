import getFocusableElements from './getFirstFocusableElement';

export default function getNextFocusableElement(container, element, selector) {
    const focusableElements = getFocusableElements(container, selector);
    const index = focusableElements.length > 0 ? focusableElements.findIndex((el) => el === element) : -1;
    const nextIndex = index > -1 && focusableElements.length >= index + 1 ? index + 1 : -1;

    return nextIndex > -1 ? focusableElements[nextIndex] : null;
}
