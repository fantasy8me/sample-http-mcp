# HTTP MCP Server

This project is a Node.js HTTP server implementing the Model Context Protocol (MCP) for Copilot integration. It allows file operations (list, create, copy) in a predefined local folder via HTTP endpoints.

## Features
- List files in a predefined folder (`/list`)
- Create new files (`/create`)
- Copy files (`/copy`)
- Extendable `/mcp` endpoint for MCP protocol

## Usage
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. The server runs on port 3000 by default.

## Endpoints
- `GET /list` — List files
- `POST /create` — Create a file (`{ filename, content }`)
- `POST /copy` — Copy a file (`{ src, dest }`)
- `POST /mcp` — MCP protocol endpoint (to be implemented)

## Folder
All file operations are performed in the `data/` folder in the project root.

## MCP Protocol
See [Model Context Protocol](https://modelcontextprotocol.io/llms-full.txt) for details.
