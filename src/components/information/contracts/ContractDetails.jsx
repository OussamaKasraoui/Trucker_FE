import React, 
       { useEffect, useState }  from 'react';
import { useTranslation }       from "react-i18next";
import { useDispatch, 
         useSelector }          from 'react-redux';
import { Grid, Box, Typography, 
         useMediaQuery, 
         FormControl, InputLabel, 
         Select, MenuItem, Divider,
         Table, TableBody, TableCell, 
         TableContainer, TableHead, 
         TableRow, Paper }      from '@mui/material';
import authService              from "@services/auth.service";
import AgreementServicesTable   from '@components/information/services/servicesTable'
import dayjs                    from 'dayjs';


const ContractDetails = ({ values, theme, t, name, information }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [contracts, setContracts] = useState(values);

    // useEffect(() => {
    //     console.log(`\n\n=====> ContractSetup`);
    
    //     if (Array.isArray(contracts) && !contracts.length) {
    //         const cachedContexts = authService.getCacheContexts();
    //         const cachedContracts = cachedContexts[cachedContexts.findIndex((element) => element.context === "contracts")];

    //         if (cachedContracts) {
    //             setContracts(cachedContracts?.values);
    //         }
    //     } 
    // }, []);

    return (
        <>
            <Grid textAlign={"-webkit-center"} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Typography variant="informationSecondary">ContractDetails</Typography>
                {/* <Typography variant="informationSecondary">{values?.body}</Typography>
                <Typography variant="informationSecondary">{values?.header}</Typography> */}

                {contracts?.map((contract, index) => (
                    <ContractItem 
                        key={index} 
                        contract={contract} 
                        isSmallScreen={isSmallScreen} 
                        theme={theme} 
                    />
                ))}

                {/* <Typography variant="informationSecondary">{values?.footer}</Typography> */}
            </Grid>
        </>
    );
};

const ContractItem = ({ contract, isSmallScreen, theme }) => {
    const { t, i18n } = useTranslation('contracts');
    const loggedUser                          = useSelector((state) => state.auth.user)

    const latestAgreementIndex = contract.contractAgreements.length - 1;
    
    const [selectedAgreementIndex, setSelectedAgreementIndex] = useState(latestAgreementIndex);

    const handleAgreementChange = (event) => {
        setSelectedAgreementIndex(event.target.value);
    };

    const selectedAgreement = contract.contractAgreements[selectedAgreementIndex];

    return (
        <Box
            className='yellow'
            width={isSmallScreen ? "95%" : "90%"}
            display="block" //{isSmallScreen ? "block" : "flex"}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={theme.palette.background.dark} // # Done
            sx={{
                borderRadius: "10px",
                padding: "20px",
                margin: "10px 0px",
                // borderColor: "silver",
                // borderStyle: "solid",
                // borderWidth: "1px",
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
            }}
        >

            <Box /* sx={{ my: 1 }}*/ className="red" >

                {/* Contract Header Information */}
                <Grid 
                    // className='red'
                    container 
                    spacing={1} 
                    columns={12} 
                    direction="row" 
                    justifyContent="center" 
                    alignItems="center" 
                    // minHeight={100} 
                    margin={0} 
                    width={"auto"}
                    my={1}
                >

                    {/* Contract Agreements Dropdown */}
                    <FormControl fullWidth>
                        <InputLabel id="agreement-select-label">{t("availableAgreement")}</InputLabel>
                        <Select
                            labelId="agreement-select-label"
                            id="agreement-select"
                            value={selectedAgreementIndex}
                            onChange={handleAgreementChange}
                            label={t("availableAgreement")}
                        >
                            {contract.contractAgreements.map((agreement, idx) => (
                                <MenuItem key={idx} value={idx}>
                                    <Box
                                        display="flex" // Flexbox to arrange content horizontally
                                        justifyContent="space-between" // Space between label and value
                                        width="100%" // Ensure full width
                                    >
                                        {/* Contractor Label */}
                                        <Typography fontWeight="bold" textAlign="left">
                                            { selectedAgreement?.agreementTerm }
                                        </Typography>
                                        
                                        {/* Contractor Title */}
                                        <Typography textAlign="right" noWrap>
                                            { dayjs(selectedAgreement?.agreementStart).get('year') } - { dayjs(selectedAgreement?.agreementEnd).get('year') } 
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Agreement Contractor */}
                    <Grid item xs={5} sm={8} md={8} /* className='green' */>
                        <Typography textAlign={"start"} fontWeight="bold">{t('contractContractor')}</Typography>
                    </Grid>

                    <Grid item xs={7} sm={4} md={4} /* className='yellow' */>
                        <Typography textAlign={"end"} >
                            {
                            contract?.contractContractor?.contractorUser === loggedUser.id ?
                            `${loggedUser.userFirstName} ${loggedUser.userLastName}`.toUpperCase():
                            contract?.contractContractor.contractorTitle || t("NoContractorInformation")
                        }
                        </Typography>
                    </Grid>

                    {/* Agreement Budget */}
                    <Grid item xs={8} sm={8} md={8} /*className='green'*/>
                        <Typography textAlign={"start"} fontWeight="bold">{t('agreementBudget')}</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4} /*className='yellow'*/>
                        <Typography textAlign={"end"} noWrap>{selectedAgreement?.agreementBudget || t("NoAgreementBudget")}</Typography>
                    </Grid>

                    {/* Agreement Status */}
                    <Grid item xs={8} sm={8} md={8} /*className='green'*/>
                        <Typography textAlign={"start"} fontWeight="bold">{t('contractStatus')}</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={4} /*className='yellow'*/>
                        <Typography textAlign={"end"} noWrap>{contract?.contractStatus || t("NoAgreementBudget")}</Typography>
                    </Grid>


                    {/* Contractor
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography textAlign={"end"} fontWeight="bold">Contractor:</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <Typography noWrap>{contract?.contractContractor?.contractorTitle || "No contractor title"}</Typography>
                    </Grid> */}

                    {/* Contract Creator
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography textAlign={"end"} fontWeight="bold">Contract Creator:</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <Typography noWrap>{contract?.contractCreator?.name || "No contract creator"}</Typography>
                    </Grid> */}

                    {/* Contract Status 
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography textAlign={"end"} fontWeight="bold">Contract Status:</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <Typography noWrap>{contract?.contractStatus ? "Active" : "Inactive"}</Typography>
                    </Grid>*/}
                </Grid>
            </Box>


            {/* Selected Agreement Details */}
            <Grid item xs={12} my={2}>
                <Divider textAlign={/* i18n.dir() === "ltr" ? "left" : "right" */ "center"}> {t("agreementDetails")} </Divider>
            </Grid>

            <Box /* sx={{ my: 1 }}*/ className="red" >
                <Grid container spacing={1}>

                    {/* Agreement Type */}
                    <Grid item xs={5}>
                        <Typography textAlign={"end"} fontWeight="bold">{ t("greementType")}:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography textAlign={"center"}>{selectedAgreement?.agreementTerm}</Typography>
                    </Grid>

                    {/* Agreement Start & End Dates */}
                    <Grid item xs={5}>
                        <Typography textAlign={"end"} fontWeight="bold">{t("agreementStartDate")}:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography textAlign={"center"}>{dayjs(selectedAgreement?.agreementStart).format('DD - MM - YYYY')}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign={"end"} fontWeight="bold">{t("agreementEndDate")}:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                    <Typography textAlign={"center"}>{dayjs(selectedAgreement?.agreementEnd).format('DD - MM - YYYY')}</Typography>
                        {/* <Typography>{selectedAgreement?.agreementEnd}</Typography> */}
                    </Grid>
                </Grid>
            </Box>


            {/* Selected Agreement Members */}
            <Grid item xs={12} my={2}>
                <Divider textAlign={/* i18n.dir() === "ltr" ? "left" : "right" */ "center"}> {t("agreementBoardMembers")} </Divider>
            </Grid>

            <Box /* sx={{ my: 1 }}*/ className="red" >
                <Grid container spacing={1}>


                    {/* Agreement Members.Syndic */}
                    <Grid item xs={5}>
                        <Typography textAlign={"end"} fontWeight="bold">Syndic:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography textAlign={"center"}>{selectedAgreement?.agreementBoardMembers?.syndic?.name || "No syndic"}</Typography>
                    </Grid>

                    {/* Agreement Members.Adjoint */}
                    <Grid item xs={5}>
                        <Typography textAlign={"end"} fontWeight="bold">Adjoint:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography textAlign={"center"}>{selectedAgreement?.agreementBoardMembers?.adjoint?.name || "No adjoint"}</Typography>
                    </Grid>

                    {/* Agreement Members.Tresorier */}
                    <Grid item xs={5}>
                        <Typography textAlign={"end"} fontWeight="bold">Tresorier:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography textAlign={"center"}>{selectedAgreement?.agreementBoardMembers?.tresorier?.name || "No tresorier"}</Typography>
                    </Grid>

                    {/* Agreement Members.List of Members */}
                    <Grid item xs={5}>
                        <Typography textAlign={"end"} fontWeight="bold">Members:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        {/* Map over the members array and display each member's name */}
                        {selectedAgreement?.agreementBoardMembers?.members?.length > 0 ? (
                            selectedAgreement.agreementBoardMembers.members.map((member, index) => (
                                <Typography textAlign={"center"} key={index}>
                                    {member.name || `Member ${index + 1}`}
                                </Typography>
                            ))
                        ) : (
                            <Typography>No members</Typography>
                        )}
                    </Grid>
                    
                </Grid>
            </Box>


            {/* Selected Agreement Members */}
            <Grid item xs={12} my={2}>
                <Divider textAlign={/* i18n.dir() === "ltr" ? "left" : "right" */ "center"}> {t("agreementServices")} </Divider>
            </Grid>

            <Box /* sx={{ my: 1 }}*/ className="red" >
                <Grid container spacing={1} sx={{ margin: '0px', padding: '0px', width: "auto" }}>
                    <AgreementServicesTable agreementServices={selectedAgreement.agreementServices} theme={theme} />
                </Grid>
            </Box>
        </Box>
    );
};

export default ContractDetails;
