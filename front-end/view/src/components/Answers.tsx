
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

type exemploDePerguntas = {
    example: string;
};


export default function ExamplosDePerguntas({example} : exemploDePerguntas) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label={example} />
    </Stack>
  );
}
