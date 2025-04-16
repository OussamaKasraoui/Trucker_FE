import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";

const company = ["About us", "Careers", "Blog", "Pricing"];
const product = [
  "facebook followers",
  "Instagram followers",
  "Twitter followers",
  "Tiktok followers",
];
const resources = ["Proposal template", "Tutorial", "Invoices", "Freebies"];

function Footer() {
  return (
    <Box px={{ xs: "2%", sm: "7%" }} className="footer" color="#ffffff">
      <Stack
        textAlign={{ xs: "center", sm: "left" }}
        direction={{ xs: "column", sm: "row" }}
        py={{ xs: "7%", sm: "4%" }}
        spacing={{ xs: 3 }}
      >
        {/* left section */}
        <Box flex="0.5" boxSizing="border-box">
          <Typography variant="h6" fontWeight="500" mb="20px">
            Handler
          </Typography>
          <Typography variant="body2" width={{ xs: "100%", sm: "90%" }}>
            Yet bed any for travelling assistance indulgence unpleasing. Not
            thoughts all exercise blessing. Indulgence way everything joy
            alteration boisterous the attachment.
          </Typography>
        </Box>
        {/* right section */}
        {/* first column */}
        <Stack flex="0.16" gap={{ sx: "9px", sm: "12px" }}>
          <Typography varaint="body1" fontWeight="500">
            Company
          </Typography>
          {company.map((item, index) => (
            <Link
              key={index}
              className="footer-link"
              href="#"
              color="inherit"
              variant="body2"
            >
              {item}
            </Link>
          ))}
        </Stack>
        {/* second column */}
        <Stack flex="0.16" gap={{ sx: "9px", sm: "12px" }}>
          <Typography varaint="body1" fontWeight="500">
            Product
          </Typography>
          {product.map((item, index) => (
            <Link
              key={index}
              className="footer-link"
              href="#"
              color="inherit"
              variant="body2"
            >
              {item}
            </Link>
          ))}
        </Stack>
        {/* third column */}
        <Stack flex="0.16" gap={{ sx: "9px", sm: "12px" }}>
          <Typography varaint="body1" fontWeight="500">
            Resources
          </Typography>
          {resources.map((item, id) => (
            <Link
              key={id}
              className="footer-link"
              href="#"
              color="inherit"
              variant="body2"
            >
              {item}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
