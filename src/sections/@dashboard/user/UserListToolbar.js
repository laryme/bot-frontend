import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, IconButton, OutlinedInput, InputAdornment } from '@mui/material';

import { SearchTwoTone } from '@mui/icons-material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onSearch: PropTypes.func,
};

export default function UserListToolbar({filterName, onFilterName, onSearch }) {
  return (
    <StyledRoot>
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Foydalanuvchini qidirish..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />
      <IconButton aria-label="search" color="primary" onClick={onSearch}>
        <SearchTwoTone />
      </IconButton>
    </StyledRoot>
  );
}
