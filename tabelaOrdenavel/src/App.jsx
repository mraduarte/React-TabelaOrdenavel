import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

const TableSortable = () => {
  const [data] = useState([
  { nome: "Ana", idade: 25, cargo: "Engenheira" },
  { nome: "João", idade: 30, cargo: "Desenvolvedor" },
  { nome: "Maria", idade: 22, cargo: "Designer" },
  { nome: "Carlos", idade: 40, cargo: "Gerente" },
  { nome: "Sofia", idade: 28, cargo: "Analista" },
  { nome: "Pedro", idade: 35, cargo: "Arquiteto" },
  { nome: "Laura", idade: 26, cargo: "Product Owner" },
  { nome: "Bruno", idade: 32, cargo: "Tester" },
  { nome: "Fernanda", idade: 29, cargo: "Scrum Master" },
  { nome: "Rafael", idade: 38, cargo: "Tech Lead" },
  { nome: "Juliana", idade: 27, cargo: "UX Researcher" },
  { nome: "Lucas", idade: 31, cargo: "DBA" },
  { nome: "Patrícia", idade: 24, cargo: "QA Engineer" },
  { nome: "Thiago", idade: 36, cargo: "DevOps" },
  { nome: "Camila", idade: 33, cargo: "PM" },
  { nome: "Eduardo", idade: 41, cargo: "CTO" },
  { nome: "Aline", idade: 23, cargo: "Suporte Técnico" },
  { nome: "Vinícius", idade: 39, cargo: "SysAdmin" },
  { nome: "Isabela", idade: 34, cargo: "Eng. de Dados" },
  { nome: "Marcos", idade: 29, cargo: "Desenvolvedor" },
  { nome: "Tatiane", idade: 37, cargo: "PO" },
  { nome: "Fábio", idade: 30, cargo: "Analista de BI" },
  { nome: "Renata", idade: 26, cargo: "Especialista em Redes" },
  { nome: "Igor", idade: 28, cargo: "Full Stack" },
  { nome: "Beatriz", idade: 31, cargo: "Frontend" },
]);

  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      if (typeof a[sortConfig.key] === "number") {
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      } else {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter(
    (row) =>
      row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onColumnClick = (key) => {
    let direction = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  return (
    <div className="container">
      <h1>Tabela de usuários</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table>
        <TableHeader onColumnClick={onColumnClick} />
        <tbody>
          {filteredData.map((row, index) => (
            <TableRow key={index} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSortable;