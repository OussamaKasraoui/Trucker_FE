import React, { useState, useEffect } from 'react'; // Import useEffect
import Box from '@mui/material/Box';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import DataGridCustomToolbar from '@components/DataGridCustomToolbar';

const DataGrid = ({ 
    name, columns, rows, selected, payload,
    search, setSearch, searchInput, setSearchInput
 }) => {
    const theme = useTheme();

    // Function to check if two arrays are equal
    const areArraysEqual = (arr1, arr2) =>
        arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
        

    // Initialize state based on the initial selected prop
    const [rowSelectionModel, setRowSelectionModel] = useState(() => {
        if (typeof selected === 'number' && selected >= 0 && rows?.[selected]?.id) {
            return [rows[selected].id]; // Initial selection based on index
        }
        return []; // Default to no selection
    });

    // Effect to update selection when 'selected' prop or 'rows' change
    useEffect(() => {
        let newSelectionModel = [];
        // Check if selected is a valid index and the corresponding row exists
        if (typeof selected === 'number' && selected >= 0 && rows?.[selected]?.id) {
            newSelectionModel = [rows[selected].id];
        }
        // Update the state only if the calculated selection is different
        // This prevents unnecessary re-renders and potential loops if payload updates selected
        if (!areArraysEqual(rowSelectionModel, newSelectionModel)) {
            setRowSelectionModel(newSelectionModel);
        }
    }, [selected, rows]); // Re-run effect if selected index or rows data change

    // Removed getRowIndex as it's not used directly anymore

    const handleSelectionChange = (newRowSelectionModel) => {
        // Update the internal state first
        setRowSelectionModel(newRowSelectionModel);

        // Find the index of the newly selected row (if any)
        const selectedId = newRowSelectionModel[0]; // Assuming single selection
        const selectedIndex = selectedId !== undefined
            ? rows.findIndex(item => item.id === selectedId)
            : null; // Use -1 or null if nothing is selected

        // Call the payload function with the index and ID
        // Pass null or -1 for index if selection is cleared
        payload(![-1, null, undefined].includes(selectedIndex) ? selectedIndex : null, selectedId ?? null);
        
    };

    return (
        <>
            {/* <h4>src/components/DataGrid.jsx</h4> */}
            <Box
                className="indigo"
                sx={{
                    px: 1,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        // Consider using theme colors for borders
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        // Use theme colors for consistency
                        backgroundColor: theme.palette.background.paper, // Or another appropriate theme color
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        // fontWeight: 'bold', // Optional: make headers bold
                    },
                }}
            >
                <MuiDataGrid
                    rows={rows}
                    columns={columns}
                    // getRowId={(row) => row.id} // Ensure MUI knows how to get the ID

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5, // Consider making this configurable via props
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]} // Standard page size options
                    // disableRowSelectionOnClick // Keep this if you only want selection via checkboxes (if enabled)

                    // Use the controlled selection model
                    onRowSelectionModelChange={handleSelectionChange}
                    rowSelectionModel={rowSelectionModel}
                    // selectionModel={rowSelectionModel} // Deprecated, use rowSelectionModel

                    sx={{
                        // Removed width: 'fit-content' as Box handles sizing
                        minWidth: '100%',
                    }}
                    
                    slots={{
                        toolbar: DataGridCustomToolbar
                    }}

                    slotProps={{
                        toolbar: {
                           search, 
                           setSearch, 
                           searchInput, 
                           setSearchInput 
                        }
                   }}

                    // Optional: Add loading state from parent if rows are loading
                    // loading={isLoading}
                />
            </Box>
        </>
    );
};

export default DataGrid;



// import React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
// import { useTheme } from '@mui/material';
// import DataGridCustomToolbar from '@components/DataGridCustomToolbar';

// const DataGrid = ({ name, columns, rows, selected, payload }) => {
//     const theme = useTheme();
//     const [rowSelectionModel, setRowSelectionModel] = React.useState(selected ? [rows[selected].id] : []);

//     function getRowIndex(id) {
        
//         return rows.findIndex(item => item.id === id)
//     }

//     return (
//         <>
//             {/* <h4>src/components/DataGrid.jsx</h4> */}
//             <Box
//                 className="indigo"
//                 sx={{
//                     px: 1,
//                     width: '100%', // Take up full width of the parent
//                     height: '100%', // Take up full height of the parent
//                     overflow: 'auto', // Enable scrolling for both horizontal and vertical overflow
//                     '& .MuiDataGrid-root': {
//                         border: 'none',
//                     },
//                     '& .MuiDataGrid-cell': {
//                         borderBottom: `1px solid ${"blue"}`,
//                     },
//                     '& .MuiDataGrid-columnHeaders': {
//                         backgroundColor: "pink",
//                         borderBottom: `none`,
//                     },
//                     // Remove the overflowX: "hidden !important" rule
//                 }}
//             >
//                 <MuiDataGrid
//                     rows={rows}
//                     columns={columns}
                    
//                     // getRowId={getRowId}

//                     initialState={{
//                         pagination: {
//                             paginationModel: {
//                                 pageSize: 5,
//                             },
//                         },
//                     }}

//                     pageSizeOptions={[1, 2, 3]}
//                     // disableRowSelectionOnClick

//                     onRowSelectionModelChange={(newRowSelectionModel) => {
//                         setRowSelectionModel(newRowSelectionModel);

//                         payload(rows.findIndex(item => item.id === newRowSelectionModel[0]), newRowSelectionModel[0]);
//                     }}
//                     rowSelectionModel={rowSelectionModel}
              
                    
//                     sx={{
//                         width: 'fit-content', // Ensure the grid takes up the necessary width
//                         minWidth: '100%', // Ensure it at least takes up the full width of the parent
//                     }}
//                     slots={{
//                         toolbar: DataGridCustomToolbar
//                     }}
//                 />
//             </Box>
//         </>
//     );
// };

// export default DataGrid;
