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

export const RelationshipEditor = ({ relationship, setEditMode, mutateRelationship }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: relationship,
  });
  const toast = useToast();

  console.log("relationship: ", relationship)

  const onSubmit = async (data) => {
    await fetch(`/api/relationships/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ relationship: data }),
    });
    mutateRelationship(data);
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex py={10}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <FormControl>
            <FormLabel htmlFor="mentee.name">Mentee Name</FormLabel>
            <Input
              placeholder=""
              readonly
              {...register("mentee.name")}
              id="mentee.name"
              type="text"
            />
            {/* <FormHelperText>
              Enter your current role and company, or anything that is relevant
              as your title.
            </FormHelperText> */}
          </FormControl>

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

            <FormLabel>Notes</FormLabel>
            <Textarea placeholder='Write some Notes' />
          </FormControl>
          <FormControl>
            <Button colorScheme="greenButton" variant='outline'>
              Save
            </Button>
          </FormControl>
          <FormControl>
            <FormLabel>Mentorship Status</FormLabel>
            <Select placeholder='End Mentorship?'>
              <option>Finish</option>
              <option>Long-term Mentorship</option>
            </Select>
          </FormControl>


          {/* <FormControl>
            <HStack spacing="24px">
              <Button colorScheme="greenButton" size="md" type="submit">
                Save
              </Button>
            </HStack>
          </FormControl> */}
        </VStack>
      </Flex>
    </form>
  );
};
