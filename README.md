# PokeDex Ionic

## Sobre

O projeto é um aplicação Web e Mobile desenvolvida com Ionic (v7) e Angular (v19) que permite o usuário a diversas informações sobre Pokemons utilizando a PokeApi para obter essas informações. A aplicação também oferece uma ótima experiência de navegação, busca de pokemons e permite favoritar os seus Pokemons prediletos.

## Funcionalidades

- **Lista de Pokemons** que lista mais pokemons à medida que o usuário desce a página
- **Tela de detalhes** com estátiscas, tipos, habilidades e evoluções do pokemon
- **Favorites** os pokemon que você mais gosta, veja uma lista paginada deles e desfavorite se quiser
- **Buscar** pokemons pelo nome ou ID para visualizar detalhes sobre ele
- **Responsividade** para diferentes tamanhos de dispositivos
- **Interface intuitiva** com loading states

## Tecnologias

- Ionic 8
- Angular 19
- TypeScript
- RxJS
- Docker
- Jest
- PokeAPI

## Executar o projeto

### 1. Clone o projeto
```
git clone https://github.com/eunael/pokedex-bsn
cd pokedex-bsn
```

### 2. Suba o container Docker (recomendado)
```
docker compose up -d
```

### 2.1. Ou, se preferir, pode executar localmente
```
npm install

ionic server # ambiente de desenvolvimento

# build em produção
ionic build
ionic cap add ios
ionic cap add android

# executar em dispositivos
ionic cap open ios # precisa de um dispositivo MacOS
ionic cap open android # precisa do Android Studio instalados
```

## Arquitetura e padrões de projeto

- Segui o estilo de codificação do Angular
- Padronizando os nomes dos arquivos
- Construindo uma arquitetura modular (page, services, components, types)
- Fiz a injeção de depências para services que o componente precisava
- Utilize o padrão Observer para comunicação assíncrona com a PokeApi
- Atribui IDs para nomear as branch de cada tarefa e utilizei o Husky para ativar hooks antes de fazer o commit para: identificar erros de código com o ESLint; formatar o código seguindo so padrões da comunidade com o Prettier; executar os testes; e adicionar o ID da task na mensagem do commit para facilitar a identificação.
- Aplique paginação em todas as listagens (home: infinite scroll; favorites: paginate)
- Utilizei interfaces para estrutura de objetos, contratos de classes (inversão de dependências) e dados da API
- É possível executar o projeto em um container Docker

## Estrutura do projeto

```
src/app/
├── components/ # Componentes reutilizáveis
├── pages/ # Páginas da aplicação
├── services/ # Serviços da aplicação
└── interfaces/ # Interfaces da aplicação
```

## Demo

https://github.com/user-attachments/assets/9794980f-e818-47e5-82dc-069a2084c741

---
**Desenvolvido por Natanael Alves** | Teste técnico - Desenvolvedor Full Stack

**Contato:** natanaelallves@gmail.com
