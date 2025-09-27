import bg from "./BackgroundTriangleWrapper.module.css";

const BackgroundTriangleWrapper = () => {
  return (
    <div className={bg.root}>
      <div className={bg.wrapper} aria-hidden="true">
        <span />
        <span />
      </div>
    </div>
  );
};

export default BackgroundTriangleWrapper;