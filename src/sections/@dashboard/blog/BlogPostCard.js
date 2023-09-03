import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Link, Card, Grid, Avatar, Typography, CardContent, Stack, IconButton, FormControlLabel, Switch } from '@mui/material';

import { BugReport, Delete, Send } from '@mui/icons-material';
import { useState } from 'react';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  onTest: PropTypes.func,
  onSend: PropTypes.func,
  onDelete: PropTypes.func
};

export default function BlogPostCard({ post, index, onTest, onSend, onDelete }) {
  const { id, title, createdAt } = post;
  const [allGroups, setAllGroups] = useState(false);
  const [allUsers, setAllUsers] = useState(false);


  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...({
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            
          }}
        >
          
          <StyledAvatar
            alt={title}
            src={`/assets/images/avatars/avatar_${id%7}.jpg`}
            sx={{
              ...({
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <StyledCover alt={title} src={`/assets/images/covers/cover_${id % 7}.jpg`} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...({
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {createdAt[0]}-{createdAt[1]}-{createdAt[2]} {createdAt[3]}:{createdAt[4]}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...({
                color: 'common.white',
              }),
            }}
          >
            {title}
          </StyledTitle>
          <Stack direction="row" width="50%">
            <FormControlLabel control={<Switch checked = {allGroups} onChange={() => setAllGroups(!allGroups)}/>} label="G" sx={{
              ...({
                color: 'common.white',
              }),
            }}/>
            <FormControlLabel control={<Switch checked = {allUsers} onChange={() => setAllUsers(!allUsers)}/>} label="F" sx={{
              ...({
                color: 'common.white',
              }),
            }}/>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
            <IconButton onClick={() => onTest(id)}>
              <BugReport color='success'/>
            </IconButton>
            <IconButton onClick={() => onSend(id, allGroups, allUsers)}>
              <Send color='primary'/>
            </IconButton>
            <IconButton onClick={() => onDelete(id)}>
              <Delete color='error'/>
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
