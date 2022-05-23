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
        <Textarea placeholder='Write your Goals' />
        <Button colorScheme="greenButton" variant='outline'>
          Save
        </Button>

        <FormLabel>Notes</FormLabel>
        <Textarea placeholder='Write some Notes' />
        <Button colorScheme="greenButton" variant='outline'>
          Save
        </Button>

        <FormLabel>Mentorship Status</FormLabel>
        <Select placeholder='End Mentorship?'>
          <option>Fisnish</option>
          <option>Long-term Mentorship</option>
        </Select>

      </FormControl></>
  );
}

export default Mentorship;