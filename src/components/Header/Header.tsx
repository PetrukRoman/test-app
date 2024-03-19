import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { useState, useEffect, useCallback } from "react";
import { ModalContext, ModalContextType } from "../../context/modalContext";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { useAppSelector } from "../../hooks/hooks";
import { Select, Option } from "../Select/Select";
import Button from "../Button/Button";
import LogoIcon from "../../assets/logo.png";
import CartIcon from "../../assets/cart.svg";
import LoginIcon from "../../assets/login.svg";
import MenuIcon from "../../assets/menu.svg";
import CloseIcom from "../../assets/closeMenu.svg";
import styles from "./Header.module.css";

type Language = {
  nativeName: string;
};

type Languages = {
  [key: string]: Language;
};

const lngs: Languages = { "ru-RU": { nativeName: "Ru" }, en: { nativeName: "En" } };

const Header = () => {
  const { token } = useContext(AuthContext) as AuthContextType;
  const { items } = useAppSelector((state) => state.cart);
  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const { openLogin, openLogout } = useContext(ModalContext) as ModalContextType;

  const toggleMenu = useCallback(() => {
    setOpenMenu((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement;
    const originalStyle = window.getComputedStyle(root);

    if (openMenu) {
      root.style.overflow = "hidden";
      root.style.height = "100svh";
    } else {
      root.setAttribute("style", originalStyle.cssText);
    }

    return () => {
      root.setAttribute("style", originalStyle.cssText);
    };
  }, [openMenu, toggleMenu]);

  const totalCountMeals = items.reduce((acc, curr) => (acc += curr.quantity), 0);

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <Link to="/">
              <div className={styles.logo}>
                <img src={LogoIcon} alt="Logo" />
              </div>
            </Link>
            <nav className={styles.navMenuDesktop}>
              {token && (
                <ul>
                  <li>
                    <NavLink to="/menu" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                      {t("link-menu.key")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/orders" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                      {t("link-orders.key")}
                    </NavLink>
                  </li>
                </ul>
              )}
            </nav>

            <ul className={styles.navIcons}>
              <li className={styles.desktopLanguageSelect}>
                <Select
                  onChange={(event) => {
                    i18n.changeLanguage(event.target.value);
                  }}
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.8rem",
                    minWidth: "4rem",
                  }}
                >
                  {Object.keys(lngs).map((lng) => {
                    return (
                      <Option value={lng} key={lng}>
                        {lngs[lng].nativeName}
                      </Option>
                    );
                  })}
                </Select>
              </li>
              <li className={styles.desktopCartButton}>
                <Link to="/order">
                  <div className={styles.cart}>
                    <img src={CartIcon} alt="cart" />
                    <span>{totalCountMeals}</span>
                  </div>
                </Link>
              </li>
              <li className={styles.mobileCartButton}>
                <Link to="/order" onClick={() => setOpenMenu(false)}>
                  <div className={styles.cart}>
                    <img src={CartIcon} alt="cart" />
                    <span>{totalCountMeals}</span>
                  </div>
                </Link>
              </li>
              <li className={styles.mobileMenuButton}>
                <Button size="small" onClick={toggleMenu}>
                  <div className={styles.menuIcon}>{openMenu ? <img src={CloseIcom} alt="Close" /> : <img src={MenuIcon} alt="Menu" />}</div>
                </Button>
              </li>
              <li className={styles.desktopSignButton}>
                {token ? (
                  <Button variant="filled" onClick={openLogout}>
                    <img src={LoginIcon} alt="Logout" />
                    {t("SignOut.key")}
                  </Button>
                ) : (
                  <Button variant="filled" onClick={openLogin}>
                    <img src={LoginIcon} alt="Login" />
                    {t("LogIn.key")}
                  </Button>
                )}
              </li>
            </ul>
          </div>

          {openMenu && (
            <div className={styles.mobileNav}>
              <div className={styles.mobileNavContainer}>
                <nav className={styles.mobileNavMenu}>
                  {token && (
                    <ul>
                      <li>
                        <NavLink to="/menu" className={({ isActive }) => (isActive ? styles.active : undefined)} onClick={toggleMenu}>
                          {t("link-menu.key")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/orders" className={({ isActive }) => (isActive ? styles.active : undefined)} onClick={toggleMenu}>
                          {t("link-orders.key")}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </nav>

                <ul>
                  <li>
                    <div
                      style={{
                        maxWidth: "6rem",
                      }}
                    >
                      <Select
                        onChange={(event) => {
                          i18n.changeLanguage(event.target.value);
                        }}
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.8rem",
                          minWidth: "4rem",
                        }}
                      >
                        {Object.keys(lngs).map((lng) => {
                          return (
                            <Option key={lng} value={lng}>
                              {lngs[lng].nativeName}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </li>

                  <li>
                    <div>
                      {token ? (
                        <Button
                          variant="filled"
                          size="fill"
                          onClick={() => {
                            setOpenMenu(false);
                            openLogout();
                          }}
                        >
                          <img src={LoginIcon} alt="Logout" />
                          {t("SignOut.key")}
                        </Button>
                      ) : (
                        <Button
                          variant="filled"
                          size="fill"
                          onClick={() => {
                            setOpenMenu(false);
                            openLogin();
                          }}
                        >
                          <img src={LoginIcon} alt="Login" />
                          {t("LogIn.key")}
                        </Button>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
