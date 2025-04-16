// Define columns based on the mongoose schema for sites
export const SiteDataGridColumns = [
    /* {
        field: 'id',
        headerName: 'ID',
        width: 90,
        hide: true
    }, // Consider hiding the ID column as it is mostly for internal use */
    {
        field: 'siteName',
        headerName: 'Site Name',
        // flex: 1, // This column will grow and shrink
        minWidth: 150, // Minimum width to ensure readability
        editable: true,
    },
    {
        field: 'siteDetails',
        headerName: 'Site Details',
        // flex: 1, // This column will grow and shrink
        minWidth: 200, // Minimum width to ensure readability
        editable: true,
    },
    {
        field: 'siteAddress',
        headerName: 'Site Address',
        // flex: 1, // This column will grow and shrink
        minWidth: 200, // Minimum width to ensure readability
        editable: true,
    },
    {
        field: 'siteCity',
        headerName: 'Site City',
        width: 150, // Fixed width for this column
        editable: true,
    },
    {
        field: 'siteType',
        headerName: 'Site Type',
        width: 120, // Fixed width for this column
        type: 'singleSelect',
        valueOptions: ['Simple', 'Complex'],
        editable: true,
    },
    {
        field: 'siteStatus',
        headerName: 'Site Status',
        width: 120, // Fixed width for this column
        type: 'singleSelect',
        valueOptions: ['Active', 'Inactive', 'OnHold'],
        editable: true,
    },
    /* {
        field: 'sitePrefix',
        headerName: 'Site Prefix',
        width: 120, // Fixed width for this column
        editable: true,
    },
    {
        field: 'siteContract',
        headerName: 'Contract ID', // Or a more descriptive header
        width: 150, // Fixed width for this column
        editable: false,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 180, // Fixed width for this column
        type: 'dateTime',
        editable: false,
        valueGetter: (params) => {
            return new Date(params.row.createdAt);
        }
    },
    {
        field: 'updatedAt',
        headerName: 'Updated At',
        width: 180, // Fixed width for this column
        type: 'dateTime',
        editable: false,
        valueGetter: (params) => {
            return new Date(params.row.updatedAt);
        }
    } */
];
