import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationCom = ({ limit , totalblog , setpage }) => {
    const totalPages = Math.ceil(totalblog / limit);

    const handleChange = (event, value) => {
        setpage(value);
    };

    const theme = createTheme({
        palette: {
            secondary: {
                main: "#0a0909",
            },
        },
    });

    return (
        <div className="flex justify-center mt-14">
            {totalblog > 0 ? (
                <ThemeProvider theme={theme}>
                    <Stack spacing={2} className="text-4xl font-bold">
                        <Pagination
                            count={totalPages}
                            color="secondary"
                            onChange={handleChange}
                        />
                    </Stack>
                </ThemeProvider>
            ) : null}
        </div>
    );
};

export default PaginationCom;
