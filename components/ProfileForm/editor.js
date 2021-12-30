import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useForm } from "react-hook-form";

export const ProfileEditor = ({ profile, setEditMode, mutateProfile }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: profile,
  });

  const onSubmit = async (data) => {
    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile: data }),
    });
    mutateProfile(data);
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex h="100vh" py={10}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input {...register("name")} id="name" width={400} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input {...register("email")} id="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              placeholder="Principal Engineer, Microsoft"
              {...register("title")}
              id="title"
              type="title"
            />
            <FormHelperText>
              Enter your current role and company, or anything that is relevant
              as your title.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="biography">Biography / Motivation</FormLabel>
            <Textarea
              {...register("biography")}
              id="biography"
              placeholder="Write a bit about yourself"
              rows={6}
            />
            <FormHelperText>
              Please tell as a bit about yourself. You can use Markdown for
              formatting. Leave an empty line between paragraphs.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="twitter">Twitter</FormLabel>
            <Input
              placeholder="https://twitter.com/your_username"
              {...register("twitter")}
              id="twitter"
            />
            <FormHelperText>
              Enter the URL of your Twitter profile.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="linkedin">Linkedin</FormLabel>
            <Input
              placeholder="https://www.linkedin.com/in/your_username/"
              {...register("linkedin")}
              id="linkedin"
            />
            <FormHelperText>
              Enter the URL of your LinkedIN profile.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <HStack spacing="24px">
              <Button colorScheme="greenButton" size="md" type="submit">
                Save
              </Button>
              <Button
                onClick={handleCancelClick}
                colorScheme="grayButton"
                size="md"
              >
                Cancel
              </Button>
            </HStack>
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
