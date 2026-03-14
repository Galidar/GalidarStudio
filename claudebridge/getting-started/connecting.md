---
sidebar_position: 2
title: Connecting Your AI Client
---

# Connecting Your AI Client

ClaudeBridge uses the **Model Context Protocol (MCP)** — an open standard supported by many AI clients. Here's how to connect the most popular ones.

---

## Claude Desktop / Claude Code

### Option 1: MCP Config File (Recommended)

Create or edit `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "claudebridge": {
      "type": "streamable-http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

Claude Code will automatically detect and connect to ClaudeBridge.

### Option 2: Claude Desktop Settings

1. Open Claude Desktop **Settings > Developer**
2. Add a new MCP server:
   - **Name**: ClaudeBridge
   - **Type**: Streamable HTTP
   - **URL**: `http://localhost:3000/mcp`

---

## Cursor IDE

1. Open Cursor **Settings > MCP Servers**
2. Click **Add MCP Server**
3. Configure:
   - **Name**: ClaudeBridge
   - **Transport**: Streamable HTTP
   - **URL**: `http://localhost:3000/mcp`

---

## Windsurf

1. Open Windsurf settings
2. Navigate to the MCP configuration section
3. Add a new server with URL: `http://localhost:3000/mcp`

---

## Any MCP Client

ClaudeBridge follows the MCP specification (2025-03-26). Any client that supports **Streamable HTTP** transport can connect:

| Setting | Value |
|---------|-------|
| **Transport** | Streamable HTTP |
| **Endpoint** | `http://localhost:3000/mcp` |
| **Protocol** | JSON-RPC 2.0 |
| **Auth** | None (local only) |

### Manual Connection (for developers)

```bash
# Initialize
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'

# List available tools
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

---

## Verifying the Connection

Once connected, the ClaudeBridge dashboard will show:

- **Connection**: `Listening` with timestamp
- **Session Statistics**: Command count incrementing as tools are called
- **Recent Activity**: Log of executed commands with status

Try asking your AI client: *"Ping ClaudeBridge"* — you should see `ping` appear in the Recent Activity log.

---

## Next Steps

Your AI client is connected! Try your [first commands](./first-commands).
