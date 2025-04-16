import React from "react";
import {
  Box,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqsData = [
  {
    question: "How this work ?",
    answer:
      "Yet bed any for  assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
  {
    question: "Are there any additional fee?",
    answer:
      "Yet bed any for  assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
  {
    question: "How can i get the app?",
    answer:
      "Yet bed any for  assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "Yet bed any for  assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
];

function Faqs() {
  return (
    <Stack
      px={{ xs: "2%", sm: "7%" }}
      direction={{ xs: "column", sm: "row" }}
      py={{ xs: "25px", sm: "40px", md: "50px" }}
    >
      <Box flex="0.5" paddingRight={{ xs: "0%", sm: "3%", md: "6%" }}>
        <Typography
          variant="h2"
          fontWeight="800"
          fontSize={{ xs: "34px", sm: "44px", md: "54px" }}
          mb={{ xs: "15px", sm: "25px", md: "35px" }}
        >
          Any questions? <br /> We got you.
        </Typography>
        <Typography
          variant="body1"
          fontWeight="500"
          mb={{ xs: "12px", sm: "18px", md: "25px" }}
        >
          Yet bed any for assistance indulgence unpleasing. Not thoughts all
          exercise blessing. Indulgence way everything joy alteration boisterous
          the attachment.
        </Typography>
        <Button variant="text" endIcon={<ArrowRightAltIcon />}>
          <Typography fontWeight="800">More Faqs</Typography>
        </Button>
      </Box>
      <Box flex="0.5">
        {faqsData.map((data, id) => (
          <Accordion key={id} sx={{ boxShadow: "none", my: { xs: "10px", sm: "20px" } }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" fontWeight="500">
                {data.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{data.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Stack>
  );
}

export default Faqs;
