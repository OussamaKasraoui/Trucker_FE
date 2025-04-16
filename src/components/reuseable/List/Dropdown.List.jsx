import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

const DropdownList = ({ payload, sx, list = [], selected = null, label = "Select", name = "select", valueKey = "id", displayKey = "name" }) => {

    const handleChange = (event) => {
        event.preventDefault();
        const selectedIndex = list.findIndex(item => item[valueKey] === event.target.value);
        const selectedItem = list[selectedIndex][valueKey];

        if (selectedItem && payload) {
            payload(selectedIndex, selectedItem);
        }
    };

    // Determine the selected value based on the selected prop
    const selectedValue = React.useMemo(() => {
        if (selected === null || selected === undefined) return '';

        // If selected is an index
        if (typeof selected === 'number') {
            return list[selected]?.[valueKey] ?? '';
        }

        // If selected is an ID (or valueKey)
        const foundIndex = list.findIndex(item => item[valueKey] === selected);
        return foundIndex !== -1 ? list[foundIndex][valueKey] : '';
    }, [list, selected, valueKey]);

    // selectedValue();

    return (
        <FormControl
            fullWidth
            size="small"
            margin="dense"
            sx={[{
                // backgroundColor: "lightblue",
            }, ...(Array.isArray(sx) ? sx : [sx])]}
        >
            <InputLabel id={`${name}-label`}>{label}</InputLabel>

            <Select
                labelId={`${name}-label`}
                name={name}
                id={name}
                value={selectedValue}
                label={label}
                onChange={handleChange}
            >
                {list.map((item, index) => (
                    <MenuItem
                        key={item[valueKey] || index}
                        value={item[valueKey]}
                    >
                        {item[displayKey]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default DropdownList;

// import React from 'react';
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from '@mui/material';

// const DropdownList = ({ payload, list, selected, sx, label = "Select", name = "select" }) => { 

//     function handleChange(event) {
//         console.log("value of event.target.value: ", event.target.value);
//         console.log("value of list: ", list);
//         console.log("value of selected: ", selected);

//         payload(event.target.value);
//     }

//     // Determine the selected value, defaulting to '' if not found
//     const selectedValue = list?.[selected]?.id ?? ''; // Use optional chaining and nullish coalescing

//     return (<FormControl
//         fullWidth
//         size="small"
//         margin="dense"
//         sx={[{
//             // backgroundColor: "lightblue",
//         }, sx]}
//     >
//         {/* Use the label prop */}
//         <InputLabel id={`${name}-label`}>{label}</InputLabel>

//         <Select
//             labelId={`${name}-label`}
//             name={name} 
//             id={name} 
//             value={selectedValue}
//             label={label} 
//             onChange={handleChange}
//         >

//             {
//                 Array.isArray(list) && list.map((item, index) => (
//                     // Use item.id as key if it's unique, otherwise fallback to index carefully
//                     <MenuItem key={item.id} value={index} selected={selectedValue === item.id}>
//                         {item.name}
//                     </MenuItem>
//                 ))
//             }
//         </Select>
//     </FormControl>)
// }

// export default DropdownList;
