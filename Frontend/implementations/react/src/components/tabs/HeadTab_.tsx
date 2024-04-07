import { useState } from 'react'

import { Label } from '@radix-ui/react-label'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { styled } from '../../core/stitches'
import { BaseCheckbox } from '../checkbox/Checkbox'
import { BaseHeadSelect } from '../select/BaseHeadSelect'
import { Slider } from '../slider/Slider'
import { Tree } from '../tree/Tree'

export const HeadTab = () => {
  const [havingLeftEye, setHavingLeftEye] = useState(true)
  const [havingRightEye, setHavingRightEye] = useState(true)
  const [openEye, setOpenEye] = useState(true)

  const [havingEar, setHavingEar] = useState(true)
  const [openEar, setOpenEar] = useState(true)

  const [havingMouth, setHavingMouth] = useState(true)
  const [openMouth, setOpenMouth] = useState(true)

  const [havingUpperTeeth, setHavingUpperTeeth] = useState(true)
  const [havingLowerTeeth, setHavingLowerTeeth] = useState(true)
  const [openTeeth, setOpenTeeth] = useState(true)

  const [havingHorn, setHavingHorn] = useState(true)
  const [openHorn, setOpenHorn] = useState(true)
  return (
    <ScrollAreaRoot>
      <ScrollAreaViewport>
        <Flex>
          <Tree label="全体">
            <BaseHeadSelect />
            <>
              <CheckboxLabel htmlFor="head">目は開ける？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="右目" checked={havingRightEye} setChecked={setHavingRightEye} />
                <BaseCheckbox label="左目" checked={havingLeftEye} setChecked={setHavingLeftEye} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">耳はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" checked={havingEar} setChecked={setHavingEar} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">開口する？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" checked={havingMouth} setChecked={setHavingMouth} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">歯はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="上側" checked={havingUpperTeeth} setChecked={setHavingUpperTeeth} />
                <BaseCheckbox label="下側" checked={havingLowerTeeth} setChecked={setHavingLowerTeeth} />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">舌はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" />
              </FlexRow>
            </>
            <>
              <CheckboxLabel htmlFor="head">角はあり？</CheckboxLabel>
              <FlexRow>
                <BaseCheckbox label="はい" checked={havingHorn} setChecked={setHavingHorn} />
              </FlexRow>
            </>
          </Tree>
          <Tree label="輪郭">
            <Slider label="頬のふくらみ" name='cheek_maru' defaultValue={80} />
            <Slider label="顎の尖り" name='chin_kado' defaultValue={80} />
            <Slider label="鼻の高さ" name='nose_height' defaultValue={80} />
            <Slider label="鼻の幅" name='nose_width' defaultValue={80} />
          </Tree>
          <Tree label="アイホール" disabled={!(havingLeftEye || havingRightEye)} open={openEye && (havingLeftEye || havingRightEye)} setOpen={setOpenEye}>
            <Slider label="左右の大きさ" name='cheek_maru' defaultValue={80} />
            <Slider label="上下の大きさ" name='chin_kado' defaultValue={80} />
            <Slider label="垂れ目" name='nose_height' defaultValue={80} />
            <Slider label="吊り目" name='nose_width' defaultValue={80} />
            <Slider label="上まぶたの平坦さ" name='eye_upperflat' defaultValue={80} />
            <Slider label="下まぶたの平坦さ" name='eye_lowerflat' defaultValue={80} />
          </Tree>
          <Tree label="耳" disabled={!havingEar} open={openEar && havingEar} setOpen={setOpenEar}>
            <Slider label="エルフ" name='ear_elf' defaultValue={80} />
            <Slider label="エルフ耳下がり" name='ear_elf_down' defaultValue={80} />
            <Slider label="デーモン" name='ear_demon' defaultValue={80} />
          </Tree>
          <Tree label="口" disabled={!havingMouth} open={openMouth && havingMouth} setOpen={setOpenMouth}>
            <Slider label="全体の大きさ" name='mouth_open' defaultValue={80} />
            <Slider label="左右の大きさ（調整）" name='mouth_yoko' defaultValue={80} />
            <Slider label="上下の大きさ（調整）" name='mouth_tate' defaultValue={80} />
            <Slider label="猫口" name='mouth_neco' defaultValue={80} />
            <Slider label="上側の平坦さ" name='mouth_upperflat' defaultValue={80} />
            <Slider label="下側の平坦さ" name='mouth_lowerflat' defaultValue={80} />
          </Tree>
          <Tree label="歯" disabled={!(havingUpperTeeth || havingLowerTeeth)} open={openTeeth && (havingUpperTeeth || havingLowerTeeth)} setOpen={setOpenTeeth}>
            <Slider label="上歯の大きさ" name='mouth_upperflat' defaultValue={80} />
            <Slider label="下歯の大きさ" name='mouth_lowerflat' defaultValue={80} />
          </Tree>
          <Tree label="舌" disabled></Tree>
          <Tree label="角" disabled={!havingHorn} open={openHorn && havingHorn} setOpen={setOpenHorn}>
            <Slider label="長さ" name='tsuno_length' defaultValue={80} />
            <Slider label="太さ" name='tusno_thickness' defaultValue={80} />
            <Slider label="丸み" name='tusno_balance' defaultValue={80} />
            <Slider label="曲がり" name='tusno_bending' defaultValue={80} />
          </Tree>
        </Flex>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
}

const CheckboxLabel = styled(Label, {
  fontSize: 13,
  lineHeight: 1,
  fontWeight: 500,
  marginBottom: 5,
  display: 'block',
})

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const FlexRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 25
})

const ScrollAreaRoot = styled(ScrollArea.Root, {
  // width: 200,
  // height: '100%',
  overflow: 'hidden',
})

const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: 'calc(100vh - 285px)',
  borderRadius: 'inherit',
});

const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$basicblack' },
  '&[data-orientation="vertical"]': { width: 10 },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 10,
  },
})

const ScrollAreaThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: '$darkgray',
  borderRadius: 10,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

const ScrollAreaCorner = styled(ScrollArea.Corner, {
  background: '$darkgray',
})
