import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BotaoAtivo({text, onClick}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={onClick} variant="contained">{text}</Button>
    </Stack>
  );
}
