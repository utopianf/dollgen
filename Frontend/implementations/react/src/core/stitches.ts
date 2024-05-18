import { createStitches } from '@stitches/react';

import AdobeCleanBold from '../fonts/AdobeClean-Bold.otf';
import AdobeCleanRegular from '../fonts/AdobeClean-Regular.otf';
import AdobeCleanHanBold from '../fonts/AdobeCleanHan-Bold.otf';
import AdobeCleanHanRegular from '../fonts/AdobeCleanHan-Regular.otf';

export const { styled, globalCss } = createStitches({
    theme: {
        colors: {
            default: '#FFFFFF',
            basicblack: '#022222',
            darkgray: '#464646',
            lightgray: '#B1B1B1',
            superlightgray: '#D5D5D5',
            ultralightgray: '#FAFAFA',
            red: '#FF7C65',
            yellow: '#F8E750',
            green: '#BCE92A'
        },
        fonts: {
            adobeClean: 'Adobe Clean, Adobe Clean Han, sans-serif'
        },
        fontSizes: {
            lg: '18px',
            md: '16px',
            sm: '14px',
            ssm: '12px'
        },
        lineHeights: {
            lg: '22px',
            md: '16px',
            sm: '17px'
        }
    }
});

export const globalStyles = globalCss({
    '@font-face': [
        {
            fontFamily: 'Adobe Clean',
            src: `url(${AdobeCleanRegular}) format('opentype')`
        },
        {
            fontFamily: 'Adobe Clean',
            src: `url(${AdobeCleanBold}) format('opentype')`,
            fontWeight: 'bold'
        },
        {
            fontFamily: 'Adobe Clean Han',
            src: `url(${AdobeCleanHanRegular}) format('opentype')`
        },
        {
            fontFamily: 'Adobe Clean Han',
            src: `url(${AdobeCleanHanBold}) format('opentype')`,
            fontWeight: 'bold'
        }
    ],
    body: {
        fontFamily: 'Adobe Clean, Adobe Clean Han, sans-serif'
    }
});
