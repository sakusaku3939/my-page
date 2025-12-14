import bg from "./BackgroundWrapper.module.css";

type Props = {
  children?: any
}

export const BackgroundWrapper = ({ children }: Props) => {
  return (
    <div className={bg.root}>
      {children}
    </div>
  );
};
