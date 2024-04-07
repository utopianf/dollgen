import { ChangeEvent, ReactNode, createContext, useState, useContext } from "react";

import { saveAs } from '../../utils/FileSaver';
import { PixelStreamingContext } from "../pixelStreaming/PixelStreamingProvider";


export type ColorParameter = {
  tab: string;
  name: string;
  group: string;
  label: string;
  type: "color";
  rValue: number;
  gValue: number;
  bValue: number;
  defaultRValue: number;
  defaultGValue: number;
  defaultBValue: number;
  disabled?: boolean;
};

export type SliderParameter = {
  tab: string;
  name: string;
  group: string;
  label: string;
  type: "slider";
  value?: number;
  values?: number[];
  defaultValue?: number;
  defaultValues?: number[];
  disabled?: boolean;
};

export type SliderDoubleParameter = {
  tab: string;
  name: string;
  group: string;
  label: string;
  type: "slider_double";
  values: number[];
  defaultValues: number[];
  disabled?: boolean;
};


export type DropdownItem = {
  name: string;
  label: string;
  value: number | string;
  disabled?: boolean;
};

export type DropdownParameter = {
  tab: string;
  name: string;
  group: string;
  label: string;
  type: "dropdown";
  value: number | string;
  items: DropdownItem[];
  disabled?: boolean;
};

export type CheckboxParameter = {
  tab: string;
  name: string;
  group: string;
  label: string;
  type: "checkbox";
  checked: boolean;
  disabled?: boolean;
};

export type CheckboxGroupParameter = {
  tab: string;
  name: string;
  group: string;
  label: string;
  type: "checkbox_group";
  items: {
    name: string
    label: string;
    checked: boolean;
    disabled?: boolean;
  }[];
};

export type CommonParameter = {
  tab: string;
  name: string;
  group: string;
  label: string;
  type: "common";
  value: number;
  defaultValue: number;
  disabled?: boolean;
};

export type Parameter = ColorParameter | SliderParameter | CommonParameter | SliderDoubleParameter | DropdownParameter | CheckboxGroupParameter | CheckBoxParameter;

export type Group = {
  tab: string;
  name: string;
  open: boolean;
}

export type UENumParameter = {
  name: string,
  type: "int" | "float",
  default: number[],
  min: number[],
  max: number[],
}

export type UEColorParameter = {
  name: string,
  type: "color",
  default: number[],
}

export type UEParameter = UENumParameter | UEColorParameter;

interface ParameterContextProps {
  parameters: Parameter[];
  groups: Group[];
  updateSliderParameterValue: (parameterName: string, value: number) => void;
  updateSliderDoubleParameterValue: (parameterName: string, values: number[]) => void;
  updateCommonParameterValue: (parameterName: string, value: number) => void;
  updateColorParameterValue: (parameterName: string, rValue: number, gValue: number, bValue: number) => void;
  updateCheckboxParameterValue: (parameterName: string, checked: boolean) => void;
  updateDropdownParameterValue: (parameterName: string, value: number | string) => void;
  updateGroupOpen: (groupName: string, open: boolean) => void;

  init: (ueparameters: UEParameter[]) => void;
  reset: (parameterName?: string) => void;
  load: (event: ChangeEvent) => void;
  save: () => void;
}

const ParameterContext = createContext<ParameterContextProps>({
  parameters: [],
  groups: [],
  updateSliderParameterValue: () => { },
  updateSliderDoubleParameterValue: () => { },
  updateCommonParameterValue: () => { },
  updateColorParameterValue: () => { },
  updateCheckboxParameterValue: () => { },
  updateDropdownParameterValue: () => { },
  updateGroupOpen: () => { },

  init: () => { },
  reset: () => { },
  load: () => { },
  save: () => { },
});

export const ParameterProvider = ({ children }: { children: ReactNode }) => {
  const { pixelStreaming } = useContext(PixelStreamingContext)
  const [groups, setGroups] = useState<Group[]>([
    {
      "tab": "head",
      "name": "all",
      "open": true
    },
    {
      "tab": "head",
      "name": "outline",
      "open": true
    },
    {
      "tab": "head",
      "name": "eye",
      "open": true
    },
    {
      "tab": "head",
      "name": "ear",
      "open": true
    },
    {
      "tab": "head",
      "name": "mouth",
      "open": true
    },
    {
      "tab": "head",
      "name": "teeth",
      "open": true
    },
    {
      "tab": "head",
      "name": "tongue",
      "open": true
    },
    {
      "tab": "head",
      "name": "tsuno",
      "open": true
    },
  ]); // ["head", "eye", "mouth", "ear", "cheek", "chin"
  const [parameters, setParameters] = useState<Parameter[]>([

    {
      "tab": "head",
      "group": "all",
      "name": "base_head",
      "label": "ベースヘッド",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "cheek",
      "name": "cheek_maru",
      "label": "cheek_maru",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "name": "chin_kado",
      "group": "chin",
      "label": "chin_kado",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "ear",
      "name": "ear_demon",
      "label": "ear_demon",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "ear",
      "name": "ear_elf",
      "label": "ear_elf",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "ear",
      "name": "ear_elf_down",
      "label": "ear_elf_down",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "ear",
      "name": "ear_flat",
      "label": "ear_flat",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "eye",
      "name": "eye_lowerflat",
      "label": "eye_lowerflat",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "eye",
      "name": "eye_tareme",
      "label": "eye_tareme",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "eyes",
      "group": "eye",
      "name": "eye_tsurime",
      "label": "eye_tsurime",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "eye",
      "name": "eye_upperflat",
      "label": "eye_upperflat",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "eye",
      "name": "eye_X",
      "label": "eye_X",
      "type": "slider",
      "value": 50,
      "defaultValue": 50,
    },
    {
      "tab": "head",
      "group": "eye",
      "name": "eye_Y",
      "label": "eye_Y",
      "type": "slider",
      "value": 50,
      "defaultValue": 50,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "mouse_lowerflat",
      "label": "mouth_lowerflat",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "mouse_neco",
      "label": "mouth_neco",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "mouse_open",
      "label": "mouth_open",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "mouse_tate",
      "label": "mouth_tate",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "mouse_upperflat",
      "label": "mouth_upperflat",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "mouse_yoko",
      "label": "mouth_yoko",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "nose_height",
      "label": "nose_height",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "head",
      "group": "mouth",
      "name": "nose_width",
      "label": "nose_width",
      "type": "slider",
      "value": 0,
      "defaultValue": 0,
    },
    {
      "tab": "makeover",
      "group": "アイライン",
      "name": "eyerush_R_taremeintensity",
      "label": "右-たれ目",
      "type": "slider",
      "value": 50,
      "defaultValue": 50,
    },
    {
      "tab": "makeover",
      "group": "アイライン",
      "name": "eyerush_L_taremeintensity",
      "label": "左-たれ目",
      "type": "slider",
      "value": 50,
      "defaultValue": 50,
    },
    {
      "tab": "makeover",
      "group": "アイライン",
      "name": "eyerush_R_tsurimeintensity",
      "label": "右-つり目",
      "type": "slider",
      "value": 50,
      "defaultValue": 50,
    },
    {
      "tab": "makeover",
      "group": "アイライン",
      "name": "eyerush_L_tsurimeintensity",
      "label": "左-つり目",
      "type": "slider",
      "value": 50,
      "defaultValue": 50,
    },
    {
      "tab": "makeover",
      "group": "アイライン",
      "name": "eyerush_R_scale",
      "label": "右上-サイズ",
      "type": "slider",
      "value": 50,
      "defaultValue": 50,
    },
    {
      "tab": "makeover",
      "group": "アイライン",
      "name": "eyerush_R_offset",
      "label": "右上-サイズ",
      "type": "slider_double",
      "values": [50, 50],
      "defaultValues": [50, 50]
    },
    {
      "tab": "makeover",
      "group": "eyerush",
      "name": "eyerush_shapecolor1",
      "label": "shapecolor1",
      "type": "color",
      "rValue": 0.22,
      "gValue": 0.1166,
      "bValue": 0.160028,
      "defaultRValue": 0.22,
      "defaultGValue": 0.1166,
      "defaultBValue": 0.160028,
    },
    {
      "tab": "makeover",
      "group": "eyerush",
      "name": "eyerush_shapecolor2",
      "label": "shapecolor2",
      "type": "color",
      "rValue": 0.51,
      "gValue": 0.3111,
      "bValue": 0.323034,
      "defaultRValue": 0.51,
      "defaultGValue": 0.3111,
      "defaultBValue": 0.323034,
    },
    {
      "tab": "makeover",
      "group": "eyerush",
      "name": "eyerush_shapecolor2opactiy",
      "label": "shapecolor2opacity",
      "type": "slider",
      "value": 100,
      "defaultValue": 100,
    },
    {
      "tab": "makeover",
      "group": "eyerush",
      "name": "eyerush_outlinecolor1",
      "label": "outlinecolor1",
      "type": "color",
      "rValue": 0.15,
      "gValue": 0.0795,
      "bValue": 0.10911,
      "defaultRValue": 0.15,
      "defaultGValue": 0.0795,
      "defaultBValue": 0.10911,
    },
    {
      "tab": "makeover",
      "group": "eyerush",
      "name": "eyerush_outlinecolor2",
      "label": "outlinecolor2",
      "type": "color",
      "rValue": 0.23,
      "gValue": 0.1403,
      "bValue": 0.145682,
      "defaultRValue": 0.23,
      "defaultGValue": 0.1403,
      "defaultBValue": 0.145682,
    },
  ]);

  const updateSliderParameterValue = (parameterName: string, value: number) => {
    setParameters(prevParameters =>
      prevParameters.map(param => {
        if (param.name !== parameterName) { return param };
        if (param.type === 'slider') {
          if (pixelStreaming) {
            pixelStreaming.emitUIInteraction({
              parameter: parameterName,
              value: value,
            })
          }
          return { ...param, value: value };
        }
        return param;
      })
    );
  };

  const updateSliderDoubleParameterValue = (parameterName: string, values: number[]) => {
    setParameters(prevParameters =>
      prevParameters.map(param => {
        if (param.name !== parameterName) return param;
        if (param.type === 'slider_double') {
          if (pixelStreaming) {
            pixelStreaming.emitUIInteraction({
              parameter: parameterName,
              value: values.join(',')
            })
          }
          return { ...param, values: values };
        }
        return param;
      })
    );
  };


  const updateCommonParameterValue = (parameterName: string, value: number) => {
    setParameters(prevParameters =>
      prevParameters.map(param => {
        if (param.name !== parameterName) return param;
        if (param.type === 'common') {
          if (pixelStreaming) {
            pixelStreaming.emitUIInteraction({
              parameter: parameterName,
              value: value,
            })
          }
          return { ...param, value: value };
        }
        return param;
      })
    );
  };


  const updateColorParameterValue = (parameterName: string, rValue: number, gValue: number, bValue: number) => {
    setParameters(prevParameters =>
      prevParameters.map(param => {
        if (param.name !== parameterName) return param;
        if (param.type === 'color') {
          if (pixelStreaming) {
            pixelStreaming.emitUIInteraction({
              parameter: parameterName,
              value: [rValue, gValue, bValue].join(',')
            })
          }
          return { ...param, rValue, gValue, bValue };
        }
        return param;
      })
    );
  };

  const updateCheckboxParameterValue = (parameterName: string, checked: boolean) => {
    setParameters(prevParameters =>
      prevParameters.map(param => {
        if (param.name !== parameterName) return param;
        if (param.type === 'checkbox') {
          if (pixelStreaming) {
            pixelStreaming.emitUIInteraction({
              parameter: parameterName,
              value: checked,
            })
          }
          return { ...param, checked };
        }
        return param;
      })
    );
  }

  const updateDropdownParameterValue = (parameterName: string, value: number | string) => {
    setParameters(prevParameters =>
      prevParameters.map(param => {
        if (param.name !== parameterName) return param;
        if (param.type === 'dropdown') {
          if (pixelStreaming) {
            pixelStreaming.emitUIInteraction({
              parameter: parameterName,
              value: value,
            })
          }
          return { ...param, value };
        }
        return param;
      })
    );
  }

  const updateGroupOpen = (groupName: string, open: boolean) => {
    setGroups(prevGroups =>
      prevGroups.map(group => {
        if (group.name !== groupName) return group;
        return { ...group, open };
      })
    );
  }

  const init = (ueparameters: UEParameter[]) => {
    const parameters: Parameter[] = [];
    const groups: Group[] = [];
    ueparameters.forEach(param => {
      if (param.type === 'int' || param.type === 'float') {
        parameters.push({
          tab: "ue",
          group: "all",
          name: param.name,
          label: param.name,
          type: "slider",
          value: param.default[0],
          defaultValue: param.default[0],
        });
      } else if (param.type === 'color') {
        parameters.push({
          tab: "ue",
          group: "all",
          name: param.name,
          label: param.name,
          type: "color",
          rValue: param.default[0],
          gValue: param.default[1],
          bValue: param.default[2],
          defaultRValue: param.default[0],
          defaultGValue: param.default[1],
          defaultBValue: param.default[2],
        });
      }
    });
    setParameters(parameters);
    setGroups(groups);
  }

  const reset = (parameterName?: string) => {
    if (parameterName) {
      setParameters(prevParameters =>
        prevParameters.map(param => {
          if (param.name !== parameterName) return param;
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
            return { ...param, rValue: param.defaultRValue, gValue: param.defaultGValue, bValue: param.defaultBValue };
          }
          return param;
        })
      );
    } else {
      setParameters(prevParameters =>
        prevParameters.map(param => {
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
            return { ...param, rValue: param.defaultRValue, gValue: param.defaultGValue, bValue: param.defaultBValue };
          }
          return param;
        })
      );
    }
  }

  const load = (event: ChangeEvent) => {
    // load parameters from uploaded json file
    console.log('load');
    const reader = new FileReader();
    const { files } = event.target as HTMLInputElement;
    if (!files) return;

    reader.readAsText(files[0], "UTF-8")
    reader.onload = e => {
      const contents = e.target?.result;
      if (typeof contents === 'string') {
        setParameters(JSON.parse(contents));
      }
    }
  }

  const save = () => {
    console.log(parameters);
    const data = new Blob([JSON.stringify(parameters)], { type: 'application/json' });
    saveAs(data, 'parameters.json')
  }

  return (
    <ParameterContext.Provider value={{
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
    }}>
      {children}
    </ParameterContext.Provider>
  );
};


export default ParameterContext;