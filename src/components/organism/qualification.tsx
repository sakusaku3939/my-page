import qualification from "@/styles/qualification.module.css";

const Qualification = () => {
  return <>
    <div className={qualification.wrapper}>
      <Card title="基本情報技術者試験" period="2022年春期" institution="経済産業省">
        経済産業大臣が実施する国家試験である情報処理技術者試験の一区分。「高度 IT
        人材となるために必要な基本的知識・技能をもち、実践的な活用能力を身に付けた者」を対象とする。情報処理技術者試験制度のスキルレベル2に相当する。
      </Card>
      <Card title="ITパスポート試験" period="2020年秋期" institution="経済産業省">
        経済産業大臣が実施する国家試験である情報処理技術者試験の一区分。
        「職業人が共通に備えておくべき情報技術に関する基礎的な知識をもち、情報技術に携わる業務に就くか、担当業務に対して情報技術を活用していこうとする者」を対象とする。
      </Card>
    </div>
  </>;
};

type CardProps = {
  title: string
  period: string
  institution: string
  children: string
};

const Card = ({ title, period, institution, children }: CardProps) => {
  return <>
    <div className={qualification.card}>
      <div className={qualification.title}>{title}</div>
      <div className={qualification.subtitle}>{`${period}    ${institution}`}</div>
      <div className={qualification.description}>{children}</div>
    </div>
  </>;
};

export default Qualification;