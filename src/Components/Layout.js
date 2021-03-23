import React from 'react';
import styled from 'styled-components';

const TopSection = styled.section`
  min-height: 200px;
  padding: 0;
  background: blue;
`;

const BottomSection = styled.section`
  padding: 10px;
  background: red;
`;

export const Layout = ({ top, bottom }) => (
  <main>
    <TopSection>
      { top }
    </TopSection>
    <BottomSection>
      { bottom }
    </BottomSection>
  </main>
);
