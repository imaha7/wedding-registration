import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, ToggleButton, Typography, styled, useMediaQuery, useTheme, Container, Grid, Avatar, ToggleButtonGroup, FormControl, Input, InputAdornment, Button } from '@mui/material';
import { GroupsOutlined, PersonOutlineOutlined } from '@mui/icons-material';
import { getUsers } from "../actions/userAction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import Image from 'next/image';

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
  const [name, setName] = useState<any>('');
  const [guestCount, setGuestCount] = useState<any>(null);
  const [tab, setTab] = useState('register');
  let audio: any = null;

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeGuestCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestCount(event.target.value);
  };

  const handleClickTab = (event: React.MouseEvent<HTMLElement>, tab: string | null) => {
    if (tab !== null) {
      setTab(tab);
    }
    setUsername('');
    setName('');
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

  useEffect(() => {
    audio = new Audio('/audio.mp3');
    audio.autoplay = true;
    // audio?.play();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#2b2b2b', px: 0 }}>
      <Head>
        <title>Ilham & Refni Wedding</title>
        <meta name="description" content="Ilham & Refni Wedding" />
        <link rel="icon" href="/bg-wedding.webp" />
      </Head>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ minHeight: '350px', backgroundColor: '#eeebee', backgroundImage: `url(${"/bg-wedding.webp"})`, backgroundRepeat: "no-repeat", backgroundPosition: 'center', backgroundSize: 'contain' }}>
          <Box sx={{ minHeight: '350px', background: 'rgba(0, 0, 0, 0.6)', py: 2, px: 2 }}>
            <Box sx={{ mb: 2, mt: 3 }}>
              <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={!isMobile ? 2 : 0}>
                <Grid container justifyContent={'center'} item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Image
                    width={!isMobile ? 100 : 156}
                    height={!isMobile ? 100 : 156}
                    src={"/ilham.png"}
                    alt={"ilham"}
                    priority
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Typography align={'center'} variant={"h4"} sx={{ fontFamily: 'Great Vibes', color: 'white' }}>
                    Ilham & Refni
                  </Typography>
                </Grid>
                <Grid container justifyContent={'center'} item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Image
                    width={!isMobile ? 100 : 156}
                    height={!isMobile ? 100 : 156}
                    src={"/refni.png"}
                    alt={"refni"}
                    priority
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mb: 5, mt: 3 }}>
              <Typography align={'center'} variant={"h4"} sx={{ color: 'white' }}>
                You’re Invited to Our Wedding Party!
              </Typography>
            </Box>
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
                placeholder={"e.g : username"}
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
              Full Name
            </Typography>
          </Box>
          <Box sx={{ width: '100%', color: 'white', display: tab === 'login' ? 'none' : 'normal', mb: 4 }}>
            <FormControl variant="standard" fullWidth>
              <Input
                id="standard-adornment-weight"
                placeholder={"e.g : John Doe"}
                value={name}
                onChange={handleChangeName}
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
            <Button fullWidth variant="contained" disabled={tab === 'register' ? (username && name && guestCount ? false : true) : (username ? false : true)} onClick={() => {router.push('/invitation');}} sx={{ borderRadius: '10px', textTransform: 'none', color: 'white' }}>
              {tab === 'register' ? 'Register' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Box>
      <footer>
        <Box sx={{ pb: 2 }}>
          <Typography align={'center'} variant={"body1"} sx={{ color: 'white' }}>
            © {new Date().getFullYear()} by: @imaha7
          </Typography>
        </Box>
      </footer>
    </Container>

  )
}

export default Home
