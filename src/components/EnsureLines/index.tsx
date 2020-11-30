import * as React from "react";
interface Props {
    title: string;
    ensuredLinesCount: number;
    className?: string;
}

const EnsureLines: React.FC<Props> = ({ title, ensuredLinesCount, className, ...rest }) => (
    <span
        title={title}
        className={className}
        style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: ensuredLinesCount,
            overflow: "hidden",
        }}
        {...rest}
    >
    {title}
  </span>
);

export default EnsureLines;
