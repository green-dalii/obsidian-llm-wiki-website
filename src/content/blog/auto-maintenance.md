---
title: "Let Your Wiki Maintain Itself"
description: "File Watcher, Periodic Lint, and Startup Health Check — three automation layers that keep your Wiki healthy without manual intervention."
date: 2026-05-11
tags: ["guides"]
series: "maintenance"
related: ["smart-fix-all", "faster-ingestion"]
---

## The Maintenance Gap

You spent an afternoon curating sources. You ran ingestion. You admired your shiny new Wiki with clean pages, proper links, and a beautiful graph view.

Then two weeks passed.

You open Obsidian one morning to find 47 lint warnings. Duplicate pages have crept in from overlapping sources. Dead links point to pages you renamed last week. Orphan pages sit disconnected from the rest of your knowledge graph. An empty page stub from a failed extraction stares at you.

This is the **Maintenance Gap** — the silent decay every knowledge base experiences between active curation sessions. It isn't anyone's fault. It's the natural consequence of a living system where sources change, names shift, and new content arrives in batches rather than a steady stream.

Before auto-maintenance, plugging this gap meant remembering to run Lint manually, parsing the report, and fixing each issue one at a time. For a 500-page Wiki, that's a 10-minute chore you'd skip until the warnings became unignorable.

With auto-maintenance (introduced in v1.4.0), the plugin handles detection continuously. You don't have to remember. You don't have to schedule. The system watches, scans, and alerts — all on its own.

## Three Automation Layers

The auto-maintenance system is built from three independent layers, each designed for a specific time horizon and scope.

### Layer 1: File Watcher

The File Watcher monitors `sources/` and `wiki/` for real-time changes. When you modify, add, or delete a file in either directory, the watcher triggers an appropriate action within seconds.

**What it watches:**
- `sources/` file changes → re-ingest the modified source
- `wiki/` file changes → re-scan for broken links and orphan detection
- New file creation → trigger ingestion or link validation depending on directory

**Configuration:**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    watch_sources: true
    watch_wiki: true
    delay_ms: 3000
    debounce: true
    exclude_patterns:
      - "*.tmp"
      - ".DS_Store"
      - "_draft_*"
```

The `delay_ms` of 3000 means the watcher waits 3 seconds after the last file change before acting. This prevents a flurry of operations when you're batch-editing multiple files. The `debounce` option groups rapid changes into a single trigger.

**When to use it:** Always, unless you're on battery with a very large vault. The CPU cost is negligible — the watcher uses OS-level file system events (fsevents on macOS, inotify on Linux, ReadDirectoryChanges on Windows), not polling.

### Layer 2: Periodic Lint

Periodic Lint runs a full scan on a configurable schedule. Unlike the File Watcher's targeted reactions, this is a comprehensive sweep: duplicates, dead links, orphans, empty pages, missing aliases, and polluted pages.

**Default schedule:** Every 4 hours. Configurable from 30 minutes to 24 hours, or completely manual.

**What each scan checks:**

| Check | What it finds | Avg. scan time (1K pages) |
|-------|---------------|--------------------------|
| Duplicates | Pages with >80% content similarity | 2-4s |
| Dead links | `[[wiki-links]]` pointing to nonexistent pages | <1s |
| Orphans | Pages with zero incoming links | <1s |
| Empty pages | Pages with no extracted content | <1s |
| Missing aliases | Entities without required alias fields | <1s |
| Polluted pages | Folder-prefix contamination in page names | <1s |

**Configuration:**

```yaml
auto_maintenance:
  periodic_lint:
    enabled: true
    interval_hours: 4
    run_on_startup: true
    auto_report: true
    checks:
      - duplicates
      - dead_links
      - orphans
      - empty_pages
      - missing_aliases
      - polluted_pages
```

**When to run more frequently:** If you ingest sources multiple times per day or collaborate with others on a shared vault, set `interval_hours` to 1 or 2. The scan is fast enough that you won't notice it.

**When to run less frequently:** If your Wiki is stable (you haven't added sources in weeks), once daily is plenty.

### Layer 3: Startup Health Check

The Startup Health Check runs when Obsidian opens. It's a targeted, near-instantaneous diagnosis that answers one question: "Is my Wiki healthy right now?"

Unlike Periodic Lint's thorough scan, Startup Health Check runs a quick subset of checks:
- Critical dead links (links from top-level `wiki/index.md`)
- Missing entity pages referenced by recently modified pages
- Schema validation errors
- Incomplete ingestion from a previous session (checks `wiki/log.md` for interrupted operations)

If it finds issues, it shows a **toast notification** with a summary and a "Run Full Lint" action button.

**Configuration:**

```yaml
auto_maintenance:
  startup_health_check:
    enabled: true
    show_toast: true
    include_schema_validation: true
    max_reported_issues: 5
```

The health check completes in under 500ms for even the largest Wikis. It doesn't scan every page — it samples the most critical paths and reports only the most impactful issues.

**When to use it:** Always. There's no reason to disable it. The performance cost is imperceptible, and catching a broken schema or interrupted ingestion immediately saves you from wondering why your Wiki feels off throughout the day.

## How the Layers Interact

These three layers don't just run in parallel — they form a **detection pipeline** that catches issues at every stage of their lifecycle.

Here's a realistic scenario:

1. **You edit a source note** in Obsidian. The File Watcher detects the change, waits 3 seconds, then triggers re-ingestion.
2. **Ingestion completes.** The new extraction overlaps with an existing entity page, creating a duplicate. The File Watcher doesn't detect this — duplicates aren't its job.
3. **4 hours later**, Periodic Lint runs. It finds the duplicate and adds it to the lint report. You get a notification badge.
4. **You close Obsidian for the night.** The next morning, Startup Health Check runs. It sees the unresolved duplicate from yesterday's report and shows a toast: "1 duplicate page found. Run Full Lint to review."
5. **You open Smart Fix All** (introduced in v1.7.11) and click one button. The duplicate is merged, any dead links caused by the merge are repaired, and the orphan check runs automatically.

Each layer handles what it's best suited for. File Watcher catches changes immediately but doesn't analyze deeply. Periodic Lint analyzes deeply but runs on a schedule. Startup Health Check reminds you of lingering issues without overwhelming you with data.

## Performance Considerations

A common concern with auto-maintenance is: "Will this slow down my Obsidian?"

Here are the real numbers:

- **File Watcher:** 0.1% CPU when idle. Brief spike (1-2% CPU for 2-5 seconds) when a file change triggers re-ingestion.
- **Periodic Lint:** Full scan of a 1,000-page Wiki takes 3-8 seconds at ~5% CPU. Runs in a background thread — Obsidian remains responsive.
- **Startup Health Check:** 100-500ms at <1% CPU. Completes before Obsidian's own startup finishes.

The total resource impact across a full day of use: less than 30 seconds of cumulative CPU time. The default settings are tuned for a balance of responsiveness and efficiency that works for 95% of users.

## Relation to Smart Fix All

Auto-maintenance and Smart Fix All (Maintenance Four) are complementary systems with a clear division of labor:

| System | Role | When |
|--------|------|------|
| File Watcher | Detect changes immediately | Seconds after file change |
| Periodic Lint | Comprehensive detection | Every 4 hours |
| Startup Health Check | Quick triage on open | Obsidian startup |
| Smart Fix All | Fix everything at once | On demand |

Auto-maintenance **detects and reports**. Smart Fix All **fixes**. You can think of auto-maintenance as your monitoring dashboard and Smart Fix All as the "resolve all" button.

If you're running auto-maintenance (v1.4.0+) and Smart Fix All (v1.7.11+), the combined workflow is:

1. Issues are detected automatically (Periodic Lint or Startup Health Check)
2. You get a notification with a count and severity
3. Option A: Run Smart Fix All for one-click resolution of all fixable issues
4. Option B: Open Lint Report for manual review of each issue

## Configuration Template by Wiki Size

Here are recommended configurations for different Wiki sizes:

**Small Wiki (<100 pages):**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    delay_ms: 1000
  periodic_lint:
    enabled: true
    interval_hours: 8
  startup_health_check:
    enabled: true
```

**Medium Wiki (100-1,000 pages):**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    delay_ms: 3000
    debounce: true
  periodic_lint:
    enabled: true
    interval_hours: 4
    run_on_startup: true
  startup_health_check:
    enabled: true
    max_reported_issues: 5
```

**Large Wiki (1,000+ pages):**

```yaml
auto_maintenance:
  file_watcher:
    enabled: true
    delay_ms: 5000
    debounce: true
    exclude_patterns:
      - "*.tmp"
      - "_backup_*"
  periodic_lint:
    enabled: true
    interval_hours: 2
    run_on_startup: false
    checks:
      - duplicates
      - dead_links
      - orphans
      - empty_pages
  startup_health_check:
    enabled: true
    show_toast: true
    include_schema_validation: true
    max_reported_issues: 10
```

For large Wikis, increase the File Watcher delay to avoid triggering re-ingestion during batch operations. You can also reduce Periodic Lint's checks to the highest-impact items and disable `run_on_startup` to avoid the initial scan competing with Obsidian's own startup load.

## Next: Smart Fix All

Auto-maintenance keeps your Wiki healthy between your active curation sessions. But when issues do accumulate, you need a way to resolve them without clicking through each one individually.

That's exactly what [Smart Fix All](/blog/smart-fix-all) does — one click, causality-ordered repairs, detailed report. It's the natural complement to the detection systems described here.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
