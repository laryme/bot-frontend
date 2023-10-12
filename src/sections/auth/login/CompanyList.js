import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";

CompanyList.propTypes = {
    companies: PropTypes.array,
    onClick: PropTypes.func
}

export default function CompanyList({companies, onClick}){

  return (
    <>
        {companies.map((company, index) => (
            <Stack key={index} mb={2} textAlign={"left"}>
                <Button color="secondary" onClick={() => onClick(company.id)}>{company.name}</Button>
            </Stack>
        ))}
    </>
  );
}