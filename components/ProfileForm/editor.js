import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, HStack, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { Select } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useState, useMemo } from "react";
import { Image } from "@chakra-ui/image";
import { useToast } from "@chakra-ui/toast";
import spacetime from 'spacetime'
import soft from 'timezone-soft'
import allTimezones from "./timezone-list";

export const ProfileEditor = ({ profile, setEditMode, mutateProfile }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: profile,
  });
  const [pictureUrl, setPictureUrl] = useState(profile.picture || "");
  const toast = useToast();

  const ikPublicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const ikUrlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const ikAuthenticationEndpoint = "/api/imagekit/auth";

  // returns client's timezone, could use as default value
  // const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  // to test use: console.log(timeZone);

  const onSubmit = async (data) => {
    if (pictureUrl) {
      data.picture = pictureUrl;
    }
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

  const onImgUploadError = async (err) => {
    toast({
      title: "Error",
      description: "Error uploading image",
      status: "error",
      position: "top",
      isClosable: true,
    });
    console.log("error uploading image", err);
  };

  const onImgUploadSuccess = async (data) => {
    setPictureUrl(data.url);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  }

  const timezonesEntries = useMemo(() => {
    return Object.entries(allTimezones);
  }, [allTimezones])
  
  const currentTimezone = spacetime.now().timezone().name;
  const [currentArea, currentCity] = currentTimezone.split('/');
  // if currentTimezone === "Europe/Berlin" then select
  // ['Europe/Amsterdam', 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna']
  // and returns the index [0] -> 'Europe/Amsterdam'
  const timezonesDefaultValue = useMemo(() => {
    const timezone = timezonesEntries.filter(
      ([key, value]) => {
        const area = key.split('/')[0]; // 'Europe/Amsterdam'
        const cities = value.split(', '); // 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'
        return currentArea === area && cities.includes(currentCity);
      }); // [['Europe/Amsterdam']]
    return (timezone.length > 0) ? timezone[0][0] : null;
  }, [timezonesEntries, currentArea, currentCity]);

  const timezonesOptions = useMemo(() => {
    return timezonesEntries
      .reduce((selectOptions, zone) => {
        const now = spacetime.now(zone[0])
        const tz = now.timezone()
        const tzStrings = soft(zone[0])

        let abbr = now.isDST() 
          ? tzStrings[0].daylight?.abbr : tzStrings[0].standard?.abbr
        let altName = now.isDST()
          ? tzStrings[0].daylight?.name
          : tzStrings[0].standard?.name

        const min = tz.current.offset * 60
        const hr =
          `${(min / 60) ^ 0}:` + (min % 60 === 0 ? '00' : Math.abs(min % 60))
        const label = `(GMT${hr.includes('-') ? hr : `+${hr}`}) ${zone[1]}`
        selectOptions.push({
          value: tz.name,
          label: label,
          offset: tz.current.offset,
          abbrev: abbr,
          altName: altName,
        })

        return selectOptions
      }, [])
      .sort((a, b) => a.offset - b.offset)
  }, [allTimezones])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex py={10}>
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              {...register("name")}
              id="name"
              width={400}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              {...register("title")}
              id="title"
            />
            <FormHelperText>
              Enter your current role or anything that is relevant
              as your title.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="company">Company</FormLabel>
            <Input
              {...register("company")}
              id="company"
            />
            <FormHelperText>
              Enter your current company, if you like.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="seniority">Seniority</FormLabel>
            <Input
              {...register("seniority")}
              id="seniority"
            />
            <FormHelperText>
              How many years of experience do you have?
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
              type="url"
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
              type="url"
            />
            <FormHelperText>
              Enter the URL of your LinkedIN profile.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="languages">Languages</FormLabel>
            <Input
              {...register("languages")}
              id="languages"
            />
            <FormHelperText>
              Which languages do you speak?
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="timezone">Timezone</FormLabel>
            <Select
              placeholder="Select your timezone"
              {...register("timezone")}
              id="timezone"
              defaultValue={timezonesDefaultValue}
              >
              {timezonesOptions.map( option =>
                <option key={option.value} value={option.value}>{option.label}</option> )
              }
            </Select>
            <FormHelperText>
              What is your current timezone?
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
        >
          <FormControl>
            <FormLabel htmlFor="picture">Picture</FormLabel>
            <IKContext
              publicKey={ikPublicKey}
              urlEndpoint={ikUrlEndpoint}
              authenticationEndpoint={ikAuthenticationEndpoint}
            >
              <IKUpload
                id="picture"
                onError={onImgUploadError}
                onSuccess={onImgUploadSuccess}
              />
            </IKContext>
            <FormHelperText>
              Upload a photo of you. Images that are square and have a witdh of
              at least 600px tend to work best.
            </FormHelperText>
          </FormControl>
          {pictureUrl && (
            <Image alt="Preview" src={pictureUrl + "?tr=w-300,h-300,fo-auto"} />
          )}
        </VStack>
      </Flex>
    </form>
  );
};
