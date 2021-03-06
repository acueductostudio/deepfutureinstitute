import { useState } from "react";
import {
  Message,
  Input,
  Label,
  Button,
  selectStyles,
  isEmail,
} from "components/shared/Forms";
import Cookies from "js-cookie/dist/js.cookie";
import Select from "react-select/";
import SuccessConfirmation from "components/shared/SuccessConfirmation";

const SalesCollector = (product) => {
  const [displayMessage, setMessage] = useState(false);
  const [employeeOption, setEmployeeOption] = useState(null);
  const [status, setStatus] = useState("");
  let email, name, company;

  const correctList = () => {
    console.log(product);
    switch (Object.values(product)[0]) {
      case "Estudio":
        console.log("Estudio");
        return [12];
      case "Taller Empresarios":
        console.log("Taller Empresarios");
        return [13];
      case "Taller Corporativos":
        console.log("Taller Corporativos");
        return [14];
      default:
        console.log("Default, Covid tier 3");
        return [9];
    }
  };

  const handleEmployeeChange = (selectedEmployee) => {
    setEmployeeOption(selectedEmployee);
  };

  const call = async () => {
    setStatus("sending");
    let list = correctList();
    console.log(list);

    let requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.SENDINBLUE_API,
      },
      body: JSON.stringify({
        updateEnabled: true,
        email: email.value,
        listIds: list,
        attributes: {
          FIRSTNAME: name.value,
          COMPANY: company.value,
          EMPLOYEES: employeeOption.value,
        },
      }),
    };

    const emailAddress = email.value;

    const response = await fetch(
      "https://api.sendinblue.com/v3/contacts",
      requestOptions
    );
    const data = await response;
    console.log(data);
    data.status !== 400
      ? (setMessage(
          "Gracias! Un asesor te contactará dentro de 24 horas hábiles"
        ),
        setStatus("success"),
        Cookies.set("userEmail", emailAddress))
      : (setMessage("Algo salió mal"), setStatus("error"));
  };

  const submitEnterprise = () => {
    if (!email.value) {
      setStatus("error"), setMessage("Ingresa tu email");
    } else if (!isEmail.test(email.value)) {
      setStatus("error"), setMessage("Email en formato incorrecto");
    } else if (
      email.value.includes("@gmail.com") ||
      email.value.includes("@aol.com") ||
      email.value.includes("@icloud.com") ||
      email.value.includes("@me.com") ||
      email.value.includes("@msn.com") ||
      email.value.includes("@yahoo.com") ||
      email.value.includes("@live.com") ||
      email.value.includes("@hotmail.com")
    ) {
      setStatus("error"), setMessage("Ingresa un email de empresa");
    } else if (!name.value) {
      setStatus("error"), setMessage("Ingresa tu nombre");
    } else if (!company.value) {
      setStatus("error"), setMessage("Ingresa tu empresa");
    } else if (employeeOption === null) {
      setStatus("error"), setMessage("Selecciona tu número de empleados");
    } else {
      setStatus(""), call();
    }
  };

  return (
    <>
      {status === "sending" && <Message>Enviando...</Message>}
      {status === "error" && (
        <Message error dangerouslySetInnerHTML={{ __html: displayMessage }} />
      )}
      {status === "success" && (
        <SuccessConfirmation>
          <h5>¡Gracias!</h5>
          <p>Te contactaremos a la brevedad.</p>
        </SuccessConfirmation>
      )}
      {status !== "success" && (
        <>
          <Label>
            <span>email</span>
            <Input
              ref={(node) => (email = node)}
              type="email"
              placeholder="Email*"
            />
          </Label>
          <Label>
            <span>nombre</span>
            <Input
              ref={(node) => (name = node)}
              type="text"
              placeholder="Nombre*"
            />
          </Label>
          <Label>
            <span>empresa</span>
            <Input
              ref={(node) => (company = node)}
              type="text"
              placeholder="Empresa*"
            />
          </Label>
          <Label>
            <span>Número de empleados</span>
            <Select
              styles={selectStyles}
              placeholder="Número de empleados"
              instanceId="Employees"
              isSearchable={false}
              options={[
                { value: "1-10", label: "1 - 10" },
                { value: "11-50", label: "11 - 50" },
                { value: "51-500", label: "51 - 500" },
                { value: "+500", label: "Más de 500" },
              ]}
              value={employeeOption}
              onChange={handleEmployeeChange}
            ></Select>
          </Label>
          <Button onClick={submitEnterprise}>Contactar asesor</Button>
        </>
      )}
    </>
  );
};

export default SalesCollector;
