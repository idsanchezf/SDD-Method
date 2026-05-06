# Data Model: SDD Roles & Responsibilities

## Entities

### Human Role

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Display name |
| `slug` | String | Identifier (e.g., "spec-writer") |
| `description` | String | Short description |
| `responsibilities` | String[] | Main responsibilities |
| `skills` | String[] | Required skills |
| `experienceLevel` | String | Recommended level (Junior, Mid, Senior) |
| `phases` | String[] | Phases where they participate |

### AI Role

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Display name |
| `slug` | String | Identifier |
| `description` | String | Short description |
| `capabilities` | String[] | What the AI can do |
| `limitations` | String[] | Known limitations |
| `examplePrompts` | String[] | Effective prompt examples |
| `humanSupervision` | String | How humans should supervise |
| `phases` | String[] | Phases where they participate |

### Collaboration Matrix

| Field | Type | Description |
|-------|------|-------------|
| `phases` | String[] | 5 phase names |
| `roles` | String[] | All role names |
| `cells` | Cell[][] | Participation level per phase-role pair |

### Cell

| Field | Type | Description |
|-------|------|-------------|
| `phase` | String | Phase name |
| `role` | String | Role name |
| `level` | String | "principal", "secundario", "revisor", or none |
