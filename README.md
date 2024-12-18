# **Animal Crossing Villager Finder**

## **Introdução**

No âmbito do Mini Projeto 2 da unidade curricular de Tecnologias e Desenvolvimento Web (TDW), foi-nos proposto o desenvolvimento de uma aplicação front-end em React que consome e apresenta informações provenientes de uma API. Escolhi como tema algo que me é familiar e que pode ser útil no meu dia a dia: o Animal Crossing Villager Finder.

## **Objetivos**

O principal objetivo deste projeto foi desenvolver uma aplicação que permita aos utilizadores visualizar informações sobre os habitantes (villagers) do jogo Animal Crossing: New Horizons. A aplicação deveria ser intuitiva, eficiente e proporcionar uma experiência agradável ao utilizador.

## **Tecnologias Utilizadas**

- **React**: Framework para construção da interface.
- **Styled Components**: Para estilização modular e reutilizável.
- **React Router**: Para gestão da navegação entre páginas.
- **Redux e Redux Toolkit**: Para gestão de estado.
- **RTK Query**: Para consumo de dados da API.
- **Nookipedia API**: Fonte de dados sobre os villagers.
- **Local Storage**: Para guardar os villagers favoritos no navegador.
- **GitHub Actions**: Para configuração de uma pipeline de integração contínua.

## **Funcionalidades**

### **Pesquisa de Villagers**

A aplicação permite aos utilizadores pesquisar villagers através de filtros, de personalidade e marcar favoritos para facilitar o acesso posterior.

### **Guardar Villagers Favoritos**

Os utilizadores podem guardar os seus villagers favoritos, permitindo um acesso mais rápido e personalizado.

### **Visualização de Detalhes**

Ao clicar num villager, é apresentada uma modal com informações detalhadas, como o nome, espécie, personalidade, aniversário e a sua frase característica.

### **Paginação**

Para facilitar a navegação, foi implementada a funcionalidade de paginação, que apresenta um número limitado de villagers por página.

## **Implementação**

### **Estrutura do Projeto**

O projeto foi organizado principalmente dentro do componente Home, com algumas funcionalidades executadas dentro de outros componentes.

![arquitetura_app.png](./arquitetura_app.png)

### **Consumo da API**

Utilizei o Redux Toolkit Query para realizar chamadas à Nookipedia API, incluindo nos cabeçalhos a chave de API e a versão necessária, conforme especificado pela documentação da mesma. A integração com a API foi essencial para obter dados atualizados sobre os villagers.

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

export const nookipediaApi = createApi({
  reducerPath: "nookipediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", apiKey);
      headers.set("Accept-Version", "1.7.0");
      return headers;
    },
    async onError({ error, meta }) {
      console.error("API Error:", error);
    },
  }),
  endpoints: (builder) => ({
    getVillagers: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `villagers?${queryString}`;
      },
    }),
  }),
});

export const { useGetVillagersQuery } = nookipediaApi;
```

### **Filtros e Paginação**

Os filtros foram implementados para facilitar a pesquisa por personalidade dos villagers. Já a paginação melhora a experiência do utilizador, limitando o número de resultados exibidos por página.

```jsx
const getFilteredVillagers = useCallback(() => {
  if (filter === "fav") {
    return favVillagers;
  } else if (filter === "All") {
    return villagers;
  } else {
    const personalityFilterItem = personalityFilter.find(
      (pf) => pf.name.toLowerCase() === filter.toLowerCase()
    );
    if (personalityFilterItem) {
      return villagers.filter(
        (villager) =>
          villager.personality.toLowerCase() === filter.toLowerCase()
      );
    }
  }
  return villagers;
}, [filter, favVillagers, villagers, personalityFilter]);
```

```jsx
for (let i = 1; i <= Math.ceil(totalVillagers / villagersPerPage); i++) {
  pageNumbers.push(i);
}
```

### **Favoritos**

Os favoritos são guardados no Local Storage, proporcionando persistência mesmo após recarregar a página.

```jsx
useEffect(() => {
  localStorage.setItem("favVillagers", JSON.stringify(favVillagers));
}, [favVillagers]);
```

### Pipeline

Configurei uma pipeline utilizando GitHub Actions. Esta pipeline automatiza tarefas como a validação do código e implementação contínua.

### **Estilização**

A estilização foi realizada com CSS e e alguns Styled Components, permitindo uma personalização por componente e garantindo uma interface limpa e consistente. A utilização de Styled Components facilitou a manutenção do código e a aplicação de estilos específicos a cada componente.

```jsx
export const FilterButton = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
```

## **Desafios**

### **Reducers**

Inicialmente, toda a lógica da aplicação estavaconcentrada num único ficheiro, o que tornou o código desorganizado e difícil de gerir. Este problema tornou-se evidente quando comecei a implementar os reducers, pois a falta de separação entre as funcionalidades dificultava o trabalho e causou erros desnecessários que atrasaram o processo.

### **Implementação da Paginação**

A centralização inicial do código também causou dificuldades na implementação da funcionalidade de paginação. A estrutura rígida e pouco modular dificultava a integração de novos recursos, como o controlo do número de villagers exibidos por página.

### **Problemas de CORS**

Inicialmente, deparei-me com problemas de CORS ao testar APIs que não requeriam chaves de acesso. Para contornar este problema, optei pela Nookipedia API, que fornece a documentação e suporte necessários para utilização segura e eficiente. A configuração correta dos cabeçalhos e a utilização de um proxy durante o desenvolvimento ajudaram a resolver os problemas de CORS.

### **Estilização com Styled Components**

A transição de CSS tradicional para Styled Components apresentou alguns desafios, como todo o estilo até ao momento tinha sido feito usando CSS.

## **Obstáculos não ultrapassados**

Como fiz basicamente toda a implementação num só ficheiro, posteriormente, ao tentar dividir em diferentes componentes foi bastante complicado. Desisti de o fazer e então tenho um ficheiro principal um pouco extenso. No meu próximo projeto vou tentar definir os componentes mais cedo para não voltar a encontrar este problema.

## Trabalho futuro

Embora a aplicação desenvolvida cumpra os requisitos estabelecidos e os objetivos definidos para o projeto, acredito que há espaço para melhorias e funcionalidades adicionais que poderiam enriquecer ainda mais a experiência do utilizador.

Com mais tempo, planeava implementar:

- **Filtro por Espécie**: Complementar os filtros atuais (personalidade) com a possibilidade de filtrar os villagers pela sua espécie, oferecendo maior flexibilidade na pesquisa.
- **Autenticação de Utilizadores**: Introduzir um sistema de login, permitindo aos utilizadores criar contas e guardar as suas preferências de forma personalizada e persistente. Este recurso tornaria a aplicação mais envolvente e adaptada às necessidades de cada utilizador.

Estas melhorias poderiam elevar significativamente o valor da aplicação, tornando-a ainda mais prática e atrativa para os fãs de Animal Crossing.

## **Conclusão**

O desenvolvimento do Animal Crossing Villager Finder foi uma experiência enriquecedora, permitindo-me aplicar os conhecimentos adquiridos na UC de TDW. A aplicação atinge os objetivos definidos, proporcionando uma ferramenta prática e intuitiva para os fãs de Animal Crossing. Além disso, o projeto contribuiu para o meu desenvolvimento técnico, particularmente no consumo de APIs, gestão de estado e boas práticas em React.

Estou satisfeita com o resultado final e acredito que a aplicação oferece uma experiência de utilizador agradável e funcional. Tentarei dar continuidade ao projeto, implementando funcionalidades que acredito terem valor para os potenciais utilizadores.

## Mudanças depois da data original

Alterei a forma como a aplicação obtém e apresenta a informação na modal de cada villager. Reestruturei parte do código, adicionando comentários para melhorar a legibilidade. Além disso, expandi a utilização de Styled Components, criando novos componentes. Por fim, adicionei uma imagem ao repositório com a arquitetura da aplicação.
