import bg from "./BackgroundTriangleWrapper.module.css";

type Props = {
  children?: any
}

export const BackgroundTriangleWrapper = ({ children }: Props) => {
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

export const BackgroundCircleWrapper = ({ children }: Props) => {
  return (
    <div className={bg.root}>
      <div className={bg.circleWrapper} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {children}
    </div>
  );
};