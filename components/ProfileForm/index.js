import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { Form, useFormik } from "formik";

const ProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const marginElTop = "16px";

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid templateColumns="repeat(10, 1fr)" gap={4}>
        <GridItem colSpan={7}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" width={400} />
          </FormControl>
          <FormControl mt={marginElTop}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl mt={marginElTop}>
            <FormLabel htmlFor="twitter">Twitter</FormLabel>
            <Input id="twitter" />
          </FormControl>
          <FormControl mt={marginElTop}>
            <FormLabel htmlFor="linkedin">Linkedin</FormLabel>
            <Input id="linkedin" />
          </FormControl>
          <FormControl mt={marginElTop}>
            <FormLabel htmlFor="biography">Biography</FormLabel>
            <Textarea
              id="biography"
              placeholder="Write a bit about yourself"
              rows={6}
            />
          </FormControl>
        </GridItem>
      </Grid>

      <Button mt={4} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ProfileForm;
