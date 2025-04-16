import React from 'react';
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useTheme } from "@mui/material";
import http from '@services/user.service';
import { setStateUser } from "@states/slices/auth";
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from './FlexBetween';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

import { useQuery, useMutation } from '@tanstack/react-query';

import useAxiosErrorHandler from '@services/useAxiosErrorHandler';

export default function Pricing(props) {
  const { t, i18n } = useTranslation("pricing");
  const dispatch = useDispatch();
  const location = useLocation();
  const { handleAxiosError } = useAxiosErrorHandler();
  const outletContext = useOutletContext();
  const [loaded, setLoaded] = React.useState(false);
  const [packs, setPacks] = React.useState([]);
  const [annually, setAnnually] = React.useState(true);

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['packs'],
    queryFn: async () => {
      http.init(location.pathname);
      return await http.getAnonym('packs', '');
    },
    enabled: false,
  });

  const loggedUser = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const textColorSecondary = theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark;

  const content = {
    'badge': 'Find Your Fit',
    'header-p1': 'Discover the Perfect Package',
    'header-p2': 'Tailored for Your Needs',
    'description': 'Discover the SyndiKIT package that perfectly suits your needs! Whether you\'re an individual managing your own property, a company specializing in condominium management, or a third-party provider offering services like security, cleaning, or housekeeping, we have a solution tailored for you. Streamline your operations, boost efficiency, and enhance service delivery by choosing the right package. Let SyndiKIT help you achieve excellence in property management today!',
    'option1': 'Individual',
    'option2': 'Company',
    '01_title': 'For Individuals',
    '01_price': '$9',
    '01_suffix': ' / mo',
    '01_benefit1': 'Manage Your Property',
    '01_benefit2': 'Simple Oversight',
    '01_benefit3': 'Easy Access',
    '01_benefit4': 'Personalized Tools',
    '01_primary-action': 'Choose Individual Plan',
    '01_secondary-action': 'Learn More',
    '02_title': 'For Companies',
    '02_price': '$49',
    '02_suffix': ' / mo',
    '02_benefit1': 'Optimized for Management',
    '02_benefit2': 'Boost Efficiency',
    '02_benefit3': 'Advanced Features',
    '02_benefit4': 'Team Collaboration',
    '02_primary-action': 'Choose Company Plan',
    '02_secondary-action': 'Learn More',
    '03_title': 'For Service Providers',
    '03_price': '$499',
    '03_suffix': ' / mo',
    '03_benefit1': 'Streamline Operations',
    '03_benefit2': 'Enhance Service Delivery',
    '03_benefit3': 'Tailored Solutions',
    '03_benefit4': 'Maximize Efficiency',
    '03_primary-action': 'Choose Service Provider Plan',
    '03_secondary-action': 'Learn More',
    ...props.content
  };

  const backgroundColor = {
    Syndicate: "linear-gradient(180deg, #C5C5C5, #ECECEC)",
    SyndicateButton: "linear-gradient(180deg, #1B48BB, #4D77FF)",
    Contractor: "linear-gradient(180deg, #1B48BB, #4D77FF)",
    ContractorButton: "linear-gradient(180deg, #1B48BB, #4D77FF)",
    Premium: "linear-gradient(180deg, #CA6C00, #FFAE51)",
    PremiumButton: "linear-gradient(180deg, #CA6C00, #FFAE51)",
  };

  const ActionButton = styled(({ packName, ...other }) => <Button {...other} />)(({ theme, packName }) => {
    let backgroundColorGradient, hoverBackgroundGradient;

// Conditional colors based on packName
    switch (packName) {
      case 'Syndicate':
        backgroundColorGradient = backgroundColor.SyndicateButton;
        hoverBackgroundGradient = backgroundColor.Syndicate;
        break;
      case 'Contractor':
        backgroundColorGradient = backgroundColor.ContractorButton;
        hoverBackgroundGradient = backgroundColor.Contractor;
        break;
      case 'Premium':
        backgroundColorGradient = backgroundColor.PremiumButton;
        hoverBackgroundGradient = backgroundColor.Premium;
        break;
      default:
        backgroundColorGradient = theme.palette.primary.main;
        hoverBackgroundGradient = theme.palette.primary.light;
        break;
    }

    return {
      color: theme.palette.neutral.main,
      backgroundImage: backgroundColorGradient,
      '&:hover': {
        color: theme.palette.neutral.light,
        backgroundImage: hoverBackgroundGradient,
      },
    };
  });

  const searchParams = new URLSearchParams(location.search);
  const packName = searchParams.get('packName');
  const contractId = searchParams.get('contractId');

  const handleChange = (event) => {
    setAnnually(prevState => !prevState);
  };

  const userPack = (pack) => {
    dispatch(setStateUser({ ...loggedUser, userPack: pack }));
    props.setUser({ ...loggedUser, userPack: pack });

    if (location.pathname !== '/register') {
      outletContext.setRedirect({
        redirect: true,
        to: '/register'
      });
    } else {
      props.skip(false);
    }
  };

  React.useEffect(() => {
    const handleDataProcessing = (data) => {
      let packs = [];
      let preSelectedPack = {};

      data.data.data.forEach((element) => {
        if (element.packName === packName) {
          preSelectedPack = { packName: element.packName, id: element.id };
        }

        if (element.packStatus === 'Active') {
          packs.push({
            id: element.id,
            packName: element.packName,
            packPrice: element.packPriceDisc,
            packDesc: element.packDesc,
            packStatus: element.packStatus,
          });
        }
      });

      if (Object.keys(preSelectedPack).length) {
        userPack(preSelectedPack);
      } else {
        setPacks(packs);
      }
    };

    // Prevent logic execution during loadingif (isLoading) return; // Prevent logic execution during loading

    if (isError) {
      handleAxiosError(error, {}, "Pricing", outletContext, t, () => {});
      return;
    }

    if (!loaded) {
      refetch();
      setLoaded(true);
      return;
    }

    if (data && !data.error) {
      handleDataProcessing(data);
    }
  }, [data, isLoading, loaded]);

  return (
    <React.Fragment>
      <Box
        py={3}
        textAlign="center"
        minWidth={"100%"}
        backgroundColor={theme.palette.background.main}
      >
        <Stack
          direction="column"
          spacing={3}
          sx={{
            my: 0,
            mx: 0,
            py: 2,
            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
              lg: 6,
              xl: 25,
            },
          }}
        >
          <Typography variant="h2" component="div" style={{ color: textColorSecondary }}>{t("price_join")}</Typography>

          <Typography variant="h4" component="div" gutterBottom={true}>
            {t("price_invite", { app_name: t("app_name") })}
          </Typography>

          <Box display={"inline-flex"} justifyContent={"center"}>
            <Typography variant="subtitle1" style={{ color: textColorSecondary }}>{t("price_monthly")}</Typography>
            <Switch name="checkbox" color="primary" checked={annually} onChange={handleChange} />
            <Typography variant="subtitle1" style={{ color: textColorSecondary }}>{t("price_annually")}</Typography>
          </Box>

          <Grid container width={1}>
            <React.Fragment>
              {
                packs.map((pack, index) => (
                  <Grid item key={index} xs={12} md={4} sx={{ padding: 1 }}>
                    <Card
                      variant="outlined"
                      sx={{
                        display: {
                          xs: "block",
                          sm: "flex",
                          md: "block",
                          lg: "block",
                          xl: "block",
                        },
                        padding: 2,
                        borderRadius: 2,
                        textAlign: "center",
                        backgroundImage: backgroundColor[pack.packName],
                        color: "#fff",
                      }}
                    >
                      <CardContent
                        sx={{
                          width: 1,
                          py: 0,
                          paddingBottom: 0,
                          '&:last-child': {
                            paddingBottom: 0,
                          },
                          display: {
                            xs: "block",
                            sm: "flex",
                            md: "block",
                            lg: "block",
                            xl: "block",
                          },
                        }}
                      >
                        <Box minWidth={"35%"} px={1}>
                          <Typography
                            variant="h1"
                            component="div"
                            gutterBottom={true}
                            my={3}
                            fontSize={{
                              xs: "22px",
                              sm: "18px",
                              md: "20px",
                              lg: "12px",
                              xl: "12px"
                            }}
                          >
                            {pack.packName}
                          </Typography>

                          <Typography variant="h3" component="h2" gutterBottom={true} fontSize={48}>
                            {`${pack.packPrice}`}
                            <Typography variant="h6" color={theme.palette.secondary.main} component="span"> $/ {annually ? t('price_annually') : t('price_monthly')}</Typography>
                          </Typography>
                        </Box>

                        <Box minWidth={"35%"} px={1} sx={{ alignContent: "center" }}>
                          <Box sx={{ width: "100%" }}>
                            {
                              pack.packDesc.map((pck, id) => (
                                <Box key={id}>
                                  <Box display={"inline-flex"} justifyContent={"end"} alignItems={"center"} sx={{ width: "100%" }}>
                                    <CheckIcon />
                                    <Typography key={id} id={pck.id} variant="subtitle1" component={pck.DOM} sx={{ minWidth: "90%" }}>
                                      {pck.text}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))
                            }
                          </Box>

                          <Box justifyContent={"end"} alignItems={"center"} sx={{ width: "100%" }}>
                            <ActionButton
                              variant="outlined"
                              onClick={() => {
                                userPack({ packName: pack.packName, id: pack.id });
                                outletContext.setRedirect({
                                  redirect: true,
                                  to: "/register",
                                  replace: false,
                                });
                              }}
                              packName={pack.packName}
                              theme={theme}
                            >
                              {"Select plan"}
                            </ActionButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              }
            </React.Fragment>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
