import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Switch } from '@chakra-ui/react'

export const MentorPreferencesEditor = ({ profile, setEditMode, mutateProfile }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
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
      <Flex py={10}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <FormControl isInvalid={errors.mentor?.calendly}>
            <FormLabel htmlFor="mentor.calendly">Calendar Event Link</FormLabel>
            <Input
              placeholder="Calendar link"
              {...register("mentor.calendly", 
                {
                  pattern: {
                    value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
                    message: "Invalid URL link."
                  } 
                }
              )}
              id="mentor.calendly"
            />
            {errors.mentor?.calendly && 
              <FormErrorMessage>{errors.mentor?.calendly.message}</FormErrorMessage>
            }            
            <FormHelperText>
              Your calendar event link will be used by your mentees to book your mentorship sessions. Pick yours from Calendly, Cal.com, or any other calendar event service.
            </FormHelperText>
          </FormControl>
          {/* <FormControl>
            <FormLabel htmlFor="mentor.shortterm">Short term mentorships?</FormLabel>
            <Switch
              {...register("mentor.shortterm")}
              id="mentor.shortterm"         
            />
            <FormHelperText>
              Are you available for short term mentorship sessions (e.g. a one time call)?
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mentor.longterm">Long term mentorships?</FormLabel>
            <Switch
              {...register("mentor.longterm")}
              id="mentor.longterm"         
            />
            <FormHelperText>
              Would you be available for at least one long term mentorship relationship?
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mentor.notifications">Receive expiring mentorship request notifications?</FormLabel>
            <Switch
              {...register("mentor.notifications")}
              id="mentor.notifications"         
            />
            <FormHelperText>
            A mentorship request expires in 7 days if not addressed. Would you like to receive a notification per email 48 hours before a mentorship request expires?
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mentor.incognito">Incognito Mode</FormLabel>
            <Switch
              {...register("mentor.incognito")}
              id="mentor.incognito"         
            />
            <FormHelperText>
            Your profile as mentor will be shown only to logged-in users.
            </FormHelperText>
          </FormControl> */}
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
      </Flex>
    </form>
  );
};
