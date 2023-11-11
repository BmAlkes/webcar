import React from "react";
import Container from "../../components/container";

const Home = () => {
  return (
    <Container>
      {/* section car */}
      <section className="bg-white rounded-lg  w-full max-w-3xl mx-auto flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Type car name"
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text text-lg text-ellipsis">
          Search
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        New and used cars throughout Israel
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <section className="shadow-lg w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2023/202311/20231104/chevrolet-tracker-1.2-turbo-flex-premier-automatico-wmimagem14535219438.jpg?s=fill&w=552&h=414&q=60"
            alt="Carro"
          />
          <p className="font-bold mt-1 mb-2 px-2">Chevrolet Tracket</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">
              Year 2020/2021 | 57.000 km
            </span>
            <strong className="text-black font-medium text-xl">116.000</strong>

            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div className="px-2 pb-2">
              <span className="text-zinc-700">Holon</span>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
};

export default Home;
