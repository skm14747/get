import type { MessageKey } from "@/locales/en";

export const locale = "pt-BR" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "Ir para o conteúdo",
  home: "Início",
  privacy: "Privacidade",
  contact: "Contato",
  toolsNav: "Ferramentas",
  siteNav: "Site",
  footerNote: "Cada ferramenta funciona no seu navegador. Nada sai da página.",
  consent:
    "A medição opcional registra qual ferramenta foi usada. Não registra o texto digitado nem os números calculados. Nada é enviado até que um endereço de análise seja configurado.",
  allowMeasurement: "Permitir medição",
  denyMeasurement: "Não permitir",
  notFoundTitle: "Página não encontrada",
  notFoundBody: "Esse endereço não corresponde a nenhuma das ferramentas deste site.",
  notFoundLink: "Voltar às ferramentas",
};
