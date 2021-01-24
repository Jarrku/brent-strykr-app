export function DotsPatternSVG({
  id = '85737c0e-0916-41d7-917f-596dc7edfa27',
  className,
  width,
  height,
}: {
  className: string;
  id?: string;
  width: string;
  height: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${id})`} />
    </svg>
  );
}
