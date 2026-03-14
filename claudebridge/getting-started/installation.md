---
sidebar_position: 1
title: Installation & Setup
---

# Installation & Setup

Get ClaudeBridge running in your Unreal Engine project in under 5 minutes.

---

## Requirements

| Requirement | Details |
|-------------|---------|
| **Unreal Engine** | 5.4 or newer (tested on 5.7) |
| **Platforms** | Windows, macOS, Linux |
| **AI Client** | Any MCP-compatible client (Claude Desktop, Cursor, Windsurf, etc.) |
| **Network** | Local only — no internet required at runtime |

---

## Step 1: Install the Plugin

### From Fab Marketplace

1. Purchase ClaudeBridge on [Fab](https://www.fab.com)
2. In the Epic Games Launcher, go to your **Library**
3. Find ClaudeBridge under **Vault** and click **Install to Engine**
4. Open your UE project — the plugin will be available

### Manual Installation

1. Extract the ClaudeBridge folder into your project's `Plugins/` directory:
   ```
   YourProject/
   └── Plugins/
       └── ClaudeBridge/
           ├── ClaudeBridge.uplugin
           ├── Source/
           ├── Resources/
           └── ...
   ```
2. Rebuild your project (or let the editor compile on startup)

---

## Step 2: Verify Installation

1. Open your project in Unreal Editor
2. Go to **Edit > Plugins** and search for "ClaudeBridge"
3. Ensure it is **enabled** (it's enabled by default)
4. Restart the editor if prompted

After restart, you should see the **ClaudeBridge** tab in the editor. If not, go to **Window > ClaudeBridge** to open it.

---

## Step 3: Verify the MCP Server

The MCP HTTP server starts automatically on **port 3000**.

### Check via Dashboard
Open the ClaudeBridge panel in the editor. You should see:
- **Connection**: Listening
- **MCP HTTP Server**: Port 3000, Status: Running

### Check via Terminal
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{"status": "healthy", "plugin": "ClaudeBridge", "version": "0.2.0"}
```

---

## Step 4: Configure (Optional)

### Change the Port

Go to **Project Settings > Plugins > ClaudeBridge**:

| Setting | Default | Description |
|---------|---------|-------------|
| `MCP Server Port` | 3000 | HTTP port for MCP connections |
| `Auto Start MCP` | true | Start server when editor loads |

### CORS Settings

By default, CORS is enabled for all origins. This allows any local AI client to connect.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Plugin not visible | Ensure ClaudeBridge.uplugin is in `Plugins/` folder, restart editor |
| Port 3000 in use | Change port in Project Settings, or close the other application |
| Health check fails | Check Output Log for ClaudeBridge errors; ensure firewall allows localhost:3000 |
| Dashboard shows "Disconnected" | The MCP server may have failed to start — check Output Log |

---

## Next Steps

Now that ClaudeBridge is running, [connect your AI client](./connecting).
