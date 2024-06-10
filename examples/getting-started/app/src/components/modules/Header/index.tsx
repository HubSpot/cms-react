import { Menu, logInfo } from '@hubspot/cms-components';
import {
  ImageField,
  MenuField,
  ModuleFields,
} from '@hubspot/cms-components/fields';
import logo from '../../../assets/sprocket.svg';
import headerStyles from '../../../styles/header.module.css';

export function Component({ fieldValues }) {
  logInfo(fieldValues);
  return (
    <header className={headerStyles.wrapper}>
      <nav>
        <img src={fieldValues.logo.src} alt="Logo" />
        {/* <Menu fieldPath="menu" /> */}
        <div>
          <span
            id="hs_cos_wrapper_widget_1717899743787_"
            className="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_menu"
            data-hs-cos-general-type="widget"
            data-hs-cos-type="menu"
          >
            <div
              id="hs_menu_wrapper_widget_1717899743787_"
              className="hs-menu-wrapper active-branch flyouts hs-menu-flow-horizontal"
              role="navigation"
              data-sitemap-name="default"
              data-menu-id="53522818668"
              aria-label="Navigation Menu"
            >
              <ul role="menu">
                <li className="hs-menu-item hs-menu-depth-1" role="none">
                  <a href="javascript:;" role="menuitem">
                    Home
                  </a>
                </li>
                <li
                  className="hs-menu-item hs-menu-depth-1 hs-item-has-children"
                  role="none"
                >
                  <a
                    href="javascript:;"
                    aria-haspopup="true"
                    aria-expanded="false"
                    role="menuitem"
                  >
                    Software
                  </a>
                  <ul role="menu" className="hs-menu-children-wrapper">
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        Free HubSpot CRM
                      </a>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        Marketing Hub
                      </a>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        Sales Hub
                      </a>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        Service Hub
                      </a>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        CMS Hub
                      </a>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        App Marketplace
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="hs-menu-item hs-menu-depth-1" role="none">
                  <a href="javascript:;" role="menuitem">
                    Pricing
                  </a>
                </li>
                <li
                  className="hs-menu-item hs-menu-depth-1 hs-item-has-children"
                  role="none"
                >
                  <a
                    href="javascript:;"
                    aria-haspopup="true"
                    aria-expanded="false"
                    role="menuitem"
                  >
                    Resources
                  </a>
                  <ul role="menu" className="hs-menu-children-wrapper">
                    <li
                      className="hs-menu-item hs-menu-depth-2 hs-item-has-children"
                      role="none"
                    >
                      <a href="javascript:;" role="menuitem">
                        Blog
                      </a>
                      <ul role="menu" className="hs-menu-children-wrapper">
                        <li
                          className="hs-menu-item hs-menu-depth-3"
                          role="none"
                        >
                          <a href="javascript:;" role="menuitem">
                            Blog Topic Generator
                          </a>
                        </li>
                        <li
                          className="hs-menu-item hs-menu-depth-3"
                          role="none"
                        >
                          <a href="javascript:;" role="menuitem">
                            Blog Ideas Generator
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        Customer Stories
                      </a>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        Developers
                      </a>
                    </li>
                    <li className="hs-menu-item hs-menu-depth-2" role="none">
                      <a href="javascript:;" role="menuitem">
                        Ebooks, Guides &amp; More
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="hs-menu-item hs-menu-depth-1" role="none">
                  <a href="javascript:;" role="menuitem">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </nav>
    </header>
  );
}

const DEFAULT_MENU_ID = '53522818668';

export const fields = (
  <ModuleFields>
    <ImageField name="logo" label="Logo" default={{ src: logo }} />
    <MenuField name="menu" label="Menu" default={DEFAULT_MENU_ID} />
  </ModuleFields>
);

export const meta = {
  label: 'Header Module',
};
