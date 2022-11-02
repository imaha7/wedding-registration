import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Box, Typography, styled, useMediaQuery, useTheme, Container, Grid, Avatar, Button, IconButton, Stack, FormControl, Input, OutlinedInput, ListItemButton } from '@mui/material';
import { LocationOnOutlined, SearchOutlined } from '@mui/icons-material';
import { getUsers } from "../../actions/userAction";
import { useMutation, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import PerfectScrollbar from "react-perfect-scrollbar";

const User: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const [user, setUser] = useState<any>([]);

  // const getUsersRandom = useMutation(() => getUsers(), {
  //   onMutate: () => {
  //     return {};
  //   },
  //   onSuccess: (response: any) => {
  //     setUser(response.results);
  //   },
  //   onError: (error: any) => {
  //     console.log("error", error);
  //   },
  // });

  // const getUsersRegistration = useQuery(['getUsers'], () => getUsers(), {
  //   keepPreviousData: true,
  //   refetchOnWindowFocus: false,
  //   onSuccess: (response) => {
  //     if (response.results) {
  //       setUser(response.results);
  //       console.log("Data : ", user);
  //     } else {
  //       setUser([]);
  //     }
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   }
  // });

  const fetchPokemons = async ({ pageParam = 0 }) => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=' + pageParam + 'offset=0');
    return res.json();
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['results'], fetchPokemons, {
    getNextPageParam: (lastPage: any, pages: any) => lastPage.nextCursor,
  })

  useEffect(() => { }, []);

  return (
    <Container maxWidth="sm" sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#2b2b2b', p: 3 }}>
      <Head>
        <title>List Users</title>
        <meta name="description" content="List Users" />
        <link rel="icon" href="/bg-wedding.webp" />
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
                <Box sx={{ backgroundColor: theme.palette.info.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                  <Typography variant={"subtitle1"} align={'center'} sx={{ color: 'white' }}>
                    Users : 100
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                <Box sx={{ backgroundColor: theme.palette.error.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                  <Typography variant={"subtitle1"} align={'center'} sx={{ color: 'white' }}>
                    Others : 100
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                  <Typography variant={"subtitle1"} align={'center'} sx={{ color: 'white' }}>
                    Total : 200
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <PerfectScrollbar>
            {status === 'loading' ?
              <p>Loading...</p> :
              <>
                {
                  data?.pages.map((group: any, index: number) => (
                    <React.Fragment key={index}>
                      {group.results.map((item: any) => (
                        <ListItemButton key={item.name} sx={{ backgroundColor: '#424242', borderRadius: '10px', px: 2, py: 1, mb: 3 }}>
                          <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 1 }}>
                              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                                <Box>
                                  <Typography variant={"subtitle1"} sx={{ color: 'white', wordBreak: 'break-word' }}>
                                    {item.name}
                                  </Typography>
                                </Box>
                                <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                                  <Typography variant={"caption"} align={'center'} sx={{ color: 'white' }}>
                                    Will Attend
                                  </Typography>
                                </Box>
                              </Stack>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant={"body2"} sx={{ color: 'white', wordBreak: 'break-word' }}>
                                Family / Friends / Partner / Invited Guest Count : 2
                              </Typography>
                            </Box>
                            <Box sx={{ minHeight: '80px', border: '2px solid ' + theme.palette.primary.main, borderRadius: '10px', p: 1}}>
                              <Typography variant={"body2"} sx={{ color: 'white', wordBreak: 'break-word', my: 'auto' }}>
                                Congraattsss to youuu......
                              </Typography>
                            </Box>
                          </Box>
                        </ListItemButton>
                      ))}
                    </React.Fragment>
                  ))
                }
              </>
            }
            <Box>
              <Button fullWidth variant="contained" disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()} sx={{ borderRadius: '10px', textTransform: 'none', color: 'white' }}>{isFetchingNextPage ? 'Loading more...' : (hasNextPage ? 'Load More' : 'Nothing more to load')}</Button>
            </Box>
            <Box>
              {isFetching && !isFetchingNextPage ?
                <Typography variant={"body2"} sx={{ color: 'white', wordBreak: 'break-word' }}>
                  Fetching...
                </Typography> : null}
            </Box>
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
                    // value={name}
                    // onChange={handleChangeName}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    sx={{ backgroundColor: '#424242', borderRadius: '10px', color: 'white' }}
                  />
                  {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
                </FormControl>
              </Box>
              <Box sx={{ textAlign: 'center', backgroundColor: theme.palette.primary.main, borderRadius: '10px' }}>
                <IconButton color="primary" size={'small'} aria-label="location" component="label">
                  <SearchOutlined sx={{ color: 'white' }} />
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
