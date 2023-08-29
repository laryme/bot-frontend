import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// const Item = styled(Paper)(({ theme, width }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#00b',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: '#fff',
//     width: width || 'auto', // Corrected the width logic
//     margin: '5px 5px 5px 5px',
//     height: '40px',
//   }));

const ItemContainer = styled(Paper)(({ theme, width }) => ({
    display: 'flex',
  alignItems: 'center',      // Center vertically
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#00b',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#fff',
  width: width || 'auto',
  margin: '5px'
}));

  const NameContainer = styled('span')({
    flex: '1',                 // Take up available space
    textAlign: 'center',       // Center horizontally
  });

  PostButtonItem.propTypes = {
    button: PropTypes.object.isRequired,
    index: PropTypes.number,
    onDelete: PropTypes.func
  };


export default function PostButtonItem({ button, index, onDelete }) {
    const {name, link, type} = button
    return (
        <ItemContainer width={type === '1' ? 390 : 790}>
        <NameContainer>{name}</NameContainer>
        <IconButton onClick={onDelete} aria-label="Delete">
          <DeleteIcon color='error'/>
        </IconButton>
      </ItemContainer>
    );
}