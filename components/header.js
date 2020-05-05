import Link from "next/link";
import styled from "styled-components";

function Header({ hasLoaded, headerTitle, isOpen, closeNav, locale, route }) {
  const backUp = e => {
    closeNav();
    (route === "/" || route === "/en") &&
      (e.preventDefault(),
      document.getElementById("land").scrollIntoView({ behavior: "smooth" }));
  };
  return (
    <TopHeader reveal={hasLoaded}>
      {/* <Link href={locale.lang === "en" ? "/en" : "/"} passHref> */}
      <Link href="/" passHref>
        <LogoLink onClick={backUp}>
          <h1>DFI</h1>
        </LogoLink>
      </Link>
      <HeaderTitle hide={isOpen}>{headerTitle}</HeaderTitle>
    </TopHeader>
  );
}
export default React.memo(Header);

const HeaderTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 4px;
  z-index: 2;
  top: 61px;
  mix-blend-mode: exclusion;
  opacity: ${props => (props.hide ? 0 : 1)};
  transition: opacity 0.2s ease;
  @media (max-height: 450px) and (min-width: 800px) {
    top: 40px;
  }
`;

const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  padding: 60px 80px 60px 50px;
  z-index: 12;
  margin: 0px auto;
  max-width: 1500px;
  pointer-events: none;
  mix-blend-mode: exclusion;
  opacity: ${props => (props.reveal ? 1 : 0)};
  transition: opacity 0.3s ease 0.3s;
  @media (max-width: 800px) {
    flex-direction: column;
    ${HeaderTitle} {
      transform: none;
      left: 0;
      position: relative;
      top: 0;
    }
  }
  @media (max-width: 600px) {
    padding-left: calc(20px + 5%);
    ${HeaderTitle} {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 450px) {
    padding-top: 35px;
  }
  @media (max-height: 450px) {
    padding-top: 35px;
  }
`;

const LogoLink = styled.a`
  display: flex;
  grid-column: 1 / span 2;
  max-width: 130px;
  margin: 0;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  pointer-events: auto;
  h1 {
    font-size: 0;
  }
  svg {
    max-width: 130px;
    width: 100%;
    path {
      fill: ${props => props.theme.colors.white};
    }
  }
`;
