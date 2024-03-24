import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({ columns, data, title, actions }) => {
 // console.log("data-", data);
  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <MaterialTable
          title={title}
          columns={columns}
          data={data}
          actions={actions}
        />
      </ThemeProvider>
    </>
  );
};

export default DataTable;
