
export const contractsDataGridColumnsHeaders = [
    /* {
      field: '_id', // Column field matches the key in the object
      headerName: 'ID', // Column header label
      width: 300, // Adjust width to accommodate long IDs
      sortable: false, // IDs typically don’t need sorting
    }, */
    {
        field: 'name',
        headerName: 'Name', // Translates to "securité"
        width: 150, // Moderate width for names
        editable: !true, // Allows user to edit this field
    },
    {
        field: 'type',
        headerName: 'Type', // Translates to "annuelle"
        width: 150,
        editable: !true, // Editable in the grid
    },
    {
        field: 'cost',
        headerName: 'Cost', // Translates to "200"
        type: 'number', // Defines cost as a numeric value
        width: 120,
        editable: !true, // User can update cost in the grid
    },
]

export const contractsDataSearchFiletrs = [
    { label: "All", value: "all" },
    { label: "Buildings", value: "buildings" },
    { label: "Apartments", value: "apartments" },
    { label: "Contracts", value: "contracts" },
]