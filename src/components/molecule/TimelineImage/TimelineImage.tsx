import timeline from "@/components/molecule/TimelineImage/TimelineImage.module.css";
import Link from "next/link";
import { useState } from "react";

type TimelineImageProps = {
  title: string
  period: string
  imageUrl: string
  href?: string
  target?: string
  showModal?: boolean
};

const TimelineImage = ({
                         title,
                         period,
                         imageUrl,
                         href,
                         target = "_blank",
                         showModal = false
                       }: TimelineImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (showModal) {
      e.preventDefault();
      setIsModalOpen(true);
      setIsClosing(false);
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const content = (
    <div
      className={timeline.imageLinkContent}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={handleClick}
    >
      <div className={timeline.imageLinkOverlay}>
        <div className={timeline.imageLinkText}>
          <div className={timeline.imageLinkTitle}>{title}</div>
          <div className={timeline.imageLinkPeriod}>{period}</div>
        </div>
      </div>
      {!showModal && <div className={timeline.imageLinkArrow}>→</div>}
    </div>
  );

  // モーダルがクローズ状態の時は完全に非表示
  if (!isModalOpen && !isClosing) {
    return (
      <>
        {href && !showModal ? (
          <Link className={timeline.imageLink} href={href} target={target}>
            {content}
          </Link>
        ) : (
          <div className={`${timeline.imageLink} ${showModal ? timeline.clickable : ""}`}>
            {content}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {href && !showModal ? (
        <Link className={timeline.imageLink} href={href} target={target}>
          {content}
        </Link>
      ) : (
        <div className={`${timeline.imageLink} ${showModal ? timeline.clickable : ""}`}>
          {content}
        </div>
      )}

      <div
        className={`${timeline.modal} ${isClosing ? timeline.modalClosing : ""}`}
        onClick={handleModalClick}
      >
        <div className={`${timeline.modalContent} ${isClosing ? timeline.modalContentClosing : ""}`}>
          <button className={timeline.closeButton} onClick={closeModal}>
            <span>×</span>
          </button>
          <img src={imageUrl} alt={title} className={timeline.modalImage} />
          <div className={timeline.modalOverlay}>
            <h3 className={timeline.modalTitle}>{title}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineImage;