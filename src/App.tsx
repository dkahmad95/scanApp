import { Container } from "@mui/material";
import DocScanPage from "./pages/DocScanPage/DocScanPage";
import Box from "@mui/material/Box";

function App() {
  return (
    <Container>
      <Box component="section">
        <DocScanPage />
      </Box>
    </Container>
  );
}

export default App;
