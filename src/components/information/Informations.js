import { Button, Alert, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import Labelinput from "../Labelinput";
import MyComponent from "../ToggleColorMode";

const Informations = (props) => {
  const [baseUrl, setBaseUrl] = useState(
    "https://64490e52b88a78a8f0fbe291.mockapi.io/api/v1/companies?tax_id="
  );
  const [entredTaxID, setEntredTaxID] = useState("");
  const [entredCompanyName, setEntredCompanyName] = useState("");
  const [entredAddress, setEntredAddress] = useState("");
  const [entredPricePerUnit, setEntredPricePerUnit] = useState("");
  const [entredQuantity, setEntredQuantity] = useState("");
  const [entredPriceGross, setEntredPriceGross] = useState(0);
  const [showAlert, setShowAlert] = useState("");
  const debounceValue = useDebounce(entredTaxID, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      entredTaxID &&
      entredCompanyName &&
      entredAddress &&
      entredPricePerUnit &&
      entredQuantity
    ) {
      setShowAlert("success");
    } else {
      setShowAlert("error");
    }
  };

  const taxIDHandler = (event) => {
    setEntredTaxID(event.target.value);
  };

  const companyNameHandler = (event) => {
    setEntredCompanyName(event.target.value);
  };

  const adressHandler = (event) => {
    setEntredAddress(event.target.value);
  };
  const pricePerUnitHandler = (event) => {
    setEntredPricePerUnit(event.target.value);
  };
  const quantityHandler = (event) => {
    setEntredQuantity(event.target.value);
  };
  const cleaningData = () => {
    setEntredTaxID("");
    setEntredCompanyName("");
    setEntredAddress("");
    setEntredPricePerUnit("");
    setEntredQuantity("");
  };

  useEffect(() => {
    if (entredPricePerUnit > 0 && entredQuantity > 0) {
      setEntredPriceGross(entredPricePerUnit * entredQuantity * 1.23);
    } else {
      setEntredPriceGross(0);
    }
  }, [entredPricePerUnit, entredQuantity]);

  useEffect(() => {
    fetchData(debounceValue);
  }, [debounceValue]);

  const fetchData = async (searchTax) => {
    try {
      const data = await axios.get(baseUrl + searchTax);

      if (data.status !== 200) {
        throw "Error";
      }

      const filteredData = data.data.filter((data) =>
        data.tax_id.includes(searchTax)
      );

      if (filteredData.length === 1) {
        setEntredTaxID(filteredData[0].tax_id);
        setEntredCompanyName(filteredData[0].company_name);
        setEntredAddress(filteredData[0].city + ", " + filteredData[0].street);
      }
    } catch (err) {
      alert("Błąd połączenia z bazą danych");
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          severity={showAlert}
          onClose={() => {
            if (showAlert === "success") {
              cleaningData();
            }
            setShowAlert("");
          }}
        >
          {showAlert === "success"
            ? `Tax ID: ${entredTaxID}\nCompany Name: ${entredCompanyName}\nAddress: ${entredAddress}\nPrice Per Unit: ${entredPricePerUnit}\nQuantity: ${entredQuantity}\nPrice Gross: ${entredPriceGross}`
            : "Please complete the form"}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            mb: 2,

            height: "800px",
            lineHeight: 1.5,
          }}
        >
          <Typography variant="h3" sx={{ lineHeight: 2 }}>
            Creating new invoices
          </Typography>
          <Labelinput
            textHandler={"Tax ID"}
            typeHandler={"text"}
            onChangeHandler={taxIDHandler}
            valueChangeHandler={entredTaxID}
          ></Labelinput>
          <Labelinput
            textHandler={"Company name"}
            typeHandler={"text"}
            onChangeHandler={companyNameHandler}
            valueChangeHandler={entredCompanyName}
          ></Labelinput>
          <Labelinput
            textHandler={"Address"}
            typeHandler={"text"}
            onChangeHandler={adressHandler}
            valueChangeHandler={entredAddress}
          ></Labelinput>
          <Labelinput
            textHandler={"Price per unit"}
            typeHandler={"number"}
            onChangeHandler={pricePerUnitHandler}
            valueChangeHandler={entredPricePerUnit}
          ></Labelinput>
          <Labelinput
            textHandler={"Quantity"}
            typeHandler={"number"}
            onChangeHandler={quantityHandler}
            valueChangeHandler={entredQuantity}
          ></Labelinput>
          <Typography
            variant="body1"
            sx={{ fontFamily: "Arial, sans-serif", fontSize: "150%" }}
          >
            Price gross : {entredPriceGross}
          </Typography>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Container>
      </form>
      <MyComponent></MyComponent>
    </>
  );
};

export default Informations;
