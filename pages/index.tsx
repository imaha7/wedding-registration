import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, ToggleButton, Typography, styled, useMediaQuery, useTheme, Container, Grid, Avatar, ToggleButtonGroup, FormControl, Input, InputAdornment, FormHelperText, Button } from '@mui/material';
import { GroupsOutlined, PersonOutlineOutlined } from '@mui/icons-material';
import { getUsers } from "../actions/userAction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/router';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '10px',
  color: theme.palette.primary.main,
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(1),
    textTransform: 'none',
    '&.Mui-disabled': {
      border: 0,
      minWidth: '120px',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      minWidth: '120px',
      ': hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
    '&:not(:first-of-type)': {
      minWidth: '120px',
      border: 0,
      borderRadius: '10px',
    },
    '&:first-of-type': {
      minWidth: '120px',
      border: 0,
      borderRadius: '10px',
    },
  },
}));

const Home: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const [user, setUser] = useState<any>([]);
  const [username, setUsername] = useState<any>('');
  const [guestCount, setGuestCount] = useState<any>(null);
  const [tab, setTab] = useState('register');

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangeGuestCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestCount(event.target.value);
  };

  const handleClickTab = (event: React.MouseEvent<HTMLElement>, tab: string | null) => {
    if (tab !== null) {
      setTab(tab);
    }
    setUsername('');
    setGuestCount('');
  };

  const getUsersRandom = useMutation(() => getUsers(), {
    onMutate: () => {
      return {};
    },
    onSuccess: (response: any) => {
      setUser(response.results);
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });

  useEffect(() => { }, [username, guestCount]);

  return (
    <Container maxWidth="sm" sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#2b2b2b', px: 0 }}>
      <Head>
        <title>Ilham & Refni Wedding</title>
        <meta name="description" content="Ilham & Refni Wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ minHeight: '350px', backgroundImage: `url(${"/background.jpg"})`, backgroundRepeat: "no-repeat", py: 2, px: 2 }}>
          <Box sx={{ mb: 2, mt: 3 }}>
            <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={!isMobile ? 2 : 0}>
              <Grid container justifyContent={'center'} item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Avatar alt={'picture 1'} src={"https://xsgames.co/randomusers/avatar.php?g=male"} variant={"rounded"} sx={{ minWidth: !isMobile ? 100 : 156, height: !isMobile ? 100 : 156, borderRadius: '10px' }} />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Typography align={'center'} variant={"h4"} sx={{ fontFamily: 'Great Vibes', color: 'white' }}>
                  Ilham & Refni
                </Typography>
              </Grid>
              <Grid container justifyContent={'center'} item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Avatar alt={'picture 3'} src={"https://xsgames.co/randomusers/avatar.php?g=male"} variant={"rounded"} sx={{ width: !isMobile ? 100 : 156, height: !isMobile ? 100 : 156, borderRadius: '10px' }} />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mb: 5, mt: 3 }}>
            <Typography align={'center'} variant={"h4"} sx={{ color: 'white' }}>
              You’re Invited to Our Wedding Party!
            </Typography>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#2b2b2b', borderRadius: '30px', py: 2, px: 3, mt: -4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant={"h5"} sx={{ color: 'white' }}>
              Please Write Down Your Identity
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <StyledToggleButtonGroup
              size="small"
              value={tab}
              exclusive
              onChange={handleClickTab}
              aria-label="tab"
            >
              <ToggleButton color="primary" value="register" aria-label="register">
                Register
              </ToggleButton>
              <ToggleButton color="primary" value="login" aria-label="login">
                Login
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Box>
          <Box sx={{ mb: 0.5 }}>
            <Typography variant={"subtitle2"} sx={{ color: 'white' }}>
              Username
            </Typography>
          </Box>
          <Box sx={{ width: '100%', color: 'white', mb: 4 }}>
            <FormControl variant="standard" fullWidth>
              <Input
                id="standard-adornment-weight"
                placeholder={"@username"}
                value={username}
                onChange={handleChangeUsername}
                startAdornment={<InputAdornment position="start"><PersonOutlineOutlined sx={{ color: 'white' }} /></InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                sx={{ borderBottom: '1px solid white', color: 'white' }}
              />
              {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
            </FormControl>
          </Box>
          <Box sx={{ mb: 0.5, display: tab === 'login' ? 'none' : 'normal' }}>
            <Typography variant={"subtitle2"} sx={{ color: 'white' }}>
              Family / Friend / Partner / Invited Guest Count
            </Typography>
          </Box>
          <Box sx={{ width: '100%', color: 'white', mb: 5, display: tab === 'login' ? 'none' : 'normal' }}>
            <FormControl variant="standard" fullWidth>
              <Input
                id="standard-adornment-weight"
                placeholder={"Contoh : 2"}
                type={'number'}
                value={guestCount}
                onChange={handleChangeGuestCount}
                startAdornment={<InputAdornment position="start"><GroupsOutlined sx={{ color: 'white' }} /></InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                sx={{ borderBottom: '1px solid white', color: 'white' }}
              />
              {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Button fullWidth variant="contained" disabled={tab === 'register' ? (username && guestCount ? false : true) : (username ? false : true)} onClick={() => { router.push('/invitation') }} sx={{ borderRadius: '10px', textTransform: 'none', color: 'white' }}>{tab === 'register' ? 'Register' : 'Login'}</Button>
          </Box>
        </Box>
      </Box>
      <footer>
        <Box sx={{ pb: 3 }}>
          <Typography align={'center'} variant={"body1"} sx={{ color: 'white' }}>
            © {new Date().getFullYear()} by: @imaha7
          </Typography>
        </Box>
      </footer>
    </Container>

  )
}

export default Home
