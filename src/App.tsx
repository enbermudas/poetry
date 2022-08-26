import { ChakraProvider, Box, VStack, Grid, theme, Container  } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Search from "./components/Search";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Container>
            <Search />
          </Container>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
