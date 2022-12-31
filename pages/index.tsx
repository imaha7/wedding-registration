import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Box, ToggleButton, Typography, styled, useMediaQuery, useTheme, Container, Grid, ToggleButtonGroup, FormControl, Input, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { GroupsOutlined, PersonOutlineOutlined } from '@mui/icons-material';
import { createUser, checkUser } from "../actions/userAction";
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
  const [words, setWords] = useState<any>('');
  const [error, setError] = useState<any>(false);
  const [helperText, setHelperText] = useState<any>('');

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

  const handleChangeWords = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWords(event.target.value);
  };

  const handleClickTab = (event: React.MouseEvent<HTMLElement>, tab: string | null) => {
    if (tab !== null) {
      setTab(tab);
    }
    setUsername('');
    setName('');
    setGuestCount('');
  };

  const createUserRegistration = useMutation(() => createUser({ username: username, name: name, invited_guests_count: guestCount, status: 'will attend', congrats_words: words }), {
    onMutate: () => {
      return { username: username, name: name, invited_guests_count: guestCount, status: 'will attend', congrats_words: words };
    },
    onSuccess: (response) => {
      setError(false);
      setHelperText('');
      setUser(response.data);
      router.push({
        pathname: '/invitation',
        query: { id: response.data.id, username: response.data.username },
      });
    },
    onError: (error) => {
      setError(true);
      setHelperText('Username has been used');
      console.log("error", error);
    },
  });

  const checkUserRegistration = useMutation(() => checkUser({ username: username }), {
    onMutate: () => {
      setError(false);
      return { username: username };
    },
    onSuccess: (response) => {
      if (response.data.length > 0) {
        setError(false);
        setHelperText('');
        setUser(response.data);
        router.push({
          pathname: '/invitation',
          query: { id: response.data[0].id, username: response.data[0].username },
        });
      } else {
        setError(true);
        setHelperText('Username has been not registered yet!');
      }
    },
    onError: (error) => {
      setError(true);
      setHelperText('Username has been not registered yet!');
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Varela Round&display=optional" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/gotham-rounded" rel="stylesheet" />
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
            <FormControl variant="standard" fullWidth error={error}>
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
              {tab === 'register' ? (createUserRegistration.isError ? <FormHelperText id="standard-helper-text">{helperText}</FormHelperText> : null) : (checkUserRegistration.isError ? <FormHelperText id="standard-helper-text">{helperText}</FormHelperText> : null)}
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
          <Box sx={{ width: '100%', color: 'white', mb: 4, display: tab === 'login' ? 'none' : 'normal' }}>
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
          <Box sx={{ width: '100%', color: 'white', mb: 5, display: tab === 'login' ? 'none' : 'normal' }}>
            <FormControl variant="filled" fullWidth>
              <Input
                id="filled-adornment-weight"
                placeholder={"Congratulate to them...."}
                value={words}
                onChange={handleChangeWords}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                multiline
                rows={4}
                disableUnderline={true}
                sx={{ backgroundColor: '#4D4D4D', borderRadius: '10px', color: 'white', border: 0, p: 1 }}
              />
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <LoadingButton loading={tab === 'register' ? createUserRegistration.isLoading : checkUserRegistration.isLoading} fullWidth variant="contained" disabled={tab === 'register' ? (username && name && guestCount ? false : true) : (username ? false : true)}
              onClick={() => {
                if (tab === 'register') {
                  createUserRegistration.mutate();
                } else {
                  checkUserRegistration.mutate();
                }
              }} sx={{ borderRadius: '10px', textTransform: 'none', color: 'white' }}>
              {tab === 'register' ? 'Register' : 'Login'}
            </LoadingButton>
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
