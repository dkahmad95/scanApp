// ScanCard.tsx

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface ScanData {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  dob: string;
}

interface ScanCardProps {
  data: ScanData;
  onDelete: (id: number) => void;
}

export default function ScanCard({ data, onDelete }: ScanCardProps) {
  return (
    <Card sx={{ minWidth: 270, position: 'relative' }}>
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 4,
          right: { xs: 8, sm: 16 },
          color: 'red',
        }}
        onClick={() => onDelete(data.id)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <CardContent>
        <Typography variant="h6" component="div">
          {data.firstName} {data.lastName}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          ID Number: {data.idNumber}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          DOB: {data.dob}
        </Typography>
      </CardContent>

    
    </Card>
  );
}
