import React from "react";
import App from "next/app";
import Router from "next/router";
import { ThemeProvider } from "styled-components";
import LoadingBar from "react-top-loading-bar";
import Layout from "components/layout";
import theme from "styles/theme";
import Cookies from "js-cookie/dist/js.cookie";
import es from "public/locales/es/common.json";
import { LangProvider } from "utils/LangContext";
import { withRouter } from "next/router";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const production = false;

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      locale: es,
      hasToConsent: false,
      hasLoaded: true,
      readyToScroll: false,
    };
  }

  authenticate() {
    return new Promise((resolve) => setTimeout(resolve, 1500)); //1500
  }

  toggleLang = (lang) => {
    let language = lang === "en" ? en : es;
    Cookies.set("chosenLang", lang);
    this.setState({
      locale: language,
    });
  };

  handleRouteComplete = (url) => {
    var _myself = this;
    setTimeout(function () {
      _myself.LoadingBar.complete();
    }, 300);
  };

  handleRouteStart = (url) => {
    this.LoadingBar.continuousStart();
  };

  handleRouteError = (err, url) => {
    var _myself = this;
    setTimeout(function () {
      if (err.cancelled) {
        console.log(`${err} on route to ${url}`);
      }
      _myself.LoadingBar.complete();
    }, 300);
  };

  componentDidMount() {
    // Disable scroll
    // Esto es importante para el loading icon
    const targetElement = document.querySelector("#logo"); //dummy
    disableBodyScroll(targetElement);

    // Load Animation
    this.authenticate().then(() => {
      const bordered = document.getElementById("bordered");
      const logo = document.getElementById("logo");
      const revealer = document.getElementById("revealer");
      if (bordered) {
        setTimeout(() => {
          // transition out
          bordered.classList.add("hidden");
          logo.style.opacity = "0";

          setTimeout(() => {
            revealer.style.opacity = "0";
            revealer.style.pointerEvents = "none";
            this.setState(
              { hasLoaded: true },
              () => console.log("Page hasLoaded"),
              enableBodyScroll(targetElement)
            );
          }, 500);

          setTimeout(() => {
            // remove from DOM
            bordered.remove();
            revealer.remove();
            logo.remove();
          }, 3000);
        }, 500);
      }
    });
    // router event listeners for loadingBar
    Router.events.on("routeChangeStart", this.handleRouteStart);
    Router.events.on("routeChangeComplete", this.handleRouteComplete);
    Router.events.on("routeChangeError", this.handleRouteError);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.handleRouteStart);
    Router.events.off("routeChangeComplete", this.handleRouteComplete);
    Router.events.off("routeChangeError", this.handleRouteError);
  }

  checkForConsent = () => {
    // Check if cookie message has been closed before
    var _C = Cookies.get("showCookieMessage");
    if (_C === undefined) {
      this.setState({ hasToConsent: true });
    } else if (_C === "false") {
      this.setState({ hasToConsent: false });
    }
  };

  consentToCookies = () => {
    Cookies.set("showCookieMessage", "false");
    this.setState({ hasToConsent: false });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <LangProvider value={this.state.locale}>
          <LoadingBar
            onRef={(ref) => (this.LoadingBar = ref)}
            height={3}
            color={theme.colors.home.accent}
            className="TopBar"
          />
          <Layout
            locale={this.state.locale}
            checkForConsent={this.checkForConsent}
            consentToCookies={this.consentToCookies}
            hasToConsent={this.state.hasToConsent}
            hasLoaded={this.state.hasLoaded}
            toggleLang={this.toggleLang}
            production={production}
          >
            <Component
              locale={this.state.locale}
              {...pageProps}
              lang={this.state.locale.lang}
              production={production}
            />
          </Layout>
        </LangProvider>
      </ThemeProvider>
    );
  }
}

export default withRouter(MyApp);
