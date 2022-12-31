import '../styles/globals.css'
import React, { useEffect, useRef, useState } from 'react';
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#74ABFF"
      },
      success: {
        main: "#74FF82",
      },
      error: {
        main: "#FF7474",
      },
    },
    typography: {
      fontFamily: "Varela Round",
    }
  });
  const queryClient = useRef(new QueryClient());
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, loading]);

  return (
    <QueryClientProvider client={queryClient.current}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <ThemeProvider theme={theme}>
        {
          loading && (
            <Box sx={{ width: "100%", position: "fixed" }}>
              <LinearProgress />
            </Box>
          )
        }
        <Component {...pageProps} />
      </ThemeProvider>
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}

export default MyApp
