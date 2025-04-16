import React, { useState } from "react";
import { TextField, MenuItem, Box, InputAdornment, IconButton, Popper, Paper } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

const SearchWithFilters = ({ filters, onSearch }) => {
    // State for the search query and selected filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState(filters[0]?.value || "");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Media query to detect small screens
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (onSearch) {
            onSearch(event.target.value, selectedFilter); // Trigger callback with search and filter
        }
    };

    // Handle filter change
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        if (onSearch) {
            onSearch(searchQuery, event.target.value); // Trigger callback with updated filter
        }
    };

    // Toggle search visibility on small screens
    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    return (
        <Box display="flex" alignItems="center" gap={2}>
            {isSmallScreen ? (
                <>
                    {/* Search Icon */}
                    <IconButton onClick={toggleSearch}>
                        <Search />
                    </IconButton>

                    {/* Popper for Search and Filter */}
                    {isSearchOpen && (
                        <Popper open={isSearchOpen} placement="bottom-start">
                            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                                {/* Search Input */}
                                <TextField
                                    label="Search"
                                    variant="outlined"
                                    size="small"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsSearchOpen(true)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {/* Filter Dropdown */}
                                <TextField
                                    select
                                    label="Filter"
                                    value={selectedFilter}
                                    onChange={handleFilterChange}
                                    size="small"
                                    sx={{ minWidth: 150 }}
                                >
                                    {filters.map((filter) => (
                                        <MenuItem key={filter.value} value={filter.value}>
                                            {filter.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* Close Button */}
                                <IconButton onClick={toggleSearch}>
                                    <Close />
                                </IconButton>
                            </Paper>
                        </Popper>
                    )}
                </>
            ) : (
                <>
                    {/* Filter Dropdown */}
                    <TextField
                        select
                        label="Filter"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        size="small"
                        sx={{ minWidth: 150 }}
                    >
                        {filters.map((filter) => (
                            <MenuItem key={filter.value} value={filter.value}>
                                {filter.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Search Input */}
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default SearchWithFilters;