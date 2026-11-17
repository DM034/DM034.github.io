#!/usr/bin/env python3
"""Compile Jekyll-like includes into a generated index.html file."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


INCLUDE_PATTERN = re.compile(r"{%\s*include\s+([^\s}]+)\s*%}")
FRONT_MATTER_PATTERN = re.compile(r"^---\n.*?^---\n", flags=re.DOTALL | re.MULTILINE)


def read_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def compile_template(template_content: str, base_dir: Path) -> str:
    def replace_include(match: re.Match[str]) -> str:
        include_file = match.group(1)
        include_path = base_dir / "_includes" / include_file
        if not include_path.exists():
            return f"<!-- MISSING: {include_file} -->"
        include_content = read_file(include_path)
        return compile_template(include_content, base_dir)

    return INCLUDE_PATTERN.sub(replace_include, template_content)


def compile_to_index(base_dir: Path, template_name: str, output_name: str) -> None:
    template_file = base_dir / template_name
    output_file = base_dir / output_name

    if not template_file.exists():
        raise FileNotFoundError(f"Template not found: {template_file}")

    template = read_file(template_file)
    if "{% include" not in template:
        raise ValueError(
            f"Template '{template_name}' ne contient aucun include. "
            "Utilise un vrai template source avec {% include ... %}."
        )

    compiled = compile_template(template, base_dir)
    compiled = FRONT_MATTER_PATTERN.sub("", compiled)
    output_file.write_text(compiled, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Compile includes into index.html")
    parser.add_argument(
        "--base-dir",
        default="/Users/dm/Documents/GitHub/DM034.github.io",
        help="Project root path",
    )
    parser.add_argument(
        "--template",
        default="index.template.html",
        help="Template source file",
    )
    parser.add_argument(
        "--output",
        default="index.html",
        help="Compiled output file",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    base_dir = Path(args.base_dir)
    compile_to_index(base_dir, args.template, args.output)
    print(f"✓ Compilé: {args.template} -> {args.output}")


if __name__ == "__main__":
    main()
