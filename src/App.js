import React, { useState } from "react";
import styled from 'styled-components';
import { RecoilRoot } from "recoil";
import { Pane, SideSheet, IconButton, MenuIcon, PlayIcon } from 'evergreen-ui';
import { Layout } from './Components/Layout';
import { Editor } from './Components/Editor';
import { Menu } from './Components/Menu';

const QuickMenu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background: #fff;
`;

const App = () => {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <RecoilRoot>
      <QuickMenu>
        <Pane
          display="flex"
          elevation={3}
          float={'right'}
          padding={5}
        >
          <IconButton appearance="minimal" icon={MenuIcon} onClick={() => setSideOpen(true)} />
          <IconButton appearance="minimal" icon={PlayIcon} intent="success" />
        </Pane>
      </QuickMenu>
      <SideSheet isShown={sideOpen} onCloseComplete={() => setSideOpen(false)}>
        <Menu />
      </SideSheet>
      <Layout
        top={<Editor />}
        bottom={<div>Bottom Part</div>}
      />
    </RecoilRoot>
  );
}

export default App;
