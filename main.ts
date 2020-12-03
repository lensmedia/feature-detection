const prefixes = ['-webkit-', '-moz-', '-o-', '-ms- '];

function u(something) {
    return typeof(something) === 'undefined';
}

function createElement(what = 'div') {
    return document.createElement(what);
}

// @ts-ignore JS Tests
export const audioContext = !u(window.AudioContext) || !u(window.webkitAudioContext) || !u(window.mozAudioContext) || !u(window.oAudioContext) || !u(window.msAudioContext);
export const requestAnimationFrame = !u(window.requestAnimationFrame) || !u(window.webkitRequestAnimationFrame);
export const htmlAudioElement = !u(Audio);
export const inlineSvg = (function() {
    const el = createElement('div');
    el.innerHTML = '<svg/>';

    return 'http://www.w3.org/2000/svg' == (!u(SVGRect) && el.firstChild && el.firstChild.namespaceURI);
})();

export const isArray = !u(Array.isArray);
export const classList = 'classList' in document.body;
export const querySelector = 'querySelector' in document.body;
export const scrollIntoView = 'scrollIntoView' in document.body;
export const dataset = (function () {
    const el = createElement();
    el.setAttribute('data-a-b', 'c');

    return !!(el.dataset && el.dataset.aB === 'c');
})();

// @ts-ignore CSS Tests
export const flexbox = document.body.style.flexBasis === '' || document.body.style.webkitFlexBasis === '' || document.body.style.msFlexBasis === '' || document.body.style.mozFlexBasis === '';
export const pointerEvents = 'pointerEvents' in document.body.style;
export const userSelect = 'userSelect' in document.body.style;
export const gradients = !u(document.body.dataset);
export const customProperties = window.CSS && window.CSS.supports('color', 'var(--css-custom-property-test)');
export const filters = !u(document.body.style.filter) || !u(document.body.style.webkitFilter);
export const localStorage = (function() {
    const test = 'lens-feature-detection';
    try {
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);

        return true;
    } catch(e) { }

    return false;
})();

export const calc = (function() {
    const prop = 'width:';
    const value = 'calc(10px);';
    const el = createElement('a');

    el.style.cssText = prop + prefixes.join(value + prop);

    return !!el.style.length;
})();

export const tests = {
    requestAnimationFrame,
    audioContext,
    htmlAudioElement,
    inlineSvg,
    isArray,
    classList,
    querySelector,
    dataset,
    scrollIntoView,
    flexbox,
    pointerEvents,
    userSelect,
    gradients,
    customProperties,
    filters,
    calc,
    localStorage,
};

export function test(...string): string[] {
    const failed = [];
    for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i];
        if (tests.hasOwnProperty(arg)) {
            if (false === tests[arg]) {
                failed.push(arg);
            }
        } else {
            console.warn('There is no test named: ' + arg);
        }
    }

    return failed;
}
