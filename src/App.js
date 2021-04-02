import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import { SideSheet } from 'evergreen-ui';
import { Layout } from './Components/Layout';
import { Editor } from './Components/Editor/Editor';
import { Menu } from './Components/Menu/Menu';
import { ActionBar } from './Components/ActionBar/ActionBar';

const App = () => {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <RecoilRoot>
      <ActionBar onMenu={() => setSideOpen(true)} />
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
