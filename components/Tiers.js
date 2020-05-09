import styled from "styled-components";
import MainGrid from "components/shared/MainGrid";
import Title from "components/shared/Title";
import { P, H3 } from "components/shared/Dangerously";
import Check from "public/assets/img/layout/check.svg";
import Uncheck from "public/assets/img/layout/uncheck.svg";
import Fade from "react-reveal/Fade";

const includes = [
  {
    title: "<b>Variables</b> de riesgo",
    subtitle: "Riesgo, oportunidades y COVID-19",
  },
  {
    title: "Proceso de <b>prospectiva</b>",
    subtitle: "Aprende a reducir la incertidumbre",
  },
  {
    title: "<b>Worksheets</b> de trabajo",
    subtitle: "Te brindamos los materiales necesarios",
  },
  {
    title: "Taller con <b>expertos</b>",
    subtitle: "Con más de 20 años de experiencia",
  },
  {
    title: "Plan de <b>acciones</b> con expertos",
    subtitle: "Prepárate para los escenarios futuros",
  },
  {
    title: "<b>Personalización</b> para tu empresa",
    subtitle: "Ten a tu equipo en la misma página",
  },
];

const tiers = [
  {
    title: "autogestivo",
    description:
      "Cómo generar certidumbre ante el impacto del <b>COVID-19</b> y la <b>4T</b>",
    price: "$1,400",
    originalPrice: "2,500",
    perks: {
      prospectiva: true,
      worksheets: true,
      expertos: false,
      acciones: false,
      empresarial: false,
    },
  },
  {
    title: "personal",
    description:
      "Genera certidumbre ante el impacto del <b>COVID-19</b> y la <b>4T</b> junto con <b>expertos</b>",
    price: "$10,000",
    originalPrice: "25,000",
    color: "#62AF9A",
    perks: {
      prospectiva: true,
      worksheets: true,
      expertos: true,
      acciones: false,
      empresarial: false,
    },
  },
  {
    title: "empresarial",
    description:
      "Minimiza los riesgos del impacto del <b>COVID-19</b> y la <b>4T</b> junto con <b>expertos</b>",
    price: "$57,000",
    color: "#1C4794",
    perks: {
      prospectiva: true,
      worksheets: true,
      expertos: true,
      acciones: true,
      empresarial: true,
    },
  },
];

const Tier = ({ tier }) => {
  return (
    <TierContainer color={tier.color}>
      <Padded>
        <Fade>
          <h2>
            Taller <b>{tier.title}</b>
          </h2>
          <H3>{tier.description}</H3>
        </Fade>
        <Fade>
          <Price>
            <span>
              {tier.title === "empresarial" && <span>desde </span>}
              {tier.price} <span>MXN</span>
            </span>
            <span>{tier.originalPrice ? "$" + tier.originalPrice : null}</span>
          </Price>
          <Button>Comprar</Button>
        </Fade>
      </Padded>
    </TierContainer>
  );
};

function Tiers() {
  return (
    <TiersSection>
      <Title>
        <p>
          Prepárate para los escenarios de <b>futuro</b>
        </p>
        <h3>
          Conoce nuestros <b>talleres</b>
        </h3>
      </Title>
      <TiersGrid notoppadding>
        <TierBackground />
        <TierBackground />
        <TierBackground />
        <Includes></Includes>
        {tiers.map((tier, i) => (
          <Tier key={"tier" + i} tier={tier} />
        ))}
        <Includes>
          <span>Incluye</span>
          <StatsInclude>
            {includes.map((include, i) => (
              <li key={"include" + (i + 100)}>
                <H3>{include.title}</H3>
                {
                  //aquí hay un problema
                }
                <p>{include.subtitle}</p>
              </li>
            ))}
          </StatsInclude>
        </Includes>
        {tiers.map((tier, i) => (
          <Stats key={"tierstats" + i}>
            <li>18</li>
            {Object.entries(tier.perks).map((perk, i) => (
              <li key={`tp-${i}-${tier.price}`}>
                {perk[1] ? <Check /> : <Uncheck />}
              </li>
            ))}
          </Stats>
        ))}
      </TiersGrid>
    </TiersSection>
  );
}

export default Tiers;

const Stats = styled.ul`
  text-align: center;
  grid-column-end: span 3;
  padding-bottom: 25px;
  li {
    padding: 17px 0;
  }
`;

const StatsInclude = styled(Stats)`
  li {
    text-align: left;
    padding: 10px 0;
    h3 {
      font-size: 2rem;
      color: ${(props) => props.theme.colors.accent};
    }
    p {
      font-size: 1.7rem;
      color: ${(props) => props.theme.colors.foreground_low};
    }
  }
`;

const Includes = styled.div`
  grid-column-end: span 3;
  position: relative;
  span {
    font-size: 3rem;
    position: absolute;
    top: -50px;
  }
`;

const Padded = styled.div`
  padding: 8%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100% - 80px);
  div:nth-of-type(2) {
    ::after {
      content: " ";
      height: 2px;
      display: flex;
      margin-top: 40px;
      width: 100%;
      opacity: 0.8;
      background-color: ${(props) => props.theme.colors.foreground_lower};
    }
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2.7rem;
  margin: 10% 0;
  span {
    span {
      font-size: 2rem;
    }
    :nth-of-type(1) {
      color: ${(props) => props.theme.colors.accent};
    }
    :nth-of-type(2) {
      color: ${(props) => props.theme.colors.foreground_low};
      text-decoration: line-through;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.foreground};
`;

const TierContainer = styled.div`
  grid-column-end: span 3;
  /* box-shadow: ${(props) =>
    `-4px -6px 11px ${props.theme.colors.lightlight}, 
    4px 4px 12px ${props.theme.colors.lightshadow}`}; */
  /* border-radius: 3px; */
  ::before {
    content: " ";
    display: flex;
    border-radius: 3px 3px 0px 0px;
    height: 80px;
    width: 100%;
    background-color: ${(props) =>
      props.color ? props.color : props.theme.colors.background};
  }
  h2 {
    font-size: 2.6rem;
    color: ${(props) => props.theme.colors.accent};
    font-weight: 400;
    padding-bottom: 20px;
    b {
      font-weight: 500;
    }
  }
  h3 {
    font-size: 2rem;
    color: ${(props) => props.theme.colors.foreground_lowest};
    opacity: 0.6;
  }
`;

const TierBackground = styled.div`
  box-shadow: ${(props) =>
    `-4px -6px 11px ${props.theme.colors.lightlight}, 
    4px 4px 12px ${props.theme.colors.lightshadow}`};
  border-radius: 3px;
  grid-column-end: span 3;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  grid-row: 1 / span 2;
`;

const TiersGrid = styled(MainGrid)`
  background-color: ${(props) => props.theme.colors.foreground};
  color: ${(props) => props.theme.colors.background};
  ${TierBackground} {
    :nth-of-type(1) {
      grid-column-start: 4;
    }
    :nth-of-type(2) {
      grid-column-start: 7;
    }
    :nth-of-type(3) {
      grid-column-start: 10;
    }
  }
`;

const TiersSection = styled.section`
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.foreground};
  width: 100%;
`;
