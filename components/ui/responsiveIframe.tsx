interface ResponsiveIframeProps {
  src: string;
  title: string;
}

export function ResponsiveIframe({ src, title }: ResponsiveIframeProps) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
        background: "#000",
      }}
    >
      <iframe
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
