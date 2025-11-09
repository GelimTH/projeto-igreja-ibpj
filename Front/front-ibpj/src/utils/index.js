const pageMapping = {
  Home: "/",
  Eventos: "/eventos",
  Aniversariantes: "/aniversariantes",
  Programacao: "/programacao",
  Generosidade: "/generosidade",
  Principios: "/principios",
  Contato: "/contato",
  QuemSomos: "/quem-somos",
};

export const createPageUrl = (pageName) => {
  return pageMapping[pageName] || "/";
};