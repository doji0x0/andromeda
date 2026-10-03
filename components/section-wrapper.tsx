import type { HTMLAttributes, ReactNode } from "react"

type SectionTone = "deep" | "navy" | "medium" | "light" | "white"
type SectionEdgePosition = "top" | "bottom" | "both" | "none"
type SectionEdgeStyle = "curve" | "cut"

type SectionWrapperProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "div"
  children: ReactNode
  edge?: SectionEdgePosition
  edgeStyle?: SectionEdgeStyle
  topEdgeTone?: SectionTone
  bottomEdgeTone?: SectionTone
  nested?: boolean
  tone: SectionTone
}

const edgePaths: Record<SectionEdgeStyle, Record<"top" | "bottom", string>> = {
  curve: {
    top: "M0 0H1440V12C1190 48 938 18 710 31C432 47 226 35 0 54Z",
    bottom: "M0 31C238 13 438 28 696 20C950 12 1194 45 1440 19V64H0Z",
  },
  cut: {
    top: "M0 0H1440V16L1090 43L650 24L0 52Z",
    bottom: "M0 33L390 15L845 36L1440 18V64H0Z",
  },
}

function SectionEdge({
  position,
  style,
  tone,
}: {
  position: "top" | "bottom"
  style: SectionEdgeStyle
  tone: SectionTone
}) {
  return (
    <svg
      className={`section-edge section-edge-${position} section-edge-tone-${tone}`}
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={edgePaths[style][position]} />
    </svg>
  )
}

export function SectionWrapper({
  as: Component = "section",
  children,
  className = "",
  edge = "none",
  edgeStyle = "curve",
  topEdgeTone = "deep",
  bottomEdgeTone = "deep",
  nested = false,
  tone,
  ...props
}: SectionWrapperProps) {
  const hasTopEdge = edge === "top" || edge === "both"
  const hasBottomEdge = edge === "bottom" || edge === "both"
  const classes = [
    "section-wrapper",
    `section-tone-${tone}`,
    hasTopEdge && "has-top-edge",
    hasBottomEdge && "has-bottom-edge",
    nested && "section-wrapper-nested",
    className,
  ].filter(Boolean).join(" ")

  return (
    <Component className={classes} {...props}>
      {hasTopEdge && <SectionEdge position="top" style={edgeStyle} tone={topEdgeTone} />}
      {children}
      {hasBottomEdge && <SectionEdge position="bottom" style={edgeStyle} tone={bottomEdgeTone} />}
    </Component>
  )
}
