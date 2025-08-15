// ResponsiveStack.tsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface ResponsiveStackProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
   onDelete: (id: number) => void;
  spacing?: number | { xs?: number; sm?: number; md?: number };
  direction?: 'row' | 'column' | { xs?: 'row' | 'column'; sm?: 'row' | 'column' };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ResponsiveStack<T extends { id: number }>({
  data,
  renderItem,
    onDelete,

  spacing = { xs: 1, sm: 2, md: 4 },
  direction = { xs: 'column', sm: 'row' },
}: ResponsiveStackProps<T>) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction={direction} spacing={spacing}>
        {data.map((item, index) => (
           <Item key={item.id}>
           
              <IconButton
                size="small"
                sx={{
                 position:'absolute',
               right: { xs: 70, sm: 140 },
                color: 'red',
                }}
                onClick={() => onDelete(item.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
           
            {renderItem(item, index)}
          </Item>
        ))}
      </Stack>
    </Box>
  );
}
