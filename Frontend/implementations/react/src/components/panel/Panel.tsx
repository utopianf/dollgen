import * as Tabs from '@radix-ui/react-tabs';

import { styled } from '../../core/stitches';
import { EyesTab } from '../tabs/EyesTab';
import { HeadTab } from '../tabs/HeadTab';
import { MakeoverTab } from '../tabs/MakeoverTab';

export const Panel = () => {
    return (
        <Flex>
            <TabsRoot>
                <TabsList>
                    <TabsTrigger value="head">Head</TabsTrigger>
                    <TabsTrigger value="makeover">Makeover</TabsTrigger>
                    <TabsTrigger value="eyes">Eyes</TabsTrigger>
                    <TabsTrigger value="setups">Setups</TabsTrigger>
                </TabsList>
                <TabsContent value="head">
                    <HeadTab />
                </TabsContent>
                <TabsContent value="makeover">
                    <MakeoverTab />
                </TabsContent>
                <TabsContent value="eyes">
                    <EyesTab />
                </TabsContent>
                <TabsContent value="setups"></TabsContent>
            </TabsRoot>
        </Flex>
    );
};

const Flex = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
});

const TabsRoot = styled(Tabs.Root, {
    display: 'flex',
    flexDirection: 'column'
});

const TabsList = styled(Tabs.List, {
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    height: '38px',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const TabsTrigger = styled(Tabs.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: '$ultralightgray',
    fontSize: '$lg',
    lineHeight: '$lg',
    color: '$darkgray',
    userSelect: 'none',
    height: 38,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-state="active"]': {
        borderBottom: '3px solid $darkgray'
    }
});

const TabsContent = styled(Tabs.Content, {
    flexGrow: 1,
    backgroundColor: '$ultralightgray',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    outline: 'none',
    margin: 20,
    '&:focus': { boxShadow: `0 0 0 2px black` }
});
