const prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];

const bs = document.body.style;

function u(something) {
    return typeof(something) === 'undefined';
}

function createElement(what: string = 'div') {
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

export const localStorage = (function() {
    const test = 'lens-feature-detection';
    try {
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);

        return true;
    } catch(e) { }

    return false;
})();

// @ts-ignore CSS Tests
export const flexbox = !u(bs.flexBasis) || !u(bs.webkitFlexBasis) || !u(bs.msFlexBasis) || !u(bs.mozFlexBasis);
export const pointerEvents = !u(bs.pointerEvents);
export const userSelect = !u(bs.userSelect) || !u(bs.webkitUserSelect);
export const gradients = !u(document.body.dataset);
export const customProperties = window.CSS && window.CSS.supports('color', 'var(--css-custom-property-test)');
export const filters = !u(bs.filter) || !u(bs.webkitFilter);

export const calc = (function() {
    const prop = 'width:';
    const value = 'calc(10px);';
    const el = createElement('a');

    el.style.cssText = prop + prefixes.join(value + prop) + value;

    return !!el.style.length;
})();

export const tests = {
    audioContext,
    calc,
    classList,
    customProperties,
    dataset,
    filters,
    flexbox,
    gradients,
    htmlAudioElement,
    inlineSvg,
    isArray,
    localStorage,
    pointerEvents,
    querySelector,
    requestAnimationFrame,
    scrollIntoView,
    userSelect,
};

export default function test(...string): string[] {
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
