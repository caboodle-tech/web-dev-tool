# Changelog
All notable changes to Web Dev Tool (WDT) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres mostly to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Since Web Dev Tools is designed to always maintain the same features as previous releases, and you should be injecting the latest version into your projects, major versioning is a bit moot. The major version will be bumped when significant changes have been made or new large features have been added.

## [0.7.1] - 2020-05-07
### Added
- This changelog to start tracking things officially; BETA RELEASE.
- The `_wdt-visual-settings` local storage key where the visual state of WDT can be saved for use on page reloads.
- Public methods `callCloseTools` and `callOpenTools` that allow you to programmatically open or close WDT with the following calls:
   - `WebDevTool.open();`
   - `WebDevTool.close();`
- Public method `getStatus` that returns a clone of WDT status object. Call with:
   - `WebDevTool.getStatus();`

### Changed
- Record the last run command in the Console only if it is a new command. If the current command is the same as the command at the top of the command history we skip saving it.
- Added padding to the source code area of the Source page.
- The demo page for WDT to auto open WDT if it is closed.

### Fixed
- WDT toolbar close button now properly closes WDT by updating the `status.consoleOpen` property to `false`.
