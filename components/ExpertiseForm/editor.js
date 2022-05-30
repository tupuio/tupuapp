import { Button } from "@chakra-ui/button";
import {CheckboxGroup, Checkbox} from "@chakra-ui/checkbox";
import { SimpleGrid } from "@chakra-ui/react";
import { Stack } from '@chakra-ui/react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";

import { Input } from "@chakra-ui/input";
import { Flex, HStack, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";

export const ExpertiseEditor = ({ expertise, setEditMode, mutateExpertise }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: expertise,
  });
  const toast = useToast();

  const onSubmit = async (data) => {
    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile: data }),
    });
    mutateExpertise(data);
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex py={10}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <CheckboxGroup 
          {...register("mentor.general_expertise")}
          id="mentor.general_expertise"
          colorScheme='green' defaultValue={[]}>
          <SimpleGrid columns={{sm: 2, md: 4}} spacing={5}>
            <Checkbox value='businessdevel'>Business Development</Checkbox>
            <Checkbox value='careergrowth'>Career Growth</Checkbox>
            <Checkbox value='communitymaker'>Community Maker</Checkbox>
            <Checkbox value='customersupport'>Customer Support</Checkbox>
            <Checkbox value='customersuccess'>Customer Success</Checkbox>
            <Checkbox value='datascience'>DataScience & Analytics</Checkbox>
            <Checkbox value='engmanagement'>Engineering Management</Checkbox>
            <Checkbox value='hrrecruiting'>HR & Recruiting</Checkbox>  
            <Checkbox value='hrinclusion'>HR & Inclusion</Checkbox>  
            <Checkbox value='productmanagement'>Product Management</Checkbox> 
            <Checkbox value='projectmanagement'>Project Management</Checkbox> 
            <Checkbox value='marketing'>Marketing</Checkbox> 
            <Checkbox value='sales'>Sales</Checkbox> 
            <Checkbox value='startup'>Startup</Checkbox> 
            <Checkbox value='uiux'>UI/UX Design & Research</Checkbox> 
          </SimpleGrid>
        </CheckboxGroup>
        <CheckboxGroup
          {...register("mentor.dev_expertise")}
          id="mentor.dev_expertise"
          colorScheme='green' defaultValue={['', '']}>
          <SimpleGrid columns={{sm: 2, md: 4}} spacing={5}>
            <Checkbox value='softarchitecture'>Software Architecture</Checkbox>
            <Checkbox value='frontenf'>Front End</Checkbox> 
            <Checkbox value='backend'>Back End</Checkbox> 
            <Checkbox value='fullstack'>Full Stack</Checkbox> 
            <Checkbox value='webdevel'>Web Development</Checkbox> 
            <Checkbox value='appdevel'>App End</Checkbox> 
            <Checkbox value='devopssre'>DevOps/Site Reliability Engineering</Checkbox>
          </SimpleGrid>
        </CheckboxGroup> */}
        <Stack spacing={3}>
          <FormControl>
            <FormLabel htmlFor="mentor.other_knowledge">Other knowledge</FormLabel>
            <Textarea
              {...register("mentor.other_knowledge")}
              id="mentor.other_knowledge"
              placeholder="Code Challenges"
              rows={6}
            />
            <FormHelperText>
              Other knowledge areas you would like to share with mentees. One category per line.
            </FormHelperText>
          </FormControl>
        </Stack>
          
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
