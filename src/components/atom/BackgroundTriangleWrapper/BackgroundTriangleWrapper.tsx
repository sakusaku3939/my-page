import bg from "./BackgroundTriangleWrapper.module.css";

type Props = {
  children?: any
}

const BackgroundTriangleWrapper = ({children}: Props) => {
  return (
    <div className={bg.root}>
      <div className={bg.wrapper} aria-hidden="true">
        <span />
        <span />
      </div>
      {children}
    </div>
  );
};

export default BackgroundTriangleWrapper;