import { useEffect } from "react";
import styled from "styled-components";
import { H1, H2 } from "components/shared/Dangerously";
import EmailCollector from "components/EmailCollector";

function FormComplete({ centered }) {
  return (
    <Form centered={centered}>
      <Column>
        {centered ? (
          <>
            <h4>
              Descarga el <b>reporte</b>
            </h4>
            <p>
              Muchos <b>escenarios de riesgo</b> sacudirán a los negocios de
              México durante esta crisis. Conoce cinco de <b>ellos</b> en este
              <b> PDF gratuito</b> y considéralos en tu planeación estratégica.
            </p>
          </>
        ) : (
          <>
            <h4>PDF descargable</h4>
            <p>
              <b>Escenarios clave</b> para generar certidumbre ante el impacto
              del <b>COVID-19</b> y la <b>4T</b>
            </p>
          </>
        )}
      </Column>
      <Column>
        <EmailCollector complete />
      </Column>
    </Form>
  );
}

export default FormComplete;

const Form = styled.div`
  background-color: ${(props) => props.theme.colors.accent};
  grid-column: ${(props) => (props.centered ? "3 / span 8" : "6 / span 6")};
  border-radius: 5px;
  padding: 5% 6.5%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  transition: all 0.3s ease-in;
  pointer-events:auto;
`;

const Column = styled.div`
  max-width: 330px;
  width: 100%;
  color: ${(props) => props.theme.colors.foreground};
  :nth-of-type(1){
    padding-right: 5%;
  }
  h4 {
    font-weight: 300;
    font-size: 3rem;
    margin-bottom: 23px;
    b {
      font-weight: 500;
    }
  }
`;
