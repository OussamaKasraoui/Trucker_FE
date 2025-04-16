import React, { Suspense, lazy } from 'react';
import { Outlet, useLocation, useNavigate, useOutletContext, } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import axios  from "axios";
import { Typography, useTheme } from '@mui/material';
import loadable from '@loadable/component';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import NotFound from "./../notfound";
import http from '@services/auth.service';
import useAxiosErrorHandler from '@services/useAxiosErrorHandler';
import Loading from "./../Loading.Component";


// Utility function to dynamically load components
const loadComponent = (context, name) => {
    try {
        console.log(`Loading component: ./components/information/${context}/${name}.jsx`);
        return loadable(() => import(`./${context}/${name}.jsx`));

        // lazy(() => import(`./${context}/${name}.jsx`));
    } catch (error) {
        console.error("Component loading failed:", error);
        return NotFound;
    }
};

// AsyncPage moved outside the main component
const AsyncPage = ({ context, name, values, display, indexDisplay }) => {
    const Component = loadComponent(context, name);
    return <Component values={values} display={display} indexDisplay={indexDisplay} />;
};

const Information = ({ context, buttons, payload, lengthContext, indexContext, activeContext, from }) => {
    const theme = useTheme();
    const outletContext = useOutletContext();
    const { t } = useTranslation(["users", "contractors"]);
    const packName = useSelector((state) => state.auth.user.userPack.packName);
    const { handleAxiosError } = useAxiosErrorHandler();

    const [information, setInformation] = React.useState(context.information || {});
    const [action, setAction] = React.useState(context.information.action || []);
    const [done, setDone] = React.useState(context.done || false);
    const [display, setDisplay] = React.useState(context.display || []);

    /* in case all the objects inside display state have a key called done set to true loaded should be true, otherwise false */
    const [loaded, setLoaded] = React.useState(
        display.reduce((acc, curr) => {
            acc[curr.context] = curr.done || false;
            return acc;
        }, {})
    );

    // Derived state to check if all fields in loaded are true
    const allLoaded = React.useMemo(() => {
        return Object.values(loaded).every(value => value === true);
    }, [loaded]);

    // Function will be passed to child components to set a specific context as loaded (true)
    const markAsLoaded = (context) => {
        setLoaded(prev => ({
            ...prev,
            [context]: true
        }));
    };

    const query = useQuery({
        queryKey: ["information"],
        queryFn: async () => {
            const controller = new AbortController();
            http.init(`/${packName}/${information.context}`.toLowerCase());
            return await http.getXATdata(information.context, information.action, [], controller, {});
        },
        enabled: false,
    });

    const mutation = useMutation({
        mutationKey: information.context,
        mutationFn: ({ values, formik }) => { },
        onMutate: () => ({ name: information.context }),
        onError: (error, { values, formik }) => { handleAxiosError(error, formik, information.context, outletContext, t, () => { }); },
        onSuccess: (data, { values, formik }) => { },
    });


    return (
        <>

            {/* Suspense with fallback, showing detailed message */}
            <Suspense fallback={<div>Loading Information... Please ensure the component path is correct.</div>}>
                {
                    // Map through values if it's an array
                    Array.isArray(display) && display?.map((infoDisplay, indexDisplay) => {
                        try {

                            return (<AsyncPage
                                key={indexDisplay}
                                indexDisplay={indexDisplay}

                                context={infoDisplay.context}
                                name={infoDisplay.name}

                                values={infoDisplay.values}
                                display={infoDisplay}
                                payload={(informationPayload) => {}}
                            />)

                        } catch (error) {
                            console.warn(`Failed to load component "${infoDisplay}":`, error);
                            return null; // Safely ignore if the component import fails
                        }
                    })
                }
            </Suspense>

            {
                buttons && buttons(query.refetch, 0, done, information.context, indexContext, action, lengthContext, mutation.isPending || query.isFetching, t)

            }
        </>
    );
};

export default Information;


const context = {
    "name": "ContractDetails",
    "context": "information",
    "display": [
        {
            "name": "Profile",
            "context": "contractors",
            "information": {
                "context": "contractors",
                "title": "SiteSetupUndoneTitle",
                "header": "SiteSetupUndoneHeader",
                "body": "SiteSetupUndoneBody",
                "footer": "SiteSetupUndoneFooter"
            },
            "values": [
                {
                    "contractorTitle": "kasraouioussama@gmail.com",
                    "contractorType": "Natural",
                    "contractorStatus": "Active",
                    "contractorRoles": [
                        "67b744ac5c2fcaadf8414993"
                    ],
                    "contractorPhone": "0669929220",
                    "contractorNumRC": "67b746c45c2fcaadf841499b",
                    "contractorNumPatente": "67b746c45c2fcaadf841499b",
                    "contractorNumICE": "67b746c45c2fcaadf841499b",
                    "createdAt": "2025-02-20T15:14:13.696Z",
                    "updatedAt": "2025-02-20T15:14:13.696Z",
                    "contractorUser": "Oussama KASRAOUI",
                    "id": "67b746c45c2fcaadf841499c"
                }
            ],
            "bulk": false,
            "dependency": [
                {
                    "userRef": {
                        "reference": {
                            "id": null,
                            "name": "some",
                            "type": "thing"
                        },
                        "referrer": null
                    },
                    "userStatus": "OnHold",
                    "userRoles": [
                        "67b744ac5c2fcaadf8414997"
                    ],
                    "userEmail": "kasraouioussama@gmail.com",
                    "userPhone": "0669929220",
                    "userAddress": "Guich Oudaya",
                    "id": "67b746c45c2fcaadf841499b",
                    "name": "Oussama Kasraoui",
                    "userFirstName": "Oussama",
                    "userLastName": "Kasraoui",
                    "userPack": {
                        "packOptions": {
                            "support": true,
                            "contracts": 1,
                            "agreements": 5,
                            "sites": 1,
                            "buildings": 12,
                            "apartments": 6,
                            "staff": 0,
                            "features": [
                                {
                                    "type": "Mixed"
                                }
                            ]
                        },
                        "packPrice": {
                            "discount": 0,
                            "price": 100
                        },
                        "packContexts": [
                            "users",
                            "contractors",
                            "staff",
                            "contracts",
                            "agreements",
                            "services",
                            "tasks",
                            "sites",
                            "buildings",
                            "apartments",
                            "commonAreas",
                            "invoices",
                            "reports"
                        ],
                        "packName": "Syndicate",
                        "packType": "Basic",
                        "packStatus": "Active",
                        "packDesc": [
                            {
                                "DOM": "p",
                                "text": "Descriptions goes here",
                                "_id": "67b744a85c2fcaadf8414639"
                            }
                        ],
                        "id": "67b744a85c2fcaadf8414638"
                    }
                }
            ],
            "done": true,
            "action": [
                "read"
            ]
        },
        {
            "name": "Profile",
            "context": "sites",
            "information": {
                "context": "sites",
                "title": "SiteSetupUndoneTitle",
                "header": "SiteSetupUndoneHeader",
                "body": "SiteSetupUndoneBody",
                "footer": "SiteSetupUndoneFooter"
            },
            "values": [
                [
                    {
                        "siteType": "Simple",
                        "siteStatus": "OnHold",
                        "siteName": "oasis",
                        "siteDetails": "Residence fermée ",
                        "siteAddress": "Guich oudayas 617",
                        "siteCity": "temara",
                        "sitePrefix": "Oss",
                        "createdAt": "2025-02-20T15:15:01.754Z",
                        "updatedAt": "2025-02-20T15:15:01.754Z",
                        "id": "67b746f55c2fcaadf8414a32",
                        "name": "oasis",
                        "siteContract": {
                            "contractContractors": [
                                "67b746c45c2fcaadf841499c"
                            ],
                            "contractAgreements": [],
                            "contractStatus": "OnHold",
                            "contractUser": "67b746c45c2fcaadf841499b",
                            "id": "67b746c55c2fcaadf84149a5"
                        }
                    }
                ]
            ],
            "bulk": false,
            "dependency": [
                {
                    "users": "67b746c45c2fcaadf841499b",
                    "contractors": "67b746c45c2fcaadf841499c",
                    "contracts": "67b746c55c2fcaadf84149a5",
                    "sites": "67b746c55c2fcaadf84149a5",
                    "buildings": "67b746c55c2fcaadf84149a5",
                    "apartments": "67b746c55c2fcaadf84149a5"
                }
            ],
            "done": true,
            "action": [
                "read"
            ]
        },
        {
            "name": "Profile",
            "context": "buildings",
            "information": {
                "context": "buildings",
                "title": "SiteSetupUndoneTitle",
                "header": "SiteSetupUndoneHeader",
                "body": "SiteSetupUndoneBody",
                "footer": "SiteSetupUndoneFooter"
            },
            "values": [
                [
                    {
                        "buildingStatus": "OnHold",
                        "buildingName": "imm 102",
                        "buildingPrefix": "bld2",
                        "buildingFloors": 5,
                        "buildingAptPerFloor": 3,
                        "buildingAddress": "Guich oudayas 617",
                        "buildingContract": "67b746c55c2fcaadf84149a5",
                        "createdAt": "2025-02-20T15:15:16.445Z",
                        "updatedAt": "2025-02-20T15:15:16.445Z",
                        "parent": {
                            "buildingSite": {
                                "siteType": "Simple",
                                "siteStatus": "OnHold",
                                "siteName": "oasis",
                                "siteDetails": "Residence fermée ",
                                "siteAddress": "Guich oudayas 617",
                                "siteCity": "temara",
                                "sitePrefix": "Oss",
                                "siteContract": "67b746c55c2fcaadf84149a5",
                                "id": "67b746f55c2fcaadf8414a32",
                                "name": "oasis"
                            }
                        },
                        "id": "67b747045c2fcaadf8414a3a",
                        "name": "imm 102",
                        "buildingSite": "oasis"
                    }
                ]
            ],
            "bulk": false,
            "dependency": [
                {
                    "users": "67b746c45c2fcaadf841499b",
                    "contractors": "67b746c45c2fcaadf841499c",
                    "contracts": "67b746c55c2fcaadf84149a5",
                    "sites": "67b746c55c2fcaadf84149a5",
                    "buildings": "67b746c55c2fcaadf84149a5",
                    "apartments": "67b746c55c2fcaadf84149a5"
                }
            ],
            "done": true,
            "action": [
                "read"
            ]
        },
        {
            "name": "Profile",
            "context": "apartments",
            "information": {
                "context": "apartments",
                "title": "SiteSetupUndoneTitle",
                "header": "SiteSetupUndoneHeader",
                "body": "SiteSetupUndoneBody",
                "footer": "SiteSetupUndoneFooter"
            },
            "values": [
                [
                    {
                        "apartmentType": "Property",
                        "apartmentStatus": "Inactive",
                        "apartmentNumber": 4,
                        "apartmentEtage": 2,
                        "apartmentSite": "67b746f55c2fcaadf8414a32",
                        "apartmentContract": "67b746c55c2fcaadf84149a5",
                        "createdAt": "2025-02-20T15:15:37.934Z",
                        "updatedAt": "2025-02-20T15:15:37.934Z",
                        "parent": {
                            "apartmentBuilding": {
                                "buildingStatus": "OnHold",
                                "buildingName": "imm 102",
                                "buildingPrefix": "bld2",
                                "buildingFloors": 5,
                                "buildingAptPerFloor": 3,
                                "buildingAddress": "Guich oudayas 617",
                                "buildingSite": "67b746f55c2fcaadf8414a32",
                                "buildingContract": "67b746c55c2fcaadf84149a5",
                                "createdAt": "2025-02-20T15:15:16.445Z",
                                "updatedAt": "2025-02-20T15:15:16.445Z",
                                "id": "67b747045c2fcaadf8414a3a",
                                "name": "imm 102"
                            },
                            "apartmentOwner": {
                                "userRef": {
                                    "reference": {
                                        "id": null,
                                        "name": "some",
                                        "type": "thing"
                                    },
                                    "referrer": null
                                },
                                "userStatus": "OnHold",
                                "userRoles": [
                                    "67b744ac5c2fcaadf8414997"
                                ],
                                "userFirstName": "Oussama",
                                "userLastName": "Kasraoui",
                                "userAddress": "Guich Oudaya",
                                "id": "67b746c45c2fcaadf841499b",
                                "name": "Oussama KASRAOUI"
                            },
                            "apartmentUser": {
                                "userRef": {
                                    "reference": {
                                        "id": null,
                                        "name": "some",
                                        "type": "thing"
                                    },
                                    "referrer": null
                                },
                                "userStatus": "OnHold",
                                "userRoles": [
                                    "67b744ac5c2fcaadf8414997"
                                ],
                                "userFirstName": "Oussama",
                                "userLastName": "Kasraoui",
                                "userAddress": "Guich Oudaya",
                                "id": "67b746c45c2fcaadf841499b",
                                "name": "Oussama KASRAOUI"
                            }
                        },
                        "id": "67b747195c2fcaadf8414a42",
                        "name": 4,
                        "apartmentBuilding": "imm 102",
                        "apartmentOwner": "Oussama KASRAOUI",
                        "apartmentUser": "Oussama KASRAOUI"
                    }
                ]
            ],
            "bulk": false,
            "dependency": [
                {
                    "users": "67b746c45c2fcaadf841499b",
                    "contractors": "67b746c45c2fcaadf841499c",
                    "contracts": "67b746c55c2fcaadf84149a5",
                    "sites": "67b746c55c2fcaadf84149a5",
                    "buildings": "67b746c55c2fcaadf84149a5",
                    "apartments": "67b746c55c2fcaadf84149a5"
                }
            ],
            "done": true,
            "action": [
                "check"
            ]
        },
        {
            "name": "SiteShare",
            "context": "sites",
            "information": {
                "context": "sites",
                "title": "SiteSetupUndoneTitle",
                "header": "SiteSetupUndoneHeader",
                "body": "SiteSetupUndoneBody",
                "footer": "SiteSetupUndoneFooter"
            },
            "values": [
                {
                    "url": "http://localhost:3000/register?packName=Syndicate&contractId=67b746c55c2fcaadf84149a5&referrer=67b746c45c2fcaadf841499b"
                }
            ],
            "bulk": false,
            "dependency": [
                {
                    "id": "67b746c45c2fcaadf841499c",
                    "name": "Syndicate"
                }
            ],
            "done": true,
            "action": [
                "check"
            ]
        }
    ],
    "information": {
        "action": [
            "check"
        ],
        "context": "sites",
        "title": "SiteSetupUndoneTitle",
        "header": "SiteSetupUndoneHeader",
        "body": "SiteSetupUndoneBody",
        "footer": "SiteSetupUndoneFooter"
    },
    "done": true
};