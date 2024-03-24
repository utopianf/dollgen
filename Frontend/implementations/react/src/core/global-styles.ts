import { globalCss } from "@stitches/react";
import { normalizeCSS } from "./normalize";
import { url } from "inspector";
import { format } from "path";

export const globalStyles = globalCss({
    ...normalizeCSS,
    '#root,#root > div,#__next': {
        height: '100%'
    },
    '*,*::after,*::before': {
        boxSizing: 'border-box',
    },
    '@font-face': [{
        fontFamily: 'adobe clean',
        fontStyle: "normal",
        fontWeight: 700,
        fontDisplay: "optional",
        src: "url('fonts/AdobeClean-Regular.ttf') format('truetype')",
    }, {
        fontFamily: 'adobe clean',
        fontStyle: "normal",
        fontWeight: 400,
        fontDisplay: "optional",
        src: "url('fonts/AdobeClean-Light.ttf') format('truetype')",
    }, {
        fontFamily: 'adobe clean',
        fontStyle: "italic",
        fontWeight: 700,
        fontDisplay: "optional",
        src: "url('fonts/AdobeClean-It.ttf') format('truetype')",
    }],
    a: {
        ...normalizeCSS.a,
        color: 'inherit',
        textDecoration: 'inherit',
    },
    body: {
    ...normalizeCSS.body,
    color: '$slate12',
    fontFamily: '$default',
    fontSize: '$md',
    height: '100%',
    },
    button: {
    ...normalizeCSS.button,
    margin: 0,
    },
    'h1,h2,h3,h4': { margin: 0 },
    html: {
    ...normalizeCSS.html,
    height: '100%',
    },
    p: {
    ...normalizeCSS.p,
    padding: 0,
    },
})