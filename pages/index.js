import useSWR from "swr";
import { useRouter } from 'next/router'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ mode }) {
  const { data: requestsData } = useSWR("/api/requestsCount", fetcher);
  const { data: menteesData } = useSWR("/api/menteesCount", fetcher);
  const { data: profile, isLoading: isProfileLoading } = useSWR("/api/profile", fetcher);
  const { data: applicationsData } = useSWR("/api/applicationsCount", fetcher);
  const { data: mentorshipsData } = useSWR("/api/mentorshipsCount", fetcher);

  const router = useRouter();

  let homePath = '/profile';

  // wait for the profile data to load first so we can check if the user has been published
  // before loading the first page
  if (!profile || isProfileLoading) {
    return <>Loading...</>
  }

  // the only page an unpublished user can access is the profile page
  if (!profile.published) {
    router.push(homePath);
    return <></>;
  }

  if (mode === "mentor") {
    const requestsCount = requestsData?.count || 0;
    const menteesCount = menteesData?.count || 0;

    if (profile && !profile?.mentor?.calendly) {
      // will go to the profile to let the mentor set their calendar link
      homePath = '/preferences';
    } else if (requestsCount) {
      homePath = '/requests';
    } else if (menteesCount) {
      homePath = '/mentees';
    }
  } if (mode === "mentee") {
    const applicationsCount = applicationsData?.count || 0;
    const mentorshipsCount = mentorshipsData?.count || 0;
    if (mentorshipsCount) {
      homePath = '/mentorships';
    } else if (applicationsCount) {
      homePath = '/applications';
    } else {
      homePath = '/mentors';
    }
  }
  router.push(homePath);
  return <></>;
}
