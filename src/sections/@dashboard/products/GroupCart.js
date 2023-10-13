import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Label from '../../../components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

GroupViewCart.propTypes = {
  group: PropTypes.object,
};

export default function GroupViewCart({ group }) {
  const { name, username, photoUrl, joinedDate, userCount, status } = group;

  console.log(photoUrl)

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
      <Label
            variant="filled"
            color={status ? 'success' : 'error'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status ? 'activated' : 'disabled'}
          </Label>
        <StyledProductImg alt={name} src={photoUrl !== 'default' ? photoUrl : '/assets/images/default_group.jpg'} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link href={username} color="inherit" underline="none">
          {name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant='caption'>
            JOINED DATE   {joinedDate}
          </Typography>
          
        </Stack>
      </Stack>
    </Card>
  );
}
