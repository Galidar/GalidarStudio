import React from 'react';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import productNavConfig from './productNavConfig';
import styles from './styles.module.css';

export default function SubNavbar(): JSX.Element | null {
  let {pathname} = useLocation();

  // Remove trailing slash for consistent matching
  if (pathname.endsWith('/') && pathname.length > 1) {
    pathname = pathname.slice(0, -1);
  }

  // Find the active product based on current path
  let activeProduct = productNavConfig.find((p) =>
    pathname === p.basePath || pathname.startsWith(p.basePath + '/')
  );

  if (!activeProduct) {
    return null; // No sub-navbar outside product pages
  }

  return (
    <div
      className={styles.subNavbar}
      style={{'--product-color': activeProduct.color} as React.CSSProperties}
    >
      <div className={styles.subNavbarInner}>
        <span className={styles.productName}>{activeProduct.name}</span>
        <div className={styles.divider} />
        <nav className={styles.subNavbarItems}>
          {activeProduct.items.map((item) => {
            let isActive = pathname === item.to ||
              (item.to !== activeProduct.basePath && pathname.startsWith(item.to + '/'));

            // Special case: "Introduction" is only active on exact basePath match
            if (item.to === activeProduct.basePath) {
              isActive = pathname === item.to;
            }

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`${styles.subNavbarLink} ${isActive ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
