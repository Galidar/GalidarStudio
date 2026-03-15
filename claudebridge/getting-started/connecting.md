---
sidebar_position: 2
title: Connecting Your AI Client
---

# Connecting Your AI Client

ClaudeBridge uses the **Model Context Protocol (MCP)** — an open standard supported by many AI clients. Here's how to connect the most popular ones.

---

## Prerequisites

Before connecting, make sure:

1. **Unreal Editor is open** with your project loaded
2. **ClaudeBridge plugin is enabled** (check Edit > Plugins)
3. **MCP server is running** — verify with:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "server": "ClaudeBridge",
  "version": "0.2.0",
  "port": 3000,
  "mcp_initialized": false,
  "tools_count": 422
}
```

If health check fails, see [Installation & Setup](./installation) first.

---

## Claude Code (CLI) — Full Tutorial

Claude Code is a terminal-based AI agent. Since it runs outside the editor, it connects to ClaudeBridge via **HTTP** to the MCP server running inside Unreal Editor.

### Step 1: MCP Config File (Auto-Connect)

Create `.mcp.json` in your **project root** (next to the `.uproject` file):

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

When Claude Code opens a session in this project directory, it will **automatically detect and connect** to ClaudeBridge. All 422+ tools appear as native MCP tools.

:::tip
This is the recommended approach — no manual handshake needed.
:::

### Step 2: Verify from Claude Code

Once connected, ask Claude Code:

> "Ping ClaudeBridge"

You should see the `ping` command in the ClaudeBridge dashboard's Recent Activity log inside Unreal Editor.

### Alternative: Manual HTTP Connection

If the `.mcp.json` config file is not set up, Claude Code can still communicate with ClaudeBridge by sending HTTP requests directly. This is useful for quick testing or one-off sessions.

**1. Check the server is alive:**

```bash
curl http://localhost:3000/health
```

**2. Initialize the MCP session:**

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-03-26",
      "capabilities": {},
      "clientInfo": {
        "name": "claude-code",
        "version": "1.0.0"
      }
    }
  }'
```

**3. Complete the handshake:**

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "notifications/initialized"
  }'
```

**4. Verify connection:**

```bash
curl http://localhost:3000/health
# "mcp_initialized": true confirms the connection
```

**5. Call any tool** (example — list actors in the level):

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "list_actors",
      "arguments": {}
    }
  }'
```

:::info Auto-Generated Files
On the **first MCP connection**, ClaudeBridge auto-generates two support files in the plugin directory:
- `CLAUDE.md` — Plugin documentation for AI assistants
- `claudebridge_offline.py` — Standalone MCP stdio server for offline use (editor not running)

These files are created once and can be safely version-controlled.
:::

---

## Claude Desktop

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

---

## Full Build + Connect Workflow

If your project needs a fresh build (e.g., after modifying C++ code, UPROPERTY changes, or Build.cs edits), here is the complete workflow from build to connection:

### 1. Close the Editor

```bash
# Windows (PowerShell)
powershell -Command "Get-Process -Name UnrealEditor -ErrorAction SilentlyContinue | Stop-Process -Force"
```

### 2. Clean Build Artifacts

```bash
# Remove Intermediate and Binaries for project and all plugins
rm -rf "YourProject/Intermediate" "YourProject/Binaries"
rm -rf "YourProject/Plugins/*/Intermediate" "YourProject/Plugins/*/Binaries"
```

### 3. Regenerate Project Files

```bash
"<UE_Install>/Engine/Binaries/DotNET/UnrealBuildTool/UnrealBuildTool.exe" \
  -projectfiles \
  -project="<Path>/YourProject.uproject" \
  -game -engine -progress
```

### 4. Compile

```bash
"<UE_Install>/Engine/Binaries/DotNET/UnrealBuildTool/UnrealBuildTool.exe" \
  YourProjectEditor Win64 Development \
  -project="<Path>/YourProject.uproject" \
  -waitmutex -NoHotReload
```

### 5. Launch the Editor

```bash
"<UE_Install>/Engine/Binaries/Win64/UnrealEditor.exe" \
  "<Path>/YourProject.uproject"
```

### 6. Wait for ClaudeBridge

After the editor loads, wait ~30-60 seconds for ClaudeBridge to initialize, then verify:

```bash
curl http://localhost:3000/health
# Should return: "status": "ok"
```

### 7. Connect via MCP

Use the `.mcp.json` config (auto-connect) or the manual HTTP handshake described above.

:::caution
The editor must be **fully loaded** before ClaudeBridge responds. If `curl` fails, wait a bit longer — large projects can take over a minute to load.
:::

---

## Verifying the Connection

Once connected, the ClaudeBridge dashboard in the editor will show:

- **Connection**: `Listening` with timestamp
- **Session Statistics**: Command count incrementing as tools are called
- **Recent Activity**: Log of executed commands with status

Try asking your AI client: *"Ping ClaudeBridge"* — you should see `ping` appear in the Recent Activity log.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `curl: connection refused` | Editor not running, or ClaudeBridge not loaded yet — wait and retry |
| `mcp_initialized: false` | No MCP client has connected yet — send the initialize handshake |
| Tools not showing in Claude Code | Ensure `.mcp.json` exists in project root with correct URL |
| Port 3000 in use | Change port in Project Settings > Plugins > ClaudeBridge |
| Health check returns but tools fail | Editor may still be loading — wait for full initialization |

---

## Next Steps

Your AI client is connected! Try your [first commands](./first-commands).
