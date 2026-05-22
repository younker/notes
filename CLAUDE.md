# Agent Directives & Commands

## File System Rules
- Always default to using Obsidian CLI commands and workspace tools for file operations.
- Only fall back to general CLI file system commands (`mkdir`, `cat`, `rm`) if an Obsidian-specific equivalent is unavailable.
- Always add standard wikilinks between notes whenever possible to preserve your vault's graph structure.

## Obsidian Command Palette
You are integrated with Obsidian. You have access to execute the following Obsidian commands:
- `obsidian:open-command-palette`
- `obsidian:toggle-left-sidebar`
- `obsidian:toggle-right-sidebar`
- `obsidian:open-settings`
- `workspace:toggle-pin`
- `workspace:close`
