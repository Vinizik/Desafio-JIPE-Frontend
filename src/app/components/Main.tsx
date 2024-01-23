"use client";

import { useState } from "react";
import { api } from "../services/api";
import { pages } from "next/dist/build/templates/app-page";

interface Car {
  id: number;
  name: string;
  price: number;
  km: number;
}

export function Main() {
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [kmInput, setKmInput] = useState(0);
  const [cars, setCars] = useState<Car[]>([]);
  const [inputId, setInputId] = useState(0);

  async function handleAddCar(name: string, price: number, km: number) {
    try {
      const response = await api.post("/cars", {
        nome: name,
        preco: price,
        kilometragem: km,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Carro adicionado com sucesso!");
  }

  async function handleDeleteCar(carId: number) {
    try {
      const response = await api.delete(`/cars/${carId}`, {
        id: carId,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Carro deletado com sucesso!");
  }

  async function handleEditCar(
    carId: number,
    name: string,
    price: number,
    km: number
  ) {
    try {
      const response = await api.put(`/cars/${carId}`, {
        id: carId,
        nome: name,
        preco: price,
        kilometragem: km,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Carro editado com sucesso!");
  }

  async function loadCars() {
    console.log("Carregando os carros");
    try {
      const response = await api.get("/cars");
      console.log(response.data);
      setCars(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-row flex-wrap gap-10 m-auto justify-evenly items-center">
        <fieldset className="flex flex-col gap-5 justify-center items-center rounded-sm w-auto">
          <button
            className="border bg-[#222] text-white p-3 hover:text-[#ffbb33]"
            onClick={loadCars}
          >
            Carregar carros
          </button>
        </fieldset>
        <fieldset className="flex flex-col gap-5 justify-center items-center border border-solid border-black p-4 rounded-sm w-auto">
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="Nome"
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="Preço"
            onChange={(e) => {
              setPriceInput(Number(e.target.value));
            }}
          />
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="Kilometragem"
            onChange={(e) => {
              setKmInput(Number(e.target.value));
            }}
          />
          <button
            className="border bg-[#222] text-white p-3 hover:text-[#ffbb33]"
            onClick={() => {
              handleAddCar(nameInput, priceInput, kmInput);
              window.alert("Carro adicionado com sucesso!");
              window.location.reload();
            }}
          >
            Adicionar carro
          </button>
        </fieldset>
        <fieldset className="flex flex-col gap-5 justify-center items-center border border-solid border-black p-4 rounded-sm w-auto">
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="ID do Carro"
            onChange={(e) => {
              setInputId(Number(e.target.value));
            }}
          />
          <button
            className="border bg-[#222] text-white p-3 hover:text-[#ffbb33]"
            onClick={() => {
              handleDeleteCar(inputId);
              window.alert("Carro deletado com sucesso!");
              window.location.reload();
            }}
          >
            Deletar carro
          </button>
        </fieldset>
        <fieldset className="flex flex-col gap-5 justify-center items-center border border-solid border-black p-4 rounded-sm w-auto">
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="ID do Carro"
            onChange={(e) => {
              setInputId(Number(e.target.value));
            }}
          />
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="Novo nome"
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="Novo preço"
            onChange={(e) => {
              setPriceInput(Number(e.target.value));
            }}
          />
          <input
            className="border border-black p-3 rounded-none placeholder:text-[#7b7b7b]"
            type="text"
            placeholder="Nova kilometragem"
            onChange={(e) => {
              setKmInput(Number(e.target.value));
            }}
          />
          <button
            className="border bg-[#222] text-white p-3 hover:text-[#ffbb33]"
            onClick={() => {
              handleEditCar(inputId, nameInput, priceInput, kmInput);
              window.alert("Carro editado com sucesso!");
              window.location.reload();
            }}
          >
            Editar carro
          </button>
        </fieldset>
      </div>
      <div className="flex flex-col mt-4">
        <ul className="py-4 text-center">
          {cars.map((item) => (
            <li key={item.id}>
              ID: {item.id} / NAME: {item.nome} / PRICE: {item.preco} / KM:{" "}
              {item.kilometragem}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
