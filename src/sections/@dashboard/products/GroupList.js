import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import GroupViewCart from './GroupCart';

// ----------------------------------------------------------------------

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
};

export default function GroupList({ groups, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {groups.map((group) => (
        <Grid key={group.id} item xs={12} sm={6} md={3}>
          <GroupViewCart group={group} />
        </Grid>
      ))}
    </Grid>
  );
}
