"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import "./EventGalleryPage.scss";

export type EventPhoto = {
  src: string;
  alt?: string;
};

type Props = {
  eventTitle: string;
  eventDate?: string;
  heroImage?: string;
  photos: EventPhoto[];
  backHref?: string;
};

const PHOTOS_PER_PAGE = 12;

export default function EventGalleryPage({
  eventTitle,
  eventDate,
  heroImage,
  photos,
  backHref = "/gallery",
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);
  const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
  const currentPhotos = photos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

  const openLightbox = useCallback((localIndex: number) => {
    setLightboxIndex(startIndex + localIndex);
  }, [startIndex]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
  }, [photos.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closeLightbox();
    },
    [prevPhoto, nextPhoto, closeLightbox]
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers array with ellipsis
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="egp">
       
      <div className="egp-hero">
        {heroImage && (
          <Image
            src={heroImage}
            alt={eventTitle}
            fill
            priority
            className="egp-hero__bg"
            sizes="100vw"
          />
        )}
        <div className="egp-hero__overlay" />
        <div className="egp-hero__content">
          <Link href={backHref} className="egp-hero__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All Events
          </Link>
          <h1 className="egp-hero__title">{eventTitle}</h1>
          {eventDate && <p className="egp-hero__date">{eventDate}</p>}
          <div className="egp-hero__meta">
            <span className="egp-hero__count">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              {photos.length} Photos
            </span>
          </div>
        </div>
      </div>

       <div className="egp-body">
        <div className="egp-container">

           <div className="egp-page-info">
            <span>
              Showing {startIndex + 1}–{Math.min(startIndex + PHOTOS_PER_PAGE, photos.length)} of {photos.length} photos
            </span>
            {totalPages > 1 && (
              <span>Page {currentPage} of {totalPages}</span>
            )}
          </div>

           <div className="egp-grid">
            {currentPhotos.map((photo, idx) => (
              <button
                key={idx}
                className="egp-photo"
                onClick={() => openLightbox(idx)}
                aria-label={`View photo ${startIndex + idx + 1}`}
              >
                <div className="egp-photo__inner">
                  <Image
                    src={photo.src}
                    alt={photo.alt ?? `Photo ${startIndex + idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="egp-photo__img"
                  />
                  <div className="egp-photo__hover">
                    <div className="egp-photo__zoom">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </div>
                    <span className="egp-photo__num">
                      {String(startIndex + idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

           {totalPages > 1 && (
            <nav className="egp-pagination" aria-label="Gallery pagination">
               <button
                className="egp-pagination__btn egp-pagination__btn--nav"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

               <div className="egp-pagination__pages">
                {getPageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span key={`ellipsis-${i}`} className="egp-pagination__ellipsis">
                      ···
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`egp-pagination__btn ${currentPage === page ? "egp-pagination__btn--active" : ""}`}
                      onClick={() => goToPage(page as number)}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

               <button
                className="egp-pagination__btn egp-pagination__btn--nav"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </nav>
          )}

        </div>
      </div>

       {lightboxIndex !== null && (
        <div
          className="egp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          onClick={closeLightbox}
        >
           <button className="egp-lightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

           <div className="egp-lightbox__counter">
            {lightboxIndex + 1} / {photos.length}
          </div>

           <button
            className="egp-lightbox__nav egp-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            disabled={lightboxIndex === 0}
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

           <div
            className="egp-lightbox__image-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt ?? `Photo ${lightboxIndex + 1}`}
              fill
              sizes="90vw"
              className="egp-lightbox__image"
              priority
            />
          </div>

           <button
            className="egp-lightbox__nav egp-lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            disabled={lightboxIndex === photos.length - 1}
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

           <div className="egp-lightbox__strip" onClick={(e) => e.stopPropagation()}>
            {photos.map((photo, i) => (
              <button
                key={i}
                className={`egp-lightbox__thumb ${i === lightboxIndex ? "egp-lightbox__thumb--active" : ""}`}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
              >
                <Image
                  src={photo.src}
                  alt={`Thumb ${i + 1}`}
                  fill
                  sizes="80px"
                  className="egp-lightbox__thumb-img"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}