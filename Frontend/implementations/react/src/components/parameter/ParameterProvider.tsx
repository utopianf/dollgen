import {
    ChangeEvent,
    ReactNode,
    createContext,
    useState,
    useContext
} from 'react';

import { saveAs } from '../../utils/FileSaver';
import { PixelStreamingContext } from '../pixelStreaming/PixelStreamingProvider';

export type ColorParameter = {
    tab: string;
    name: string;
    group: string;
    label: string;
    type: 'color';
    rValue?: number;
    gValue?: number;
    bValue?: number;
    defaultRValue?: number;
    defaultGValue?: number;
    defaultBValue?: number;
    disabled?: boolean;
};

export type SliderParameter = {
    tab: string;
    name: string;
    group: string;
    label: string;
    type: 'slider';
    min?: number;
    max?: number;
    value?: number;
    values?: number[];
    defaultValue?: number;
    disabled?: boolean;
};

export type SliderDoubleParameter = {
    tab: string;
    name: string;
    group: string;
    label: string;
    type: 'slider_double';
    mins?: number[];
    maxs?: number[];
    values?: number[];
    defaultValues?: number[];
    disabled?: boolean;
};

export type DropdownItem = {
    label: string;
    value: number | string;
    disabled?: boolean;
};

export type DropdownParameter = {
    tab: string;
    name: string;
    group: string;
    label: string;
    type: 'dropdown';
    value?: number | string;
    items: DropdownItem[];
    disabled?: boolean;
};

export type CheckboxParameter = {
    tab: string;
    name: string;
    group: string;
    label: string;
    type: 'checkbox';
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
};

export type CheckboxGroupParameter = {
    tab: string;
    names: string[];
    group: string;
    label: string;
    type: 'checkbox_group';
    items: {
        name: string;
        label: string;
        checked?: boolean;
        defaultChecked?: boolean;
        disabled?: boolean;
    }[];
};

export type CommonParameter = {
    tab: string;
    name: string;
    group: string;
    label: string;
    type: 'common';
    value?: number;
    defaultValue?: number;
    disabled?: boolean;
};

// 複数パラメータ(共通数値を持つ)に対応するスライダー
export type SliderParameterGroup = {
    tab: string;
    name: string;
    group: string;
    label: string;
    type: 'slider_group';
    value?: number;
    defaultValue?: number;
    disabled?: boolean;
};

export type Parameter =
    | ColorParameter
    | SliderParameter
    | CommonParameter
    | SliderDoubleParameter
    | DropdownParameter
    | CheckboxParameter
    | SliderParameterGroup;

export type Group = {
    tab: string;
    name: string;
    open: boolean;
};

export type UENumParameter = {
    name: string;
    type: 'int' | 'float';
    default: number[];
    min: number[];
    max: number[];
};

export type UEColorParameter = {
    name: string;
    type: 'color';
    default: number[];
};

export type UEParameter = UENumParameter | UEColorParameter;

interface ParameterContextProps {
    parameters: Parameter[];
    groups: Group[];
    updateSliderParameterValue: (parameterName: string, value: number) => void;
    updateSliderDoubleParameterValue: (
        parameterName: string,
        values: number[]
    ) => void;
    updateCommonParameterValue: (parameterName: string, value: number) => void;
    updateColorParameterValue: (
        parameterName: string,
        rValue: number,
        gValue: number,
        bValue: number
    ) => void;
    updateCheckboxParameterValue: (
        parameterName: string,
        checked: boolean
    ) => void;
    updateDropdownParameterValue: (
        parameterName: string,
        value: number | string
    ) => void;
    updateGroupOpen: (groupName: string, open: boolean) => void;

    init: (ueparameters: UEParameter[]) => void;
    reset: (parameterName?: string) => void;
    load: (event: ChangeEvent) => void;
    save: () => void;
}

const ParameterContext = createContext<ParameterContextProps>({
    parameters: [],
    groups: [],
    updateSliderParameterValue: () => {},
    updateSliderDoubleParameterValue: () => {},
    updateCommonParameterValue: () => {},
    updateColorParameterValue: () => {},
    updateCheckboxParameterValue: () => {},
    updateDropdownParameterValue: () => {},
    updateGroupOpen: () => {},

    init: () => {},
    reset: () => {},
    load: () => {},
    save: () => {}
});

export const ParameterProvider = ({ children }: { children: ReactNode }) => {
    const { pixelStreaming } = useContext(PixelStreamingContext);
    const [groups, setGroups] = useState<Group[]>([
        {
            tab: 'head',
            name: 'all',
            open: true
        },
        {
            tab: 'head',
            name: 'outline',
            open: true
        },
        {
            tab: 'head',
            name: 'eye',
            open: true
        },
        {
            tab: 'head',
            name: 'ear',
            open: true
        },
        {
            tab: 'head',
            name: 'mouth',
            open: true
        },
        {
            tab: 'head',
            name: 'teeth',
            open: true
        },
        {
            tab: 'head',
            name: 'tongue',
            open: true
        },
        {
            tab: 'head',
            name: 'tsuno',
            open: true
        }
    ]); // ["head", "eye", "mouth", "ear", "cheek", "chin"
    const [parameters, setParameters] = useState<Parameter[]>([
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_skincolorselection',
            type: 'dropdown',
            label: '肌-色選択',
            items: [
                {
                    label: 'ミルク',
                    value: 1
                },
                {
                    label: 'プリン',
                    value: 2
                },
                {
                    label: 'ココア',
                    value: 3
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_eyeshadow_colorselection',
            type: 'dropdown',
            label: 'アイシャドウ-色選択',
            items: [
                {
                    label: 'ピンク',
                    value: 1
                },
                {
                    label: 'パープル',
                    value: 2
                },
                {
                    label: 'オレンジ',
                    value: 3
                },
                {
                    label: 'ブルー',
                    value: 4
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_eyeshadow_opacity',
            label: 'アイシャドウ-不透明度',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_eyeshadow_scaleXY',
            label: 'アイシャドウ-大きさ',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_eyeshadow_offset',
            label: 'アイシャドウ-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_cheekbase_colorselection',
            type: 'dropdown',
            label: 'ソフトチーク-色選択',
            items: [
                {
                    label: 'ピンク',
                    value: 1
                },
                {
                    label: 'パープル',
                    value: 2
                },
                {
                    label: 'オレンジ',
                    value: 3
                },
                {
                    label: 'ブルー',
                    value: 4
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_cheekbase_opacity',
            label: 'ソフトチーク-不透明度',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_cheekbase_scaleXY',
            label: 'ソフトチーク-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'ベース',
            name: 'base_cheekbase_offset',
            label: 'ソフトチーク-位置',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'ベース-カラー1',
            label: 'eyerush_basecolor1',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_basecolor2',
            label: 'ベース-カラー2',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_basecolor2intensity',
            label: 'ベース-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_patterncolor1',
            label: 'パターン-カラー1',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_patterncolor2',
            label: 'パターン-カラー2',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_patterncolor2intensity',
            label: 'パターン-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_outerlinecolor1',
            label: 'シェイプライン-カラー1',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_outerlinecolor2',
            label: 'シェイプライン-カラー2',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_outerlinecolor2intensity',
            label: '輪郭線-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'uppereyerush_overall',
            type: 'dropdown',
            label: '上-形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '形状1',
                    value: 2
                },
                {
                    label: '形状2',
                    value: 3
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'lowereyerush_overall',
            type: 'dropdown',
            label: '下アイライン形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '形状1',
                    value: 2
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'closeeyerush_overall',
            type: 'dropdown',
            label: '閉-形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '形状1',
                    value: 2
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyelid_overall',
            type: 'dropdown',
            label: 'まぶた-形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '形状1',
                    value: 2
                },
                {
                    label: '形状2',
                    value: 3
                },
                {
                    label: '形状3',
                    value: 4
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_R_taremeintensity',
            label: '右-たれ目強さ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_L_taremeintensity',
            label: '左-たれ目強さ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_R_tsurimeintensity',
            label: '右-つり目強さ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_L_tsurimeintensity',
            label: '左-つり目強さ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_R_arcintensity',
            label: '右-円弧強さ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_L_arcintensity',
            label: '左-円弧強さ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_R_scale',
            label: '右-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_R_offset',
            label: '右-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_L_scale',
            label: '左-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_L_offset',
            label: '左-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_R_lowerscale',
            label: '右下-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_R_loweroffset',
            label: '右下-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_L_lowerscale',
            label: '左下-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'アイライン',
            name: 'eyerush_L_loweroffset',
            label: '左下-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: 'チーク',
            name: 'cheek_color',
            label: 'ライン-カラー',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: 'チーク',
            name: 'cheek_overall',
            type: 'dropdown',
            label: 'ライン-形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '形状1',
                    value: 2
                },
                {
                    label: '形状2',
                    value: 3
                },
                {
                    label: '形状3',
                    value: 4
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'チーク',
            name: 'cheek_scale',
            label: 'ライン-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'チーク',
            name: 'cheek_offset',
            label: 'ライン-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: 'チーク',
            name: 'cheek_highlight_overall',
            type: 'dropdown',
            label: 'ハイライト-形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '三角形',
                    value: 2
                },
                {
                    label: '四角形',
                    value: 3
                },
                {
                    label: '六角形',
                    value: 4
                },
                {
                    label: '円',
                    value: 5
                },
                {
                    label: '星',
                    value: 6
                },
                {
                    label: '十字',
                    value: 7
                },
                {
                    label: 'クローバー',
                    value: 8
                },
                {
                    label: 'ダイヤ',
                    value: 9
                },
                {
                    label: 'ハート',
                    value: 10
                },
                {
                    label: 'スペード',
                    value: 11
                }
            ]
        },
        {
            tab: 'makeover',
            group: 'チーク',
            name: 'cheek_highlight_scale',
            label: 'ハイライト-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: 'チーク',
            name: 'cheek_highlight_offset',
            label: 'ハイライト-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_basecolor1',
            label: 'ベース-カラー1',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_basecolor2',
            label: 'ベース-カラー2',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_basecolor2intensity',
            label: 'ベース-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_outerlinecolor1',
            label: 'シェイプライン-カラー1',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_outerlinecolor2',
            label: 'シェイプライン-カラー2',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_outerlinecolor2intensity',
            label: 'シェイプライン-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_overall',
            type: 'dropdown',
            label: '形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '細1',
                    value: 2
                },
                {
                    label: '中1',
                    value: 3
                },
                {
                    label: '中2',
                    value: 4
                },
                {
                    label: '太1',
                    value: 5
                },
                {
                    label: '太2',
                    value: 6
                }
            ]
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_R_arcintensity',
            label: '右-曲率',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_L_arcintensity',
            label: '左-曲率',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_R_summitoffset',
            label: '右-頂点位置',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_L_summitoffset',
            label: '左-頂点位置',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_R_rotation',
            label: '右-回転',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_R_scale',
            label: '右-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_R_offset',
            label: '右-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_L_rotation',
            label: '左-回転',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_L_scale',
            label: '左-大きさ',
            type: 'slider'
        },
        {
            tab: 'makeover',
            group: '眉毛',
            name: 'eyebrow_L_offset',
            label: '左-位置',
            type: 'slider_double'
        },
        {
            tab: 'makeover',
            group: '口-2D',
            name: 'closemouse_innercolor',
            label: 'ベース-カラー',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: '口-2D',
            name: 'closemouse_outerlinecolor',
            label: '輪郭線-カラー',
            type: 'color'
        },
        {
            tab: 'makeover',
            group: '口-2D',
            name: 'closemouse_overall',
            type: 'dropdown',
            label: '形状',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '閉1',
                    value: 2
                },
                {
                    label: '閉2',
                    value: 3
                },
                {
                    label: '開1',
                    value: 4
                },
                {
                    label: '開2',
                    value: 5
                },
                {
                    label: '開3',
                    value: 6
                }
            ]
        },
        {
            tab: 'makeover',
            group: '口-2D',
            name: 'closemouse_arcintensity',
            label: '曲率',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'overall_sizeXY',
            label: '大きさ',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'overall_flattenXY',
            label: '平坦化',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'base_gradationon',
            label: 'グラデにする？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'base_gradationpattern',
            label: 'グラデの種類',
            type: 'dropdown',
            items: [
                {
                    label: '片側',
                    value: 1
                },
                {
                    label: '両側',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                }
            ]
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'base_blend',
            label: 'グラデーションブレンド',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'base_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'base_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'カラー1',
            label: 'base_color1',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: 'ベース',
            name: 'カラー2',
            label: 'base_color2',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: 'shadow_colorA_gradationon',
            label: '影色A-グラデにする？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: 'shadow_colorA_gradationpattern',
            label: '影色A-グラデの種類',
            type: 'dropdown',
            items: [
                {
                    label: '片側',
                    value: 1
                },
                {
                    label: '両側',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: 'shadow_colorA_blend',
            label: '影色A-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: '影色A-カラー1',
            label: 'shadow_colorA_color1',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: '影色A-カラー2',
            label: 'shadow_colorA_color2',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: 'shadow_colorB_gradationon',
            label: '影色B-グラデにする？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: 'shadow_colorB_gradationpattern',
            label: '影色B-グラデの種類',
            type: 'dropdown',
            items: [
                {
                    label: '片側',
                    value: 1
                },
                {
                    label: '両側',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: 'shadow_colorB_blend',
            label: '影色B-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: '影色B-カラー1',
            label: 'shadow_colorB_color1',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '影-色',
            name: '影色B-カラー2',
            label: 'shadow_colorB_color2',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '影-外縁',
            name: 'shadow_outerlim1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '影色A',
                    value: 1
                },
                {
                    label: '影色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-外縁',
            name: 'shadow_outerlim1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-外縁',
            name: 'shadow_outerlim1_width',
            label: '太さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-外縁',
            name: 'shadow_outerlim1_offsetY',
            label: '太さバランス',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-外縁',
            name: 'shadow_outerlim1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-外縁',
            name: 'shadow_outerlim1_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-外縁',
            name: 'shadow_outerlim1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },

        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '影色A',
                    value: 1
                },
                {
                    label: '影色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_radius',
            label: '半径',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_length',
            label: '長さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_width',
            label: '太さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_widthbalance',
            label: '太さバランス',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_duplicatenumber',
            label: '複製数',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_duplicaterate',
            label: '影円弧-複製毎のサイズ比',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_rotation',
            label: '回転',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-円弧',
            name: 'shadow_arc1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '影色A',
                    value: 1
                },
                {
                    label: '影色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_scale',
            label: '大きさ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_quantizeswitch',
            label: 'ぼかしを階調化する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_quantizesteps',
            label: '階調数',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-円盤',
            name: 'shadow_disc1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '影色A',
                    value: 1
                },
                {
                    label: '影色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_roundness',
            label: '曲率',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_invertroundness',
            label: '曲率を反転する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_invertY',
            label: '全体を上下反転する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_offsetY',
            label: '上下位置',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_quantizeswitch',
            label: 'ぼかしを階調化する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_quantizesteps',
            label: '階調数',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-大円',
            name: 'shadow_largeround1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },

        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '影色A',
                    value: 1
                },
                {
                    label: '影色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_shapeselection',
            label: '影自由-形状選択',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '四角形',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                },
                {
                    label: 'ひし形',
                    value: 4
                },
                {
                    label: '星',
                    value: 5
                },
                {
                    label: '葉',
                    value: 6
                },
                {
                    label: 'キラリ',
                    value: 7
                },
                {
                    label: 'ハート',
                    value: 8
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_scaleXY',
            label: '大きさ',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_offsetXY',
            label: '位置',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_rotation',
            label: '回転',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_outlineswitch',
            label: '輪郭線表示にする？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_outlinewidth',
            label: '輪郭線太さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_outlineoffsetXY',
            label: '輪郭線バランス',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_effectpattern',
            label: '影自由-エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '影-自由',
            name: 'shadow_freeshape1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: 'glow_colorA_gradationon',
            label: '光色A-グラデにする？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: 'glow_colorA_gradationpattern',
            label: '光色A-グラデの種類',
            type: 'dropdown',
            items: [
                {
                    label: '片側',
                    value: 1
                },
                {
                    label: '両側',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: 'glow_colorA_blend',
            label: '光色A-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: '光色A-カラー1',
            label: 'glow_colorA_color1',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: '光色A-カラー2',
            label: 'glow_colorA_color2',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: 'glow_colorB_gradationon',
            label: '光色B-グラデにする？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: 'glow_colorA_gradationpattern',
            label: '光色B-グラデの種類',
            type: 'dropdown',
            items: [
                {
                    label: '片側',
                    value: 1
                },
                {
                    label: '両側',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: 'glow_colorB_blend',
            label: '光色B-グラデブレンド',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: '光色B-カラー1',
            label: 'glow_colorB_color1',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '光-色',
            name: '光色B-カラー2',
            label: 'glow_colorB_color2',
            type: 'color'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '光色A',
                    value: 1
                },
                {
                    label: '光色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_radius',
            label: '半径',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_length',
            label: '長さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_width',
            label: '太さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_widthbalance',
            label: '太さバランス',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_duplicatenumber',
            label: '複製数',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_duplicaterate',
            label: '複製毎のサイズ比',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_rotation',
            label: '回転',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_effectpattern',
            label: '光円弧-エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-円弧',
            name: 'glow_arc1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '光色A',
                    value: 1
                },
                {
                    label: '光色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_shapeselection',
            label: '形状選択',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '四角形',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                },
                {
                    label: 'ひし形',
                    value: 4
                },
                {
                    label: '星',
                    value: 5
                },
                {
                    label: '葉',
                    value: 6
                },
                {
                    label: 'キラリ',
                    value: 7
                },
                {
                    label: 'ハート',
                    value: 8
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_radius',
            label: '半径',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_radius',
            label: '半径',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_distributionlength',
            label: '配列範囲',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_shapeamount',
            label: '配列数',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_shapescaleXY',
            label: '形状大きさ',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_shapepositionrandomXY',
            label: '位置ランダム',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_shaperotationrandom',
            label: '回転ランダム',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_randomseed',
            label: 'ランダムシード',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_rotation',
            label: '回転',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-円環配列',
            name: 'glow_circular1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '光色A',
                    value: 1
                },
                {
                    label: '光色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_roundness',
            label: '曲率',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_invertroundness',
            label: '曲率を反転する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_invertY',
            label: '全体を上下反転する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_offsetY',
            label: '上下位置',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_quantizeswitch',
            label: 'ぼかしを階調化する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_quantizesteps',
            label: '階調数',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largeround1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '光色A',
                    value: 1
                },
                {
                    label: '光色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_roundness',
            label: '曲率',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_invertroundness',
            label: '曲率を反転する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largearc1_invertY',
            label: '全体を上下反転する？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_offsetY',
            label: '上下位置',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_width',
            label: '上下位置',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円',
            name: 'glow_largearc1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-大円弧',
            name: 'glow_largearc1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_colorselection',
            label: '色選択',
            type: 'dropdown',
            items: [
                {
                    label: '光色A',
                    value: 1
                },
                {
                    label: '光色B',
                    value: 2
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_opacity',
            label: '不透明度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_shapeselection',
            label: '形状選択',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '四角形',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                },
                {
                    label: 'ひし形',
                    value: 4
                },
                {
                    label: '星',
                    value: 5
                },
                {
                    label: '葉',
                    value: 6
                },
                {
                    label: 'キラリ',
                    value: 7
                },
                {
                    label: 'ハート',
                    value: 8
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_scaleXY',
            label: '大きさ',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_offsetXY',
            label: '位置',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_rotation',
            label: '回転',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_outlineswitch',
            label: '輪郭線表示にする？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_outlinewidth',
            label: '輪郭線太さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_outlineoffsetXY',
            label: '輪郭線バランス',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_effectpattern',
            label: 'エフェクト種類',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '集中1',
                    value: 2
                },
                {
                    label: '集中2',
                    value: 3
                },
                {
                    label: '異方性1-X軸',
                    value: 4
                },
                {
                    label: '異方性1-Y軸',
                    value: 5
                },
                {
                    label: '異方性2-X軸',
                    value: 6
                },
                {
                    label: '異方性2-Y軸',
                    value: 7
                },
                {
                    label: '異方性3-X軸',
                    value: 8
                },
                {
                    label: '異方性3-Y軸',
                    value: 9
                },
                {
                    label: '斑点1',
                    value: 10
                },
                {
                    label: '斑点2',
                    value: 11
                },
                {
                    label: '斑点3',
                    value: 12
                },
                {
                    label: '霧1',
                    value: 13
                },
                {
                    label: '霧2',
                    value: 14
                },
                {
                    label: '波1',
                    value: 15
                },
                {
                    label: '波2',
                    value: 16
                },
                {
                    label: 'ノイズ1',
                    value: 17
                },
                {
                    label: 'ノイズ2',
                    value: 18
                }
            ]
        },
        {
            tab: 'eyes',
            group: '光-自由',
            name: 'glow_freeshape1_effectintensity',
            label: 'エフェクト強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_shapeselection',
            label: '形状選択',
            type: 'dropdown',
            items: [
                {
                    label: '無し',
                    value: 1
                },
                {
                    label: '四角形',
                    value: 2
                },
                {
                    label: '円',
                    value: 3
                },
                {
                    label: 'ひし形',
                    value: 4
                },
                {
                    label: '星',
                    value: 5
                },
                {
                    label: '葉',
                    value: 6
                },
                {
                    label: 'キラリ',
                    value: 7
                },
                {
                    label: 'ハート',
                    value: 8
                }
            ]
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_shapescaleXY',
            label: '形状大きさ',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_shaperotation',
            label: '形状回転',
            type: 'slider'
        },

        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_ghostswitch',
            label: 'ゴーストはあり？',
            type: 'checkbox'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_ghostscale',
            label: 'ゴースト大きさ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_ghostdistance',
            label: 'ゴースト距離',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_ghostangle',
            label: 'ゴースト角度',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_scale',
            label: '大きさ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_offsetXY',
            label: '位置',
            type: 'slider_double'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_warpintensity',
            label: '曲面歪み強さ',
            type: 'slider'
        },
        {
            tab: 'eyes',
            group: 'ハイライト',
            name: 'highlight_blurintensity',
            label: 'ぼかし強さ',
            type: 'slider'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'systemparam',
            label: 'ベースヘッド',
            type: 'dropdown',
            items: [
                {
                    label: 'DG9-01',
                    value: 1
                }
            ]
        },
        // {
        //   "tab": "head",
        //   "group": "ベース",
        //   "label": "目は開ける？",
        //   "type": "checkbox_group",
        //   "items":
        //     [{
        //       "label": "右目",
        //       "name": "EyeRight.Open",
        //     }, {
        //       "label": "左目",
        //       "name": "EyeLeft.Open"
        //     }]
        // },
        {
            tab: 'all',
            group: 'all',
            name: 'EyeRight.Open',
            label: '目は開ける？',
            type: 'checkbox'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'EyeLeft.Open',
            label: '目は開ける？',
            type: 'checkbox'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'Ear.Visible',
            label: '耳はあり？',
            type: 'checkbox'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'Mouse.Open',
            label: '開口する？',
            type: 'checkbox'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'TeethUpperMain.Visible',
            label: '上歯はあり？',
            type: 'checkbox'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'TeethLowerMain.Visible',
            label: '下歯はあり？',
            type: 'checkbox'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'Tongue.Visible',
            label: '舌はあり？',
            type: 'checkbox'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'Tsuno.Visible',
            label: '角はあり？',
            type: 'checkbox'
        },
        {
            tab: 'head',
            group: '輪郭',
            name: 'cheek_maru',
            label: '頬のふくらみ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '輪郭',
            name: 'chin_kado',
            label: '顎の尖り',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '輪郭',
            name: 'nose_height',
            label: '鼻の高さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '輪郭',
            name: 'nose_width',
            label: '鼻の幅',
            type: 'slider'
        },
        {
            tab: 'head',
            group: 'アイホール',
            name: 'eye_X',
            label: '左右の大きさ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: 'アイホール',
            name: 'eye_Y',
            label: '上下の大きさ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: 'アイホール',
            name: 'eye_tareme',
            label: '垂れ目の強さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: 'アイホール',
            name: 'eye_tsurime',
            label: '吊り目の強さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: 'アイホール',
            name: 'eye_upperflat',
            label: '上まぶたの平坦さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: 'アイホール',
            name: 'eye_lowerflat',
            label: '下まぶたの平坦さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '耳',
            name: 'ear_elf',
            label: 'エルフ耳',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '耳',
            name: 'ear_elf_down',
            label: 'エルフ耳下がり',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '耳',
            name: 'ear_demon',
            label: 'デーモン耳',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '口',
            name: 'mouse_open',
            label: '全体の大きさ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '口',
            name: 'mouse_yoko',
            label: '左右の大きさ(調整)',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '口',
            name: 'mouse_tate',
            label: '上下の大きさ(調整)',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '口',
            name: 'mouse_neco',
            label: '猫口',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '口',
            name: 'mouse_upperflat',
            label: '上側の平坦さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '口',
            name: 'mouse_lowerflat',
            label: '下側の平坦さ',
            type: 'slider'
        },
        // {
        //   "tab": "head",
        //   "group": "歯",
        //   "names": ["teeth_upper_main_close", "teeth_upper_base_close"],
        //   "label": "上側の開口調整",
        //   "type": "slider_group",
        // },
        // {
        //   "tab": "head",
        //   "group": "歯",
        //   "names": ["teeth_upper_main_height", "teeth_upper_base_height"],
        //   "label": "上側の高さ",
        //   "type": "slider_group",
        // },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_upper_main_yaeba_R_height',
            label: '上右側の犬歯高さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_upper_main_yaeba_L_height',
            label: '上左側の犬歯高さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_upper_main_yaeba_position',
            label: '上側の犬歯位置',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_upper_main_yaeba_width',
            label: '上側の犬歯太さ',
            type: 'slider'
        },
        // {
        //   "tab": "head",
        //   "group": "歯",
        //   "names": ["teeth_lower_main_close", "teeth_lower_base_close"],
        //   "label": "下側の開口調整",
        //   "type": "slider_group",
        // },
        // {
        //   "tab": "head",
        //   "group": "歯",
        //   "names": ["teeth_lower_main_height", "teeth_lower_base_height"],
        //   "label": "下側の高さ",
        //   "type": "slider_group",
        // },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_lower_main_yaeba_R_height',
            label: '下右側の犬歯高さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_lower_main_yaeba_L_height',
            label: '下左側の犬歯高さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_lower_main_yaeba_position',
            label: '下側の犬歯位置',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '歯',
            name: 'teeth_lower_main_yaeba_width',
            label: '下側の犬歯太さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '舌',
            name: 'tongue_up',
            label: '高さ',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '舌',
            name: 'tongue_front',
            label: '突き出し',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '舌',
            name: 'tongue_rollpositive',
            label: '上に巻く',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '舌',
            name: 'tongue_rollnegative',
            label: '下に巻く',
            type: 'slider'
        },
        {
            tab: 'head',
            group: '舌',
            name: 'tongue_sharp',
            label: '先端の細さ',
            type: 'slider'
        },
        {
            tab: 'all',
            group: 'all',
            name: 'Tsuno.Type',
            label: '種類',
            type: 'dropdown',
            items: [
                {
                    label: '1本/額中心',
                    value: 1
                },
                {
                    label: '2本/額両側',
                    value: 2
                }
            ],
            value: 1
        },
        // {
        //   "tab": "head",
        //   "group": "角",
        //   "names": ["tsuno_c_length", "tsuno_s_length"],
        //   "label": "長さ",
        //   "type": "slider_group",
        // },
        // {
        //   "tab": "head",
        //   "group": "角",
        //   "names": ["tsuno_c_thickness", "tsuno_s_thickness"],
        //   "label": "太さ",
        //   "type": "slider_group",
        // },
        // {
        //   "tab": "head",
        //   "group": "角",
        //   "names": ["tsuno_c_balanceA", "tsuno_s_balanceB"],
        //   "label": "丸み",
        //   "type": "slider_group",
        // },
        // {
        //   "tab": "head",
        //   "group": "角",
        //   "names": ["tsuno_c_bending", "tsuno_s_bending"],
        //   "label": "曲率",
        //   "type": "slider_group",
        // },
        {
            tab: 'all',
            group: 'all',
            type: 'dropdown',
            name: 'camera',
            label: '',
            items: [
                {
                    label: '頭',
                    value: 'head'
                }
            ],
            disabled: true,
            value: 'head'
        },
        {
            tab: 'all',
            group: 'all',
            type: 'checkbox',
            name: 'grid',
            label: '',
            checked: false
        },
        {
            tab: 'all',
            group: 'all',
            type: 'checkbox',
            name: 'makeup',
            label: '',
            checked: false
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_c_length',
            label: ''
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_s_length',
            label: ''
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_c_thickness',
            label: ''
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_s_thickness',
            label: ''
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_c_balanceA',
            label: ''
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_s_balanceA',
            label: ''
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_c_bending',
            label: ''
        },
        {
            tab: 'all',
            group: 'all',
            type: 'slider',
            name: 'tsuno_s_bending',
            label: ''
        }
    ]);

    const updateSliderParameterValue = (
        parameterName: string,
        value: number
    ) => {
        setParameters((prevParameters) =>
            prevParameters.map((param) => {
                if (!('name' in param) || param.name !== parameterName) {
                    return param;
                }
                if (param.type === 'slider') {
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: parameterName,
                            value: value
                        });
                    }
                    return { ...param, value: value };
                }
                return param;
            })
        );
    };

    const updateSliderDoubleParameterValue = (
        parameterName: string,
        values: number[]
    ) => {
        setParameters((prevParameters) =>
            prevParameters.map((param) => {
                if (!('name' in param) || param.name !== parameterName)
                    return param;
                if (param.type === 'slider_double') {
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: parameterName,
                            value: values.join(',')
                        });
                    }
                    return { ...param, values: values };
                }
                return param;
            })
        );
    };

    const updateCommonParameterValue = (
        parameterName: string,
        value: number
    ) => {
        setParameters((prevParameters) =>
            prevParameters.map((param) => {
                if (!('name' in param) || param.name !== parameterName)
                    return param;
                if (param.type === 'common') {
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: parameterName,
                            defaultValue: value,
                            value: value
                        });
                    }
                    return { ...param, value: value };
                }
                return param;
            })
        );
    };

    const updateColorParameterValue = (
        parameterName: string,
        rValue: number,
        gValue: number,
        bValue: number
    ) => {
        setParameters((prevParameters) =>
            prevParameters.map((param) => {
                if (!('name' in param) || param.name !== parameterName)
                    return param;
                if (param.type === 'color') {
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: parameterName,
                            value: [rValue, gValue, bValue].join(',')
                        });
                    }
                    return { ...param, rValue, gValue, bValue };
                }
                return param;
            })
        );
    };

    const updateCheckboxParameterValue = (
        parameterName: string,
        checked: boolean
    ) => {
        setParameters((prevParameters) =>
            prevParameters.map((param) => {
                if (!('name' in param) || param.name !== parameterName)
                    return param;
                if (param.type === 'checkbox') {
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: parameterName,
                            defaultValue: checked,
                            value: checked
                        });
                    }
                    return { ...param, checked };
                }
                return param;
            })
        );
    };

    const updateDropdownParameterValue = (
        parameterName: string,
        value: number | string
    ) => {
        setParameters((prevParameters) =>
            prevParameters.map((param) => {
                if (!('name' in param) || param.name !== parameterName)
                    return param;
                if (param.type === 'dropdown') {
                    if (pixelStreaming) {
                        pixelStreaming.emitUIInteraction({
                            parameter: parameterName,
                            value: value
                        });
                    }
                    return { ...param, value };
                }
                return param;
            })
        );
    };

    const updateGroupOpen = (groupName: string, open: boolean) => {
        setGroups((prevGroups) =>
            prevGroups.map((group) => {
                if (group.name !== groupName) return group;
                return { ...group, open };
            })
        );
    };

    const init = (ueparameters: UEParameter[]) => {
        ueparameters.forEach((up) => {
            const ps = parameters.filter(
                (p) => 'name' in p && p.name === up.name
            );
            if (ps.length == 1) {
                const p = ps[0];
                if (p.type === 'slider') {
                    setParameters((prevParameters) =>
                        prevParameters.map((_p) => {
                            if (!('name' in _p) || up.name !== _p.name)
                                return _p;
                            // Sliderであればかならずdefault, min, maxがある
                            // ない場合はエラー
                            if (
                                !up.default ||
                                !('min' in up) ||
                                !('max' in up)
                            ) {
                                console.error('parameter error: ', up.name);
                                return _p;
                            }
                            return {
                                ..._p,
                                defaultValue: up.default[0],
                                value: up.default[0],
                                min: up.min[0],
                                max: up.max[0]
                            };
                        })
                    );
                } else if (p.type === 'slider_double') {
                    setParameters((prevParameters) =>
                        prevParameters.map((_p) => {
                            if (!('name' in _p) || up.name !== _p.name)
                                return _p;
                            // Sliderであればかならずdefault, min, maxがある
                            // ない場合はエラー
                            if (
                                !up.default ||
                                !('min' in up) ||
                                !('max' in up)
                            ) {
                                console.error('parameter error: ', up.name);
                                return _p;
                            }

                            return {
                                ..._p,
                                defaultValues: up.default,
                                values: up.default,
                                mins: up.min,
                                maxs: up.max
                            };
                        })
                    );
                } else if (p.type === 'dropdown') {
                    setParameters((prevParameters) =>
                        prevParameters.map((_p) => {
                            if (!('name' in _p) || up.name !== _p.name)
                                return _p;
                            return {
                                ..._p,
                                defaultValue: up.default[0],
                                value: up.default[0]
                            };
                        })
                    );
                } else if (p.type === 'checkbox') {
                    setParameters((prevParameters) =>
                        prevParameters.map((_p) => {
                            if (!('name' in _p) || up.name !== _p.name)
                                return _p;
                            return {
                                ..._p,
                                defaultChecked: !!up.default[0],
                                checked: !!up.default[0]
                            };
                        })
                    );
                }
                // else if (p.type === "checkbox_group") {
                //   setParameters(prevParameters =>
                //     prevParameters.map(_p => {
                //       if (!("name" in _p) || up.name !== _p.name) return _p;
                //       return { ..._p, defaultValue: up.default[0], value: up.default[0] };
                //     })
                //   );
                // }
                else if (p.type === 'color') {
                    setParameters((prevParameters) =>
                        prevParameters.map((_p) => {
                            if (!('name' in _p) || up.name !== _p.name)
                                return _p;
                            return {
                                ..._p,
                                defaultRValue: up.default[0],
                                rValue: up.default[0],
                                defaultGValue: up.default[1],
                                gValue: up.default[1],
                                defaultBValue: up.default[2],
                                bValue: up.default[2]
                            };
                        })
                    );
                }
            }
        });
    };

    const reset = (parameterName?: string) => {
        if (parameterName) {
            setParameters((prevParameters) =>
                prevParameters.map((param) => {
                    if ('name' in param && param.name !== parameterName)
                        return param;
                    if (param.type === 'slider') {
                        return { ...param, value: param.defaultValue };
                    }
                    if (param.type === 'slider_double') {
                        return { ...param, values: param.defaultValues };
                    }
                    if (param.type === 'common') {
                        return { ...param, value: param.defaultValue };
                    }
                    if (param.type === 'color') {
                        return {
                            ...param,
                            rValue: param.defaultRValue,
                            gValue: param.defaultGValue,
                            bValue: param.defaultBValue
                        };
                    }
                    if (param.type === 'checkbox') {
                        return { ...param, checked: param.defaultChecked };
                    }
                    // if (param.type === "checkbox_group") {
                    //   return { ...param, value: param.defaultValue };
                    // }
                    return param;
                })
            );
        } else {
            setParameters((prevParameters) =>
                prevParameters.map((param) => {
                    if (param.type === 'slider') {
                        return { ...param, value: param.defaultValue };
                    }
                    if (param.type === 'slider_double') {
                        return { ...param, values: param.defaultValues };
                    }
                    if (param.type === 'common') {
                        return { ...param, value: param.defaultValue };
                    }
                    if (param.type === 'color') {
                        return {
                            ...param,
                            rValue: param.defaultRValue,
                            gValue: param.defaultGValue,
                            bValue: param.defaultBValue
                        };
                    }
                    return param;
                })
            );
        }
    };

    const load = (event: ChangeEvent) => {
        // load parameters from uploaded json file
        console.log('load');
        const reader = new FileReader();
        const { files } = event.target as HTMLInputElement;
        if (!files) return;

        reader.readAsText(files[0], 'UTF-8');
        reader.onload = (e) => {
            const contents = e.target?.result;
            if (typeof contents === 'string') {
                setParameters(JSON.parse(contents));
            }
        };
    };

    const save = () => {
        console.log(parameters);
        const data = new Blob([JSON.stringify(parameters)], {
            type: 'application/json'
        });
        saveAs(data, 'parameters.json');
    };

    return (
        <ParameterContext.Provider
            value={{
                parameters,
                groups,
                updateSliderParameterValue,
                updateSliderDoubleParameterValue,
                updateCommonParameterValue,
                updateColorParameterValue,
                updateCheckboxParameterValue,
                updateDropdownParameterValue,
                updateGroupOpen,
                init,
                reset,
                load,
                save
            }}
        >
            {children}
        </ParameterContext.Provider>
    );
};

export default ParameterContext;
