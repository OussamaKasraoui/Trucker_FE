import React from 'react';
import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';
import { Typography, Box } from '@mui/material';
import FlexBetween from '@src/components/FlexBetween';

const List = ({ list, payload }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [renderCount, setRenderCount]         = React.useState(1);
  
    const handleListItemClick = (event, index, id) => {
        setSelectedIndex(index);
        payload(index, id);
    };

    React.useEffect(() => {
        setRenderCount((prevCount) => prevCount + 1);
        
        // return () => {
        //     // setSelectedIndex(0);
        // }
    }
    , []);

    React.useEffect(() => {
        setSelectedIndex(null); // Reset selectedIndex to 0 when list changes
    }, [list]);

    return (
        <>
            <Box
                className="indigo"
                sx={{
                    width: '100%', // Take up full width of the parent
                    overflow: 'auto', // Enable scrolling for both horizontal and vertical overflow

                    // backgroundColor: "lightblue",
                    // Remove the overflowX: "hidden !important" rule
                }}
            >
            {/* <h4>{`Selected Item : ${selectedIndex}.`}</h4>*/}
            {/* <h4>{`render count : ${renderCount}`}</h4>  */}
            
            <MuiList
                sx={{ width: '100%'}}
                aria-label="contacts"
            >
                {
                    list?.map((item, index) => (<>
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index, item.id)}
                            >
                                {

                                    (<ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>)
                                }

                                <ListItemText 
                                    inset 
                                    primary={item.name}
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            component="span"
                                            fontSize={14}
                                            fontWeight={400}
                                        >
                                            {index+" "+item.agreementTerm}
                                        </Typography>
                                    }

                                    secondaryTypographyProps={{ fontSize: 14 }}

                                    sx={{
                                        "& .MuiListItemText-root": {
                                            backgroundColor: "lightblue",
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                        {index < list.length - 1 && <Divider />}
                        </>
                    ))
                }
            </MuiList>
        </Box>
        </>
    );
}

export default List;