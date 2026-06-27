#!/usr/bin/env bash
# Pre-delivery Gate — 0 error, 0 warning required on every check.
#
# Runs in order: typecheck → lint → test → build. Exits on first failure.
# Used both manually (`npm run gate`) and as a contract before any commit.

set -euo pipefail

CYAN='\033[0;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ok()   { printf "${GREEN}✓ %s${NC}\n" "$1"; }
fail() { printf "${RED}✗ %s${NC}\n" "$1"; exit 1; }
step() { printf "\n${CYAN}── %s ──${NC}\n" "$1"; }

START=$(date +%s)

step "1/4  TypeScript  (tsc --noEmit)"
if npx tsc --noEmit 2>&1; then
  ok "tsc passed"
else
  fail "tsc failed"
fi

step "2/4  ESLint      (eslint . --max-warnings 0)"
if npx eslint . --max-warnings 0 2>&1; then
  ok "eslint passed (0 error, 0 warning)"
else
  fail "eslint failed"
fi

step "3/4  Vitest      (vitest run)"
if npx vitest run 2>&1; then
  ok "vitest passed"
else
  fail "vitest failed"
fi

step "4/4  Astro Build (astro build)"
if npx astro build 2>&1 | tail -20; then
  ok "build passed"
else
  fail "build failed"
fi

ELAPSED=$(( $(date +%s) - START ))
printf "\n${GREEN}════════════════════════════════════════${NC}\n"
printf "${GREEN}  Gate passed in ${ELAPSED}s — ready to ship.${NC}\n"
printf "${GREEN}════════════════════════════════════════${NC}\n"
