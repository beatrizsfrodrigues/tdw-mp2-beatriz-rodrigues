# **Animal Crossing Villager Finder**

## **Introdução**

No âmbito do Mini Projeto 2 da unidade curricular de Tecnologias e Desenvolvimento Web (TDW), foi-nos proposto o desenvolvimento de uma aplicação _front-end_ em React que consome e apresenta informações provenientes de uma API. Escolhi como tema algo que me é familiar e que pode ser útil no dia a dia: o Animal Crossing Villager Finder.

## **Objetivos**

O principal objetivo deste projeto foi desenvolver uma aplicação que permita aos utilizadores visualizar informações sobre os habitantes (_villagers_) do jogo _Animal Crossing: New Horizons_. A aplicação deveria ser intuitiva, eficiente e proporcionar uma experiência agradável ao utilizador.

## **Tecnologias Utilizadas**

- **React**: Framework para construção da interface.
- **Styled Components**: Para estilização modular e reutilizável.
- **React Router**: Para gestão da navegação entre páginas.
- **Redux e Redux Toolkit**: Para gestão de estado.
- **RTK Query**: Para consumo de dados da API.
- **Nookipedia API**: Fonte de dados sobre os _villagers_.

## **Funcionalidades**

### **Pesquisa de Villagers**

A aplicação permite aos utilizadores pesquisar _villagers_ através de filtros, como a personalidade ou a espécie, e marcar favoritos para facilitar o acesso posterior.

### **Guardar Villagers Favoritos**

Os utilizadores podem guardar os seus _villagers_ favoritos, permitindo um acesso mais rápido e personalizado.

### **Visualização de Detalhes**

Ao clicar num _villager_, é apresentada uma modal com informações detalhadas, como o nome, espécie, personalidade, aniversário e a sua frase característica.

### **Paginação**

Para facilitar a navegação, foi implementada a funcionalidade de paginação, que apresenta um número limitado de _villagers_ por página.

## **Implementação**

### **Estrutura do Projecto**

O projecto foi organizado principalmente dentro do componente Home e comp algumas funcionalidades executadas dentro de outros componentes.

### **Consumo da API**

Utilizei o Redux Toolkit Query para realizar chamadas à Nookipedia API, incluindo nos cabeçalhos a chave de API e a versão necessária, conforme especificado pela documentação da mesma.

### **Filtros e Paginação**

Os filtros foram implementados para facilitar a pesquisa por personalidade e espécie dos _villagers_. Já a paginação melhora a experiência do utilizador, limitando o número de resultados exibidos por página.

### **Estilização**

A estilização foi realizada com CSS e alguns Styled Components, permitindo uma personalização por componente e garantindo uma interface limpa e consistente.

## **Desafios e Soluções**

### **Organização dos Reducers**

Inicialmente, toda a lógica da aplicação estava concentrada num único ficheiro, o que tornou o código desorganizado e difícil de gerir. Este problema tornou-se evidente quando comecei a implementar os _reducers_, pois a falta de separação entre as funcionalidades dificultava o trabalho e aumentava a probabilidade de erros.

### **Implementação da Paginação**

A centralização inicial do código também causou dificuldades na implementação da funcionalidade de paginação. A estrutura rígida e pouco modular dificultava a integração de novos recursos, como o controlo do número de _villagers_ exibidos por página.

### **Problemas de CORS**

Inicialmente, deparei-me com problemas de CORS ao testar APIs que não requeriam chaves de acesso. Para contornar este problema, optei pela Nookipedia API, que fornece a documentação e suporte necessários para utilização segura e eficiente.

## Obstáculos não ultrapassados

Como fiz basicamente toda a implementação num só ficheiro, posteriormente, ao tentar dividir em diferentes componentes foi bastante complicado. Desisti de o fazer e então tenho uma ficheiro principal um pouco extenso. No meu próximo projeto vou tentar definir os componentes mais cedo para não voltar a encontrar este problema.

## **Conclusão**

O desenvolvimento do Animal Crossing Villager Finder foi uma experiência enriquecedora, permitindo-me aplicar os conhecimentos adquiridos na UC de TDW. A aplicação atinge os objetivos definidos, proporcionando uma ferramenta prática e intuitiva para os fãs de _Animal Crossing_. Além disso, o projeto contribuiu para o meu desenvolvimento técnico, particularmente no consumo de APIs, gestão de estado e boas práticas em React.
