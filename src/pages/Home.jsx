const Home = () => {
  return (
    <section className="w-full h-screen relative">
      <iframe
        src="/landing.html"
        title="Landing Page"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 10,
        }}
      />
    </section>
  );
};

export default Home;
