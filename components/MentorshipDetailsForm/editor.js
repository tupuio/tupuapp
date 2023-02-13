import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from '@chakra-ui/react';
import { Flex, HStack, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";

export const MentorshipDetailsEditor = ({ data: relationship, mutate, setEditMode }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: relationship,
  });
  const toast = useToast();

  console.log("relationship: ", relationship)

  const onSubmit = async (data) => {
    await fetch(`/api/relationships/${relationship.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ relationship: data }),
    });
    mutate(relationship);
  };
  const handleCancelEditClick = (ev) => {
    setEditMode(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex py={10}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <FormControl>
            <FormLabel htmlFor="goals">Goals</FormLabel>
            <Textarea
              {...register("goals")}
              id="goals"
              placeholder="-"
              rows={6}
            />
            <FormHelperText>
              goals description.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Textarea
              placeholder='Write some Notes'
              {...register("notes")}
              id="notes"
              rows={6} />
            <FormHelperText>
              notes helper.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <HStack spacing="24px">
              <Button colorScheme="greenButton" size="md" type="submit">
                Save
              </Button>
              <Button onClick={handleCancelEditClick} colorScheme={"grayButton"} size="md">
                Cancel
              </Button>
            </HStack>           
          </FormControl>
        </VStack>
      </Flex>
    </form>
  );
};
