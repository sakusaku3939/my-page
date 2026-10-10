import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  fetchMeetingAlarmSource,
  introductionContent,
  MEETING_ALARM_REVALIDATE_SECONDS,
  privacyContent,
  type MeetingAlarmContent,
} from "@/lib/meetingAlarmContent";
import styles from "./meeting-alarm.module.css";

interface Props {
  content: MeetingAlarmContent;
  privacy: boolean;
}

export default function MeetingAlarmPage({ content, privacy }: Props) {
  const canonical = `https://sakusaku3939.com/meeting-alarm${privacy ? "/privacy" : ""}`;
  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Head>
      <div className={styles.page}>
        <main className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { page: [] } }, { params: { page: ["privacy"] } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const privacy = Array.isArray(params?.page) && params.page[0] === "privacy";
  const source = await fetchMeetingAlarmSource(privacy ? "privacy.html" : "index.html");
  return {
    props: { content: privacy ? privacyContent(source) : introductionContent(source), privacy },
    revalidate: MEETING_ALARM_REVALIDATE_SECONDS,
  };
};
