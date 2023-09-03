import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


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
    onDelete: PropTypes.func,
    key: PropTypes.number,
  };


export default function PostButtonItem({ key, button, index, onDelete }) {
    const {name, link, type} = button;
    console.log(button)
    return (
        <ItemContainer width={type === 'MEDIUM' ? 390 : 790}>
        <NameContainer>{name}</NameContainer>
        <IconButton onClick={() => onDelete(index)} aria-label="Delete">
          <DeleteIcon color='error'/>
        </IconButton>
      </ItemContainer>
    );
}