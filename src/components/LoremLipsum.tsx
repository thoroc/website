import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { LoremIpsum } from "lorem-ipsum";
import { Typography } from "@mui/material";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const LoremIpsumContent = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Lorem Ipsum
        </Typography>
        <Typography>{lorem.generateParagraphs(7)}</Typography>
      </Box>
    </Container>
  );
};

export default LoremIpsumContent;
