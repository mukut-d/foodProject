import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DBItems = () => {
  const defaultTheme = createTheme();
  return (
    <>
      <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
        <ThemeProvider theme={defaultTheme}>
          <MaterialTable
            title="Simple Action Preview"
            columns={[
              { title: "Name", field: "name" },
              { title: "Surname", field: "surname" },
              { title: "Birth Year", field: "birthYear", type: "numeric" },
              {
                title: "Birth Place",
                field: "birthCity",
                lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
              },
            ]}
            data={[
              {
                name: "Mehmet",
                surname: "Baran",
                birthYear: 1987,
                birthCity: 63,
              },
              {
                name: "Zerya Betül",
                surname: "Baran",
                birthYear: 2017,
                birthCity: 34,
              },
            ]}
            actions={[
              {
                icon: "save",
                tooltip: "Save User",
                onClick: (event, rowData) => alert("You saved " + rowData.name),
              },
            ]}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default DBItems;
