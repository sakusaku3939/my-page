import timeline from "@/styles/timeline.module.css";

const Timeline = () => {
  return (
    <>
      <ul className={timeline.list}>
        <li>
          <div className={timeline.date}>2019.4 ~</div>
          <div className={timeline.title}>......</div>
        </li>
        <li>
          <div className={timeline.date}>2019.8 ~ </div>
          <div className={timeline.title}>......</div>
        </li>
        <li>
          <div className={timeline.date}>2016年05月</div>
          <div className={timeline.title}>......</div>
        </li>
        <li>
          <div className={timeline.date}>2018年01月</div>
          <div className={timeline.title}>......</div>
        </li>
        <li>
          <div className={timeline.date}>2019年03月</div>
          <div className={timeline.title}>......</div>
        </li>
      </ul>
    </>
  );
};

export default Timeline;