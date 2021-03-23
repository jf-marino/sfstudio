import React, { useState } from 'react';
import {
  Pane,
  Tablist,
  SidebarTab,
  Heading,
  TextInput,
  Button,
} from 'evergreen-ui';
import { ProfileMenu } from './ProfileMenu';

const TABS = [
  { title: 'Profile', component: <ProfileMenu flex={1} /> },
  { title: 'Settings', component: <Heading>Under Construction</Heading> },
]

export const Menu = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <Pane height="100%" display="flex" flexDirection="column">
      <Heading size={800} marginTop={5} marginLeft={5} marginBottom={20}>Configuration</Heading>
      <Pane display="flex" flex={1}>
        <Tablist marginRight={24} style={{ minWidth: '200px' }}>
          {TABS.map((tab, index) => (
            <SidebarTab
              key={tab.title}
              id={tab.title}
              isSelected={index === selectedTabIndex}
              onSelect={() => setSelectedTabIndex(index)}
              margin={5}
            >
              {tab.title}
            </SidebarTab>
          ))}
        </Tablist>
        <Pane flex={1} display='flex' flexDirection="column">
          {TABS.map((tab, index) => (
            <Pane flex={1} flexDirection="column" display={index === selectedTabIndex ? 'flex' : 'none'}>
              {tab.component}
            </Pane>
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
};
