import React                          from "react";
import { useNavigate, 
         useOutletContext,
         useLocation  }               from 'react-router-dom';
import { useDispatch, 
         useSelector}                 from 'react-redux'
import { useTranslation }             from 'react-i18next';
import axios                          from "axios";
import { DataGrid }                   from "@mui/x-data-grid";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
}                                     from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
}                                     from "@mui/material";
import BreakdownChart                 from "@components/BreakdownChart";
import OverviewChart                  from "@components/OverviewChart";
import StatBox                        from "@components/StatBox";
import FlexBetween                    from "@components/FlexBetween";
import Header                         from "@components/Header";
import {  setStateUser,
          setStateContractor,
          setStateStaff,
          setStateToken,
          setStateContracts,
          setStateContexts }           from "@states/slices/auth";

import http                           from '@services/user.service';
import authService                    from "@services/auth.service";
import { useAuth }                    from "@services/useAuth";
import useAxiosErrorHandler           from '@services/useAxiosErrorHandler'

const Dashboard = (props) => {
  const { t, i18n }             = useTranslation("login");
  const theme                   = useTheme();
  const outletContext           = useOutletContext();
  const location                = useLocation();
  const { handleAxiosError }    = useAxiosErrorHandler();

  const navigate                = useNavigate();
  const dispatch                = useDispatch();

  const isMobile                = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet                = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium                = useMediaQuery(theme.breakpoints.down('md'));
  const isNonMediumScreens      = useMediaQuery("(min-width: 1200px)");
    
  // const [redirect, setRedirect]           = React.useState(outletContext.redirect);
  const [renderCount, setRenderCount]     = React.useState(1);

  const { user, setUser, 
          token, setToken,
          locale, setLocale,
          menu, setMenu }       = useAuth();


  React.useEffect(() => {
    
    console.log(`\n\n=====> this is Dashboard --> renders : ${renderCount}`);
    setRenderCount((prevCount) => prevCount + 1);

    // const controller = axios.CancelToken.source();
    

    // const executeCheck = async () => {
    //   try {
    //     const result = await outletContext.initialCheck("context", controller);

    //     if (result) {
    //       if (result?.redirect.to !== location.pathname) {
    //         outletContext.setRedirect(result.redirect);  // Update redirect state
    //       }
    //     }

    //     outletContext.setLoaded(true)
    //   } catch (err) {
    //     console.error('\n\n=====> Dashboard --> check() --> error', err);
    //     handleAxiosError(err, {}, "dashboard", outletContext, t, () => {})
    //   }
    // };

    if (!token || !user || 
        user.userStatus !== "Active" ||
        !outletContext.loaded
      ) {
      // executeCheck();
      outletContext.setLoaded(false)
      return;
    }

    // if (!outletContext.loaded) {
    //   executeCheck();
    // }

    // return () => {
    //   console.log(`\n\n=====> LayoutUser --> Unmouts : ${renderCount}`)
    //   console.log("=====> LayoutUser: Cancelling previous request");
    //   controller.cancel("LayoutUser: Cancelling previous request");
    // };
    
  }, [/* outletContext, dispatch, location.pathname */]);


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box 
      className="aqua"
      justifyItems={"center"}
      sx={{
          width: "100%",
      }}
    >    
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          <Box>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlined sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </FlexBetween>

        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
          sx={{
            "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
          }}
        >
          {/* ROW 1 */}
          <StatBox
            title="Total Customers"
            // value={data && data.totalCustomers}
            increase="+14%"
            description="Since last month"
            icon={
              <Email
                sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
              />
            }
          />

          <StatBox
            title="Sales Today"
            // value={data && data.todayStats.totalSales}
            increase="+21%"
            description="Since last month"
            icon={
              <PointOfSale
                sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
              />
            }
          />

          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
            p="1rem"
            borderRadius="0.55rem"
          >
            <OverviewChart view="sales" isDashboard={true} />
          </Box>

          <StatBox
            title="Monthly Sales"
            // value={data && data.thisMonthStats.totalSales}
            increase="+5%"
            description="Since last month"
            icon={
              <PersonAdd
                sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
              />
            }
          />

          <StatBox
            title="Yearly Sales"
            // value={data && data.yearlySalesTotal}
            increase="+43%"
            description="Since last month"
            icon={
              <Traffic
                sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
              />
            }
          />

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 3"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary.lighter,
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary.lighter,
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary.lighter} !important`,
              },
            }}
          >
            <DataGrid
              loading={ true } //isLoading || !data}
              getRowId={(row) => row._id}
              rows={[]} //(data && data.transactions) || []}
              columns={columns}
            />
          </Box>

          <Box
            gridColumn="span 4"
            gridRow="span 3"
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
          >
            <Typography variant="h6" sx={{ color: theme.palette.secondary.lighter }}>
              Sales By Category
            </Typography>
            <BreakdownChart isDashboard={true} />
            <Typography
              p="0 0.6rem"
              fontSize="0.8rem"
              sx={{ color: theme.palette.secondary.lighter }}
            >
              Breakdown of real states and information via category for revenue
              made for this year and total sales.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;