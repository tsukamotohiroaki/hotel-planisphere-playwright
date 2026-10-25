#!/bin/bash
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command // ""')
branch=$(git -C "$CLAUDE_PROJECT_DIR" branch --show-current 2>/dev/null)

# mainにいる時の commit / push をブロック（git -C <dir> commit なども対象）
if [[ "$branch" == "main" ]] && echo "$cmd" | grep -qE '\bgit\b.*\b(commit|push)\b'; then
  echo "mainブランチでのcommit/pushは禁止です。ブランチ名をユーザーに相談してください。" >&2
  exit 2
fi

# 別ブランチから main への push もブロック（origin main / HEAD:main / +main。feat/main-page などは対象外）
if echo "$cmd" | grep -qE '\bgit\b.*\bpush\b.*[[:space:]:+](refs/heads/)?main([[:space:]]|$)'; then
  echo "mainへの直接pushは禁止です。" >&2
  exit 2
fi

exit 0
