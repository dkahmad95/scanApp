import {  Container } from '@mui/material';
import IDScanForm from './component/IDSCanForm';

const DocScanPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, md: 4 },
        paddingTop: { xs: 2, md: 4 },
      }}
    >
    <IDScanForm/>
    </Container>
  );
};

export default DocScanPage;
