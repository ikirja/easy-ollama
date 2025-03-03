# Change Log

All notable changes to the "easy-ollama" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-02-21

### Added

- Use retain context when hidden for webview updates in background, including state
- Code Snippet language badge
- Additional languages support for Code Snippets: JSON, Python, Go, Rust

### Fixed

- Copy buttons do not work after restoring data from state
- Autoscroll when LLM generating response should keep response window in view instead of srolling to the bottom of webview
- Overflow in response window and Code Snippets is now hidden, with horizontal scroll where applicable

## [0.2.0] - 2025-02-18

### Added

- Clear Snippets button to remove snippets
- State for Webview, state is destroyed on closing Easy-Ollama panel, keeps data when switching tabs

### Fixed

- No fixes

### Changed

- Updated .md files: LICENSE.md, CHANGELOG.md, README.md
- Update to prompt input and response window layout
- Update to package.json

### Removed

- VSCode starting guide .md file

## [0.1.0] - 2025-02-18

### Added

- Initial working version

### Fixed

- Initial working version

### Changed

- Initial working version

### Removed

- Initial working version