import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useFormik } from "formik";

const ProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex h="100vh" py={10}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" width={400} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="twitter">Twitter</FormLabel>
            <Input id="twitter" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="linkedin">Linkedin</FormLabel>
            <Input id="linkedin" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="biography">Biography</FormLabel>
            <Textarea
              id="biography"
              placeholder="Write a bit about yourself"
              rows={6}
            />
          </FormControl>
          <FormControl>
            <Button colorScheme="blue" size="md" type="submit">
              Submit
            </Button>
          </FormControl>
        </VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
          bg="gray.50"
        ></VStack>
      </Flex>
    </form>
  );
};

export default ProfileForm;
