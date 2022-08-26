import { Select, Input, Button, Box, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import getPoem from "../http";

const TERM_PLACEHOLDERS = {
  "": "Selecciona una categoría para poder escribir acá.",
  default: "Selecciona una categoría para poder escribir acá.",
  author: "Ejemplo: \"Edgar Allan Poe\"",
  title: "Ejemplo: \"The Raven\"",
};

interface Poem {
 author: string;
 linecount: string;
 lines: Array<string>;
 title: string;
}

const Search = () => {
  const [poem, setPoem] = useState<Poem>({ author: "", linecount: "", lines: [], title: "" });
  const [category, setCategory] = useState<string>("default");
  const [term, setTerm] = useState("");
  const [hasPoem, setHasPoem] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = async () => {
    setIsFetching(true);
    setHasPoem(false);

    try {
      const { data: poems } = await getPoem(category, term);

      const newPoem: Poem = poems[Math.floor(Math.random() * poems.length)];
      const firstBreaklineIdx = newPoem.lines.findIndex((line) => line === "");
      const linesToKeep = newPoem.lines.slice(0, firstBreaklineIdx);
      newPoem.lines = linesToKeep;

      setPoem(newPoem);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (poem.author !== "") setHasPoem(true);
  }, [poem]);

  return (
    <>
      <Box mb="8">
        <Text fontSize="sm">
          - ¿Qué es esto?<br/><i>Un buscador de poemas.</i><br/><br/>

          - ¿TODOS los poemas existentes?<br/><i>No; el buscador solo consigue poemas escritos en inglés.</i><br/>
        </Text>
      </Box>

      <Select
        placeholder="¿Qué quieres buscar?"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="author">Autor</option>
        <option value="title">Título</option>
      </Select>

      <Input
        mt="4"
        disabled={isFetching || category === "default" || category === ""}
        placeholder={TERM_PLACEHOLDERS[category as keyof typeof TERM_PLACEHOLDERS]}
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />

      <Button
        mt="4"
        width="100%"
        disabled={category === "default" || category === "" || term === ""}
        isLoading={isFetching}
        onClick={handleSearch}
      >Buscar</Button>

      {
        hasPoem && (
          <Box mt="8">
            <Heading as="h1" size="lg">{poem.title}</Heading>
            <Heading as="h2" size="md" my="4"><i>by</i> {poem.author}</Heading>

            <Text>
              {
                poem.lines.map((line, idx) => {
                  return (
                    <i key={idx}>
                      {line}<br/>
                    </i>
                  )
                })
              }
            </Text>
          </Box>
        )
      }
    </>
  )
};

export default Search;
