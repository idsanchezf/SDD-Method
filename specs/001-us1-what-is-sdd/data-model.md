# Data Model: What is SDD - Hero Section

## Entities

### Section (Hero Section)

Top-level container representing the "What is SDD?" page section.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier: `"hero-what-is-sdd"` |
| `title` | String | Page heading: "¿Qué es Spec Driven Development?" |
| `subtitle` | String | Short intro tagline |
| `definition` | String | Intro paragraph (max 150 words) |
| `principles` | Principle[] | Array of 5 principle objects |
| `benefits` | Benefit[] | Array of 4 benefit objects |
| `comparisons` | Comparison[] | Array of 3+ comparison rows |
| `concepts` | KeyConcept[] | Array of 5+ checklist items |

### Principle

Each core principle of SDD methodology.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier: `"principle-{n}"` |
| `name` | String | Short principle name (e.g., "Specs First") |
| `description` | String | 2-3 line explanation |
| `icon` | String | SVG filename or Unicode entity |

### Benefit

Each advantage of adopting SDD.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier: `"benefit-{n}"` |
| `title` | String | Short benefit title |
| `description` | String | 1-2 line explanation |
| `icon` | String | SVG filename or Unicode entity |

### Comparison

Row in the SDD vs Traditional Methods table.

| Field | Type | Description |
|-------|------|-------------|
| `aspect` | String | What is being compared (e.g., "Requirements") |
| `sddApproach` | String | How SDD handles this aspect |
| `traditionalApproach` | String | How traditional methods handle it |

### KeyConcept

Each item in the interactive comprehension checklist.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier: `"concept-{n}"` |
| `statement` | String | The concept question/statement |
| `answer` | String | The correct answer/confirmation (hidden until expanded) |
| `revealed` | Boolean | Whether user has clicked to reveal (session-only state) |

## State Management

### Reading Progress

| Field | Type | Description |
|-------|------|-------------|
| `sectionsTotal` | Number | Total number of trackable sections (5) |
| `sectionsViewed` | Number | Number of sections scrolled into view |
| `progress` | Number | Computed: `sectionsViewed / sectionsTotal * 100` |

State is held in a JavaScript object in memory. No persistence across sessions.
