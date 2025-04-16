// color design tokens export
export const tokensDark = {
  neutral: {
    100: "#FFFFFF",                              // "#ffffff",           // "",
    200: "#FBFBFB",                              // "##EFEFEF",           // "#DCDCDC",
    300: "#F7F7F7",                              // "##e5e5e5",           // "#DBDBDB",
    400: "#F3F3F3",                              // '##bdbdbd',           // '#D7D7D7'
    500: "#EFEFEF",                              // "##808080",           // "#808080",
    600: "#e5e5e5",                              // "##5c5c5c",           // "#5c5c5c",
    700: "#bdbdbd",                              // "##333333",           // "#333333",
    800: "#333333",                              // "##2b2b2b",           // "#2b2b2b",
    900: "#2b2b2b",                              // "#000000",           // "#2b2b2b",
  },
  primary: {
    // blue
    100:  "#e0e0e0",                     // "#FFFFFF",            // "#ffffff", // manually adjusted
    200:  "#1F3A5F",                     // "#e0e0e0",            // "#E9E9E9", // manually adjusted f6f6f6
    300:  "#1F3A5F",                     // "#cee8ff",            // "#7a7f9d", // manually adjusted
    400:  "#2E5BA7",                     // "#acc2ef",            // "#4754A2",
    500:  "#0F1C2E",  //                 // "#4d648d",            // "#6D77D1", // 2E3673
    600:  "#1f2b3e",  //                 // "#3D5A80",            // "#4552C4",
    700:  "#101E35",                     // "#1F3A5F",            // "#2E30A9",
    800:  "#0F1C2E",                     // "#374357",            // "#2E3673",
    900:  "#0F1C2E",                     // "#374357",            // "#2E3673",
  },
  secondary: {
    // yellow
    100:  "#ffe169",                              // "#ffffff",            // "#ffffff", // manually adjusted
    200:  "#fad643",                              // "#ffe3a3",            // "#f0f0f0", // manually adjusted
    300:  "#dbb42c",                              // "#F6DB71",            // "#fff6e0",
    400:  "#c9a227",                              // "#FFA500",            // "#ffedc2",
    500:  "#ffa500",                              // "#dd8900",            // "#ffe3a3",
    600:  "#dd8900",                              // "#885400",            // "#ffda85",
    700:  "#9D7E1E",                              // "#997d3d",            // "#ffd166",
    800:  "#6C540C",                              // "#665429",            // "#cca752",
    900:  "#6C540C",                              // "#665429",            // "#cca752",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// export const themeSettings = (mode, dir) => {
//   return {
//     direction: dir === "rtl" ? "rtl" : "ltr", // Set direction based on "react-i18next" direction
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             // Palette values for dark mode (from previous dark mode palette)
//             primary: {
//               100: "#1F3A5F", // Dark blue for primary elements
//               200: "#4d648d", // Medium blue for hover or secondary buttons
//               300: "#acc2ef", // Light blue for highlights or accents
//               main: "#4d648d", // Main primary color
//               light: "#acc2ef", // Light variant of the primary color
//             },
//             secondary: {
//               100: "#3D5A80", // Dark accent blue for icons or text highlights
//               200: "#cee8ff", // Light accent blue for hover effects
//               main: "#3D5A80", // Main secondary color
//               light: "#cee8ff", // Light secondary color
//             },
//             neutral: {
//               100: "#FFFFFF", // White for primary text
//               200: "#e0e0e0", // Light gray for secondary text
//               main: "#e0e0e0", // Main neutral color
//               light: "#FFFFFF", // Light variant for text
//             },
//             background: {
//               100: "#0F1C2E", // Dark blue for background
//               200: "#1f2b3e", // Medium blue for cards, modals, etc.
//               300: "#374357", // Light blue for headers and navigation
//               default: "#0F1C2E", // Default background color
//               alt: "#1f2b3e", // Alternate background color
//               main: "#0F1C2E", // Main background color
//               secondary: "#374357", // Secondary background color
//               inverse: "#1f2b3e", // Inverse background
//             },
//             colors: {
//               default: {
//                 main: "#3D5A80", // Default accent color for components
//                 light: "#cee8ff", // Light version for hover states
//               },
//               secondary: {
//                 main: "#1F3A5F", // Dark blue for secondary elements
//                 light: "#acc2ef", // Light blue for secondary interactive elements
//               },
//               neutral: {
//                 main: "#e0e0e0", // Main neutral color for text
//                 light: "#FFFFFF", // White for primary text
//               },
//             },
//           }
//         : {
//             // Palette values for light mode
//             primary: {
//               // Primary colors for the theme
//               100: "#FFA500", // Orange (used for primary UI elements like buttons, headers)
//               200: "#dd8900", // Darker orange (used for hover or active states)
//               300: "#885400", // Darkest orange (used for emphasized elements)
//               main: "#FFA500", // Main primary color (orange)
//               light: "#dd8900", // Light primary color (used for hover states)
//             },
//             secondary: {
//               // Accent colors for highlighting specific elements
//               100: "#808080", // Gray (used for secondary buttons, icons, text)
//               200: "#2b2b2b", // Dark gray (used for hover or active states)
//               main: "#808080", // Main secondary color (gray)
//               light: "#2b2b2b", // Darker variant for hover effects
//             },
//             neutral: {
//               // Neutral colors for text
//               100: "#333333", // Dark gray for primary text
//               200: "#5c5c5c", // Medium gray for secondary text or placeholders
//               main: "#333333", // Main text color
//               light: "#5c5c5c", // Light text color for secondary text
//             },
//             background: {
//               // Background colors for the overall app layout
//               100: "#EFEFEF", // Light gray background (used for primary background areas)
//               200: "#e5e5e5", // Medium gray background (used for cards, modals, or sections)
//               300: "#bdbdbd", // Darker gray background (used for headers, navigation bars)
//               default: "#EFEFEF", // Default background color (lightest gray)
//               alt: "#e5e5e5", // Alternate background color for contrast
//               main: "#EFEFEF", // Main background color
//               secondary: "#bdbdbd", // Secondary background for elements like headers
//               inverse: "#e5e5e5", // Inverse background for contrasting sections
//             },
//             colors: {
//               default: {
//                 main: "#808080", // Gray for default UI elements
//                 light: "#2b2b2b", // Dark gray for hover effects
//               },
//               secondary: {
//                 main: "#FFA500", // Orange for secondary interactive elements
//                 light: "#dd8900", // Darker orange for hover states
//               },
//               neutral: {
//                 main: "#333333", // Dark gray for text
//                 light: "#5c5c5c", // Medium gray for secondary text
//               },
//             },
//           }),
//     },
//     typography: {
//       fontSize: 14,
//       h1: {
//         fontFamily: "ProzaLibreBold",
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: "ProzaLibreBold",
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: "ProzaLibreBold",
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: "ProzaLibreBold",
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: "ProzaLibreBold",
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: "ProzaLibreBold",
//         fontSize: 14,
//       },
//       body1:{
//         fontFamily: "ProzaLibreBold",
//         fontSize: 14,
//       },
//     },
//     components: {
//       MuiInputField: {
//         defaultProps: {
//           variant: 'outlined',
//           margin: 'dense',
//           size: 'small',
//           fullWidth: true,
//           style: { 
//             height: '40px',
//             fontSize: "36px",
//             color: 'yellow',
//           },
//         },
//       },
//       MuiTypography: {
//         defaultProps: {
//           variantMapping: {
//             heroTitleMain: 'h1',
//             heroTitleSpecial: 'h1',
//             informationMain: 'h2',
//             informationSpecial: 'h3',
//             informationSecondary: 'p',
//             informationData: 'div',
//           }
//         }
//       },
//     }
//   };
// };


// mui theme settings
export const themeSettings = (mode, dir) => {
  return {
    direction: dir === "rtl" ? "rtl" : "ltr", // I need to set direction based on "react-i18next" direction  dir === "rtl" ? "rtl" : 
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              xlighter: tokensDark.secondary[100],
              lighter: tokensDark.secondary[200],
              light: tokensDark.secondary[300],
              main: tokensDark.secondary[400],
              dark: tokensDark.secondary[500],
              darker: tokensDark.secondary[600],
              xdarker: tokensDark.secondary[700],
            },
            secondary: {
              xlighter: tokensDark.secondary[100],
              lighter: tokensDark.secondary[200],
              light: tokensDark.secondary[300],
              main: tokensDark.secondary[400],
              dark: tokensDark.secondary[500],
              darker: tokensDark.secondary[600],
              xdarker: tokensDark.secondary[700],
            },
            neutral: {
              xlighter: tokensDark.primary[100],
              lighter: tokensDark.primary[200],
              light: tokensDark.neutral[300],
              main: tokensDark.neutral[100],
              dark: tokensDark.neutral[500],
              darker: tokensDark.neutral[600],
              xdarker: tokensDark.neutral[700],
            },
            background: {
              white: tokensDark.primary[100],
              xlighter: tokensDark.primary[200],
              lighter: tokensDark.primary[300],
              light: tokensDark.primary[400],
              main: tokensDark.primary[500],    //
              dark: tokensDark.primary[600],    //
              darker: tokensDark.primary[700],
              xdarker: tokensDark.primary[800],
              black: tokensDark.primary[900],
            },

            // colors: {
            //   default: {
            //     ...tokensDark.secondary,
            //     main: tokensDark.secondary.dark,
            //     light: tokensDark.secondary.main,
            //   },
            //   secondary: {
            //     ...tokensDark.primary,
            //     main: tokensDark.primary[700],
            //     light: tokensDark.primary.light,
            //   },
            //   neutral: {
            //     ...tokensDark.neutral,
            //     main: tokensDark.neutral.main,
            //     light: tokensDark.neutral[700]
            //   },
            // }
          }
        : {
            // palette values for light mode
            primary: {
              white: tokensLight.secondary[700],
              xlighter: tokensLight.secondary[700],
              lighter: tokensLight.secondary[600],
              light: tokensLight.secondary[500],
              main: tokensLight.secondary[400],
              dark: tokensLight.secondary[300],
              darker: tokensLight.secondary[200],
              xdarker: tokensLight.secondary[100],
              black: tokensLight.secondary[100],
            },
            secondary: {
              xlighter: tokensLight.primary[700],
              lighter: tokensLight.primary[600],
              light: tokensLight.primary[500],
              main: tokensLight.primary[400],
              dark: tokensLight.primary[300],
              darker: tokensLight.primary[200],
              xdarker: tokensLight.primary[100],
            },
            neutral: {
              xlighter: tokensLight.neutral[700],
              lighter: tokensLight.neutral[600],
              light: tokensLight.neutral[500],
              main: tokensLight.neutral[100],
              dark: tokensLight.neutral[300],
              darker: tokensLight.primary[200],
              xdarker: tokensLight.primary[100],
            },
            background: {
              white: tokensLight.neutral[900],
              xlighter: tokensLight.neutral[800],
              lighter: tokensLight.neutral[700],
              light: tokensLight.neutral[600],
              main: tokensLight.neutral[500],
              dark: tokensLight.neutral[400],
              darker: tokensLight.neutral[300],
              xdarker: tokensLight.neutral[200],
              black: tokensLight.neutral[100],
            },
            // colors: {
            //   default: {
            //     ...tokensDark.primary,
            //     main: tokensDark.primary.dark,
            //     light: tokensDark.primary[700],
            //   },
            //   secondary: {
            //     ...tokensDark.secondary,
            //     main: tokensDark.secondary.dark,
            //     light: tokensDark.secondary.light,
            //   },
            //   neutral: {
            //     ...tokensDark.neutral,
            //     main: tokensDark.neutral.main,
            //     light: tokensDark.neutral[700]
            //   },
            // }
          }),
    },
    typography: {
      // fontSize: 14, // Base font size
    
      // Headings
      h1: {
        fontFamily: "ScheherazadeNewBold", // Main heading font
        // fontSize: "6rem", // 96px
      },
      h2: {
        fontFamily: "ScheherazadeNewSemiBold",
        // fontSize: "3.75rem", // 60px
      },
      h3: {
        fontFamily: "ScheherazadeNewSemiBold",
        // fontSize: "3rem", // 48px
      },
      h4: {
        fontFamily: "ScheherazadeNewSemiBold",
        // fontSize: "2.125rem", // 34px
      },
      h5: {
        fontFamily: "ScheherazadeNewSemiBold",
        // fontSize: ".5rem", // 24px
      },
      h6: {
        fontFamily: "ScheherazadeNewSemiBold",
        // fontSize: "1.25rem", // 20px
      },
    
      // Body text
      body1: {
        fontFamily: "ScheherazadeNewRegular",
        // fontSize: "1rem", // 16px
      },
      body2: {
        fontFamily: "ScheherazadeNewRegular",
        // fontSize: "0.875rem", // 14px
      },
    
      // Subtitles
      subtitle1: {
        fontFamily: "ScheherazadeNewMedium",
        // fontSize: "1rem", // 16px
      },
      subtitle2: {
        fontFamily: "ScheherazadeNewMedium",
        // fontSize: "0.875rem", // 14px
      },
    
      // Other custom typography
      heroTitleMain: {
        fontFamily: "ProzaLibreBold",
        fontSize: "6rem", // Aligning with h1 (hero titles are typically large)
      },
      heroDescMain: {
        fontFamily: "TajawalMedium",
        fontSize: "1.25rem", // 20px
      },
      heroTitleSpecial: {
        fontFamily: "TajawalExtraBold",
        fontSize: "3rem", // 48px
      },
      heroDescSpecial: {
        fontFamily: "TajawalRegular",
        fontSize: "1.25rem", // 20px
      },
    
      // Information sections
      informationMain: {
        fontFamily: "ProzaLibreBold",
        fontSize: "2.125rem", // Aligning with h4 (34px)
      },
      informationSpecial: {
        fontFamily: "ProzaLibreBold",
        fontSize: "1.5rem", // Aligning with h5 (24px)
      },
      informationSecondary: {
        fontFamily: "ProzaLibreBold",
        fontSize: "1rem", // Aligning with body1 (16px)
      },
      informationData: {
        fontFamily: "ProzaLibreBold",
        fontSize: "0.875rem", // Aligning with body2 (14px)
      },
    },
    components: {
      MuiInputField: {
        // Custom default properties for all TextField components
        defaultProps: {
          variant: 'outlined',
          margin: 'dense',
          size: 'small',
          fullWidth: true,
          style: { // Add style object for inline styles
            height: '40px',
            fontSize: "36px", // Set font size to 36
          },
        },
        // styleOverrides: {
        //   // some custom properties
        // },
      },

      MuiTypography: {
        // Custom default properties for all Typography components
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            heroTitleMain: 'h1',
            heroTitleSpecial: 'h1',
            informationMain: 'h2',
            informationSpecial: 'h3',
            informationSecondary: 'p',
            informationData: 'div',
          }
        },
        // styleOverrides: {
        //   // some custom properties
        // },
      },

      MuiGrid: {
        defaultProps: {
          item: {
            paddingLeft: 0, // Remove left padding
            paddingRight: 0, // Remove right padding
            border: "solid red 2px"
          },
        },
        styleOverrides: {
          // item: {
          //   paddingLeft: 0, // Remove left padding
          //   paddingRight: 0, // Remove right padding
          //   border: "solid black 2px"
          // },
        },
      },
    }
  };
};