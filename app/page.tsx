import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#161616]">

      {/* Navigation */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-[#F8F6F2]/80 backdrop-blur-xl border-b border-black/5">

  <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

    <Image
      src="/logo-black.png"
      alt="Studio J"
      width={170}
      height={40}
      className="h-auto"
      priority
    />

    <div className="hidden md:flex gap-10 text-sm font-medium">

      <a href="#">Services</a>
      <a href="#">About</a>
      <a href="#">Book</a>
      <a href="#">Portal</a>

    </div>

  </div>

</nav>

      {/* Hero */}

      <section className="flex items-center min-h-screen px-8">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl md:text-8xl font-bold leading-none">

            Create
            <br />
            Something
            <br />
            Extraordinary.

          </h1>

          <p className="mt-8 text-xl max-w-xl text-neutral-600">

            Premium cinematic films for businesses,
            brands, creators, and unforgettable moments.

          </p>

          <button className="mt-12 bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition">

            Start Your Project →

          </button>

        </div>

      </section>

    </main>
  );
}