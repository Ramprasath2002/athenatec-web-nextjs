import { notFound } from "next/navigation";
import EventGalleryPage, {
  EventPhoto,
} from "@/app/components/events/EventGalleryPage";

function generatePhotos(folder: string, count: number): EventPhoto[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/assets/images/events/${folder}/event-${String(i + 1).padStart(2, "0")}.webp`,
  }));
}

const EVENT_DATA: Record<
  string,
  {
    title: string;
    date: string;
    heroImage: string;
    photos: EventPhoto[];
  }
> = {
  "realize-live-americas-2025": {
    title: "Realize Live Americas 2025",
    date: "June 2025 · Nashville, TN",
    heroImage: "/assets/images/events/rla25/event-01.webp",
    photos: generatePhotos("rla25", 39),
  },

  "americas-partner-conference-2025": {
    title: "Americas Partner Conference 2025",
    date: "March 2025 · Dallas, TX",
    heroImage: "/assets/images/events/apc25/event-01.webp",
    photos: generatePhotos("apc25", 4),
  },
  "realize-live-americas-2024": {
    title: "Realize Live Americas 2024",
    date: "May 2024 · Detroit, MI",
    heroImage: "/assets/images/events/rla24/event-01.webp",
    photos: generatePhotos("rla24", 20),
  },

  "realize-live-europe-2024": {
    title: "Realize Live Europe 2024",
    date: "October 2024 · Munich, Germany",
    heroImage: "/assets/images/events/rle24/event-01.webp",
    photos: generatePhotos("rle24", 12),
  },
  "realize-live-americas-2023": {
    title: "Realize Live Americas 2023",
    date: "June 2023 · Las Vegas, NV",
    heroImage: "/assets/images/events/rla24/event-01.webp",
    photos: generatePhotos("rla23", 9),
  },
  "mes-industry-4-0-international-summit-2025": {
    title: "MES & Industry 4.0 International Summit 2025",
    date: "June 2025 · Las Vegas, NV",
    heroImage: "/assets/images/events/miis25/event-01.webp",
    photos: generatePhotos("miis25", 19),
  },

  "hannover-messe-2025": {
    title: "Hannover Messe 2025",
    date: "April 2025 · Hannover, Germany",
    heroImage: "/assets/images/events/hm25/event-01.webp",
    photos: generatePhotos("hm25", 11),
  },

  "industry-4-0-international-summit-2023": {
    title: "Industry 4.0 International Summit 2023",
    date: "June 2023 · Las Vegas, NV",
    heroImage: "/assets/images/events/i4is23/event-01.webp",
    photos: generatePhotos("i4is23", 23),
  }

};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = EVENT_DATA[slug];

  if (!event) return notFound();

  return (
    <EventGalleryPage
      eventTitle={event.title}
      eventDate={event.date}
      heroImage={event.heroImage}
      photos={event.photos}
      backHref="/gallery"
    />
  );
}
