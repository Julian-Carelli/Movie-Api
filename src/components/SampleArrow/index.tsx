const SampleArrow = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <div
    className={className}
    style={{
      display: 'block',
    }}
    onClick={onClick}
  />
);

export { SampleArrow };
