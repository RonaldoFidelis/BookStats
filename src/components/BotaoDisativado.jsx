import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BotaoDesativo({ text }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" disabled>
        {text}
      </Button>
    </Stack>
  );
}
