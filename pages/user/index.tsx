import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, useTheme, Container, Grid, IconButton, Stack, FormControl, Input, OutlinedInput, ListItemButton, Skeleton, Button } from '@mui/material';
import { DownloadOutlined, SearchOutlined } from '@mui/icons-material';
import { getUsers, deleteUser } from "../../actions/userAction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import PerfectScrollbar from "react-perfect-scrollbar";
import QRCode from 'react-qr-code';

const FileSaver = require('file-saver');

const User: NextPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<any>([]);
  const [total, setTotal] = useState<any>(null);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getUsersRegistration = useQuery(['getUsers', search], () => getUsers({ name: search }), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      if (response.data) {
        setUser(response.data);
        setTotal(response.total);
        console.log("Data : ", user);
      } else {
        setUser([]);
        setTotal(null);
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const deleteUserRegistration = useMutation((id) => deleteUser({ id: id }), {
    onMutate: (id: any) => {
      return { id };
    },
    onSuccess: (response) => {
      console.log(response);
      getUsersRegistration.refetch();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const downloadQR = (users: any) => {
    users.map((item: any) => {
      FileSaver.saveAs('http://api.qrserver.com/v1/create-qr-code/?data=' + item.id + '&size=312x312&bgcolor=white', "QR-Code-" + item.id + "-" + item.name + ".png");
    });

  };

  useEffect(() => { getUsersRegistration }, [search]);

  return (
    <Container maxWidth="sm" sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#2b2b2b', p: 3 }}>
      <Head>
        <title>List Users</title>
        <meta name="description" content="List Users" />
        <link rel="icon" href="/bg-wedding.webp" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=optional" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/maison-neue" rel="stylesheet" />
      </Head>
      <Box sx={{ mb: 0 }}>
        <Box sx={{ backgroundColor: '#2b2b2b', mb: 3 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant={"h6"} sx={{ color: 'white' }}>
              Registered Users
            </Typography>
          </Box>
          <Box sx={{ mb: 0 }}>
            <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                {getUsersRegistration.isFetching ?
                  <Skeleton variant="rounded" width={'100%'} height={30} sx={{ borderRadius: '10px' }} /> :
                  <Box sx={{ backgroundColor: theme.palette.info.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                    <Typography variant={"subtitle1"} align={'center'} sx={{ color: 'white' }}>
                      Users : {total ? total.userCount : ''}
                    </Typography>
                  </Box>
                }
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                {getUsersRegistration.isFetching ?
                  <Skeleton variant="rounded" width={'100%'} height={30} sx={{ borderRadius: '10px' }} /> :
                  <Box sx={{ backgroundColor: theme.palette.error.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                    <Typography variant={"subtitle1"} align={'center'} sx={{ color: 'white' }}>
                      Others : {total ? total.guestCount : ''}
                    </Typography>
                  </Box>
                }
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                {getUsersRegistration.isFetching ?
                  <Skeleton variant="rounded" width={'100%'} height={30} sx={{ borderRadius: '10px' }} /> :
                  <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                    <Typography variant={"subtitle1"} align={'center'} sx={{ color: 'white' }}>
                      Total : {total ? total.userGuestCount : ''}
                    </Typography>
                  </Box>
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ minHeight: '100vh', mb: 2 }}>
          <PerfectScrollbar>
            {getUsersRegistration.isFetching ?
              <Skeleton variant="rounded" width={'100%'} height={160} sx={{ borderRadius: '10px' }} /> :
              user.map((item: any) => (
                <Box key={item.id}>
                  <ListItemButton onClick={() => {
                    router.push({
                      pathname: '/invitation',
                      query: { id: item.id, username: item.username },
                    })
                  }} sx={{ backgroundColor: '#424242', borderRadius: '10px', px: 2, py: 1, mb: 1 }}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ mb: 1 }}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                          <Box>
                            <Typography variant={"subtitle1"} sx={{ color: 'white', wordBreak: 'break-word' }}>
                              {item.name}
                            </Typography>
                          </Box>
                          <Box sx={{ backgroundColor: item.status === 'will attend' ? theme.palette.primary.main : (item.status === 'attended' ? theme.palette.success.main : theme.palette.error.main), borderRadius: '5px', textAlign: 'center', px: 2 }}>
                            <Typography variant={"caption"} align={'center'} sx={{ color: 'white', textTransform: 'capitalize' }}>
                              {item.status}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant={"body2"} sx={{ color: 'white', wordBreak: 'break-word' }}>
                          Family / Friends / Partner / Invited Guest Count : {item.invited_guests_count}
                        </Typography>
                      </Box>
                      {item.congrats_words ?
                        <Box sx={{ minHeight: '80px', border: item.status === 'will attend' ? '2px solid ' + theme.palette.primary.main : (item.status === 'attended' ? '2px solid ' + theme.palette.success.main : '2px solid ' + theme.palette.error.main), borderRadius: '10px', p: 1 }}>
                          <Typography variant={"body2"} sx={{ color: 'white', wordBreak: 'break-word', my: 'auto' }}>
                            {item.congrats_words}
                          </Typography>
                        </Box> : null
                      }
                    </Box>
                  </ListItemButton>
                  <Box sx={{ backgroundColor: 'white', borderRadius: '15px', p: 2, mb: 4 }}>
                    <QRCode
                      id={'qr-code-' + item.id}
                      size={24}
                      style={{ height: "auto", width: "100%", textAlign: 'center', }}
                      value={(item.id).toString()}
                      viewBox={`0 0 24 24`}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Button fullWidth variant="contained" color={'error'} onClick={() => deleteUserRegistration.mutate(item.id)} sx={{ borderRadius: '10px', textTransform: 'none', color: 'white' }}>Delete {item.username}</Button>
                  </Box>
                </Box>
              ))
            }
          </PerfectScrollbar>
        </Box>
        <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#2b2b2b' }}>
          <Box sx={{ py: 1 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
              <Box sx={{ width: '100%' }}>
                <FormControl variant="outlined" size='small' fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    placeholder={"e.g : John Doe"}
                    value={search}
                    onChange={handleChangeSearch}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    sx={{ backgroundColor: '#424242', borderRadius: '10px', color: 'white' }}
                  />
                </FormControl>
              </Box>
              <Box sx={{ textAlign: 'center', backgroundColor: theme.palette.primary.main, borderRadius: '10px' }}>
                <IconButton color="primary" size={'small'} aria-label="location" component="label" onClick={() => { getUsersRegistration.refetch() }}>
                  <SearchOutlined sx={{ color: 'white' }} />
                </IconButton>
              </Box>
              <Box sx={{ textAlign: 'center', backgroundColor: theme.palette.primary.main, borderRadius: '10px' }}>
                <IconButton color="primary" size={'small'} aria-label="location" component="label" onClick={() => downloadQR(user)}>
                  <DownloadOutlined sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            </Stack>
          </Box>
          <footer>
            <Box sx={{ pb: 2 }}>
              <Typography align={'center'} variant={"body1"} sx={{ color: 'white' }}>
                © {new Date().getFullYear()} by: @imaha7
              </Typography>
            </Box>
          </footer>
        </Box>
      </Box>
    </Container>
  )
}

export default User
