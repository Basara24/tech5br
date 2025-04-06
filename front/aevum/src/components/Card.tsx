import "./Card.css";

type CardProps = {
  content: string;
  title: string;
  footer?: string;
};

const Card = ({ content, title, footer }: CardProps) => {
  return (
    <div className="card">
      <div className="header">{title}</div>
      <div className="body">{content}</div>
      {footer ? <div className="footer">Footer</div> : null}
    </div>
  );
};

export default Card;
