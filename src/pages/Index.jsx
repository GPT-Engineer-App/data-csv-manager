import { Container, VStack } from "@chakra-ui/react";
import CSVUploader from "../components/CSVUploader";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <CSVUploader />
      </VStack>
    </Container>
  );
};

export default Index;