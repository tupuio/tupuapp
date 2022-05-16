import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const mentorship = () => {
  return (
    <>
      <FormControl>

        <FormLabel>Goals</FormLabel>
        <Input placeholder='Write your Goals' />
        <Button colorScheme="greenButton" variant='outline'>
          Save
        </Button>

        <FormLabel>Notes</FormLabel>
        <Input placeholder='Write some Notes' />
        <Button colorScheme="greenButton" variant='outline'>
          Save
        </Button>

      </FormControl></>
  );
}

