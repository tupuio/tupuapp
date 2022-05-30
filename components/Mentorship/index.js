import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';


const onSubmit = async (data) => {
  const resp = await fetch("/api/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: data.message,
    }),
  });
  if (resp.status > 299) {
    toast({
      title: "Error",
      description: "Error creating request",
      status: "error",
      position: "top",
      isClosable: true,
    });
  } else {
    onClose();
  }
};

const mentorship = () => {

  return (
    <>
      <FormControl>

        <FormLabel>Goals</FormLabel>
        <Textarea placeholder='Write your Goals' />
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
    </>
  );
}

export default mentorship;