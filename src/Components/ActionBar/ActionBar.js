import React, { useState } from "react";
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import { Pane, Button, IconButton, MenuIcon, PlayIcon, SelectMenu } from 'evergreen-ui';
import { Profiles } from '../../State/Profiles';

const QuickMenu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background: #fff;
`;

export const ActionBar = ({ onMenu }) => {
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const [profiles] = useRecoilState(Profiles);

  return (
    <QuickMenu>
      <Pane
        display="flex"
        elevation={3}
        float={'right'}
        padding={5}
      >
        <SelectMenu
          title="Profile"
          selected={selectedProfile}
          onSelect={(item) => setSelectedProfile(item.value)}
          options={Object.values(profiles).map(p => ({
            label: p.name,
            value: p
          }))}
        >
          <Button appearance="minimal">{selectedProfile ? selectedProfile.name : 'Select a Profile...'}</Button>
        </SelectMenu>
        <IconButton appearance="minimal" icon={MenuIcon} onClick={() => onMenu(true)} />
        <IconButton appearance="minimal" icon={PlayIcon} intent="success" />
      </Pane>
    </QuickMenu>
  );
};
