import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import SubNavbar from '@site/src/components/SubNavbar';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
  return (
    <>
      <Navbar {...props} />
      <SubNavbar />
    </>
  );
}
